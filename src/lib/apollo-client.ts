import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
    HttpLink,
    from
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';
import { IS_LOGGED_IN } from 'api/grapqhl/queries/users';

const HTTPS_URL = process.env
    .REACT_APP_HASURA_GRAPHQL_HTTPS_URL as string;

//log errors to the console
const logErrors = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Instance of a cache
const cache = new InMemoryCache();

// pass authentication header when exists
const authMiddleware = new ApolloLink(
    (operation: any, forward: any) => {
        if (localStorage.getItem('token')) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'token'
                    )}`
                }
            });
        }
        return forward(operation);
    }
);

cache.writeQuery({
    query: IS_LOGGED_IN,
    data: {
        isLoggedIn: !!localStorage.getItem('token')
    }
});

// Set up http link
const httpLink = new HttpLink({
    uri: HTTPS_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

// Apollo
const client = new ApolloClient({
    link: from([logErrors, authMiddleware, httpLink]),
    cache
});

export default client;
