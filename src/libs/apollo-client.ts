import { ApolloClient, InMemoryCache, ApolloLink, from, NormalizedCacheObject, split, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { ENV, getEnv } from 'format-env';
import { getToken } from './local-storage-client';

const HTTPS_URL = getEnv(ENV.REACT_APP_HASURA_GRAPHQL_HTTPS_URL);
const WSS_URL = getEnv(ENV.REACT_APP_HASURA_GRAPHQL_WS_URL);
const token = getToken;

//log errors to the console
const logErrors = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
    if (networkError) console.log(`[Network error]: ${networkError.message}`);
});

const webSocketLink = () => {
    return new WebSocketLink({
        uri: WSS_URL,
        lazy: true,
        options: {
            reconnect: true,
            connectionParams: async () => {
                return {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : ''
                    }
                };
            }
        }
    });
};
// Instance of a cache
const cache = new InMemoryCache();

// pass authentication header when exists
const authMiddleware = () => {
    return new ApolloLink((operation: any, forward: any) => {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return forward(operation);
    });
};

// Set up http link
const httpLink = () => {
    return new HttpLink({
        uri: HTTPS_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const splitLink = () =>
    split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        webSocketLink(),
        httpLink()
    );
// Apollo
export const getApolloClient = (): ApolloClient<NormalizedCacheObject> =>
    new ApolloClient({
        link: from([logErrors, authMiddleware(), splitLink()]),
        cache
    });
