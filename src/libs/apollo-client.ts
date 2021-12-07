import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, from, NormalizedCacheObject, gql } from '@apollo/client';

import { onError } from '@apollo/client/link/error';
import { getToken as token } from './local-storage-client';

const HTTPS_URL = process.env.REACT_APP_HASURA_GRAPHQL_HTTPS_URL as string;

//log errors to the console
const logErrors = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Instance of a cache
const cache = new InMemoryCache();

// pass authentication header when exists
const authMiddleware = new ApolloLink((operation: any, forward: any) => {
    if (token) {
        operation.setContext({
            headers: {
                authorization: `Bearer ${JSON.parse(token)}`
            }
        });
    }
    return forward(operation);
});

// Set up http link
const httpLink = new HttpLink({
    uri: HTTPS_URL,
    headers: {
        Authorization: token ? `Bearer ${JSON.parse(token)}` : ''
    }
});

// Apollo
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: from([logErrors, authMiddleware, httpLink]),
    cache
});

export default client;
