import { ApolloClient, InMemoryCache, ApolloLink, from, NormalizedCacheObject, split, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';

const HTTPS_URL = process.env.REACT_APP_HASURA_GRAPHQL_HTTPS_URL as string;
const WSS_URL = process.env.REACT_APP_HASURA_GRAPHQL_WS_URL as string;

//log errors to the console
const logErrors = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const webSocketLink = (authToken: string | null) =>
    new WebSocketLink({
        uri: WSS_URL,
        lazy: true,
        options: {
            reconnect: true,
            connectionParams: async () => {
                return {
                    headers: {
                        Authorization: authToken ? `Bearer ${authToken}` : ''
                    }
                };
            }
        }
    });
// Instance of a cache
const cache = new InMemoryCache();

// pass authentication header when exists
const authMiddleware = (token: string | null) => {
    return new ApolloLink((operation: any, forward: any) => {
        if (token) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        }
        return forward(operation);
    });
};

// Set up http link
const httpLink = (token: string | null) =>
    new HttpLink({
        uri: HTTPS_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

const splitLink = (token: string | null) =>
    split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        webSocketLink(token),
        httpLink(token)
    );
// Apollo
export const getApolloClient = (token: string | null): ApolloClient<NormalizedCacheObject> =>
    new ApolloClient({
        link: from([logErrors, authMiddleware(token), splitLink(token)]),
        cache
    });
