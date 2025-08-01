import { URLS } from '@/utils/urls';

type GraphQLError = {
  message: string;
  status?: string;
};

const isIgnorableMorphoError = (error: GraphQLError): boolean => {
  return (
    error.message?.toLowerCase().includes('cannot find market bad debt') ||
    error.message?.toLowerCase().includes('bad debt') // sécurité large
  );
};

export const morphoGraphqlFetcher = async <T extends Record<string, any>>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> => {
  const response = await fetch(URLS.MORPHO_BLUE_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok from Morpho API');
  }

  const result = (await response.json()) as T & { errors?: GraphQLError[] };

  if (Array.isArray(result.errors)) {
    const fatalErrors = result.errors.filter((e) => !isIgnorableMorphoError(e));

    if (fatalErrors.length > 0) {
      console.error('❌ Morpho API GraphQL Fatal Errors:', fatalErrors);
      throw new Error('Non-ignorable GraphQL error from Morpho API');
    } else {
      console.warn('⚠️ Morpho API Ignored Errors:', result.errors);
    }
  }

  return result;
};
