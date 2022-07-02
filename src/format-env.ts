export enum ENV {
    REACT_APP_REDIRECT_URI = 'REACT_APP_REDIRECT_URI',
    REACT_APP_POST_LOGOUT_REDIRECT_URI = 'REACT_APP_POST_LOGOUT_REDIRECT_URI',
    REACT_APP_SESSION_COOKIE_LIFETIME = 'REACT_APP_SESSION_COOKIE_LIFETIME',
    REACT_APP_HASURA_GRAPHQL_WS_URL = 'REACT_APP_HASURA_GRAPHQL_WS_URL',
    REACT_APP_HASURA_GRAPHQL_HTTPS_URL = 'REACT_APP_HASURA_GRAPHQL_HTTPS_URL',
    REACT_APP_FUNCTIONS_BASE_URL = 'REACT_APP_FUNCTIONS_BASE_URL',
    REACT_APP_FIREBASE_API_KEY = 'REACT_APP_FIREBASE_API_KEY',
    REACT_APP_FIREBASE_AUTH_DOMAIN = 'REACT_APP_FIREBASE_AUTH_DOMAIN',
    REACT_APP_FIREBASE_PROJECT_ID = 'REACT_APP_FIREBASE_PROJECT_ID',
    REACT_APP_FIREBASE_STORAGE_BUCKET = 'REACT_APP_FIREBASE_STORAGE_BUCKET',
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID = 'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    REACT_APP_FIREBASE_APP_ID = 'REACT_APP_FIREBASE_APP_ID',
    REACT_APP_FIREBASE_MEASUREMENT_ID = 'REACT_APP_FIREBASE_MEASUREMENT_ID',
    REACT_APP_FIREBASE_DATABASE_URL = 'REACT_APP_FIREBASE_DATABASE_URL',
    REACT_APP_CALENDAR_URL = 'REACT_APP_CALENDAR_URL',
    REACT_APP_CALENDAR_ID = 'REACT_APP_CALENDAR_ID',
    REACT_APP_GEOLOCATION_KEY = 'REACT_APP_GEOLOCATION_KEY',
    REACT_APP_API_BASE_URL = 'REACT_APP_API_BASE_URL',
    REACT_APP_CLIENT_API_TOKEN = 'REACT_APP_CLIENT_API_TOKEN',
    REACT_APP_NODE_ENVIRONMENT = 'REACT_APP_NODE_ENVIRONMENT',
    REACT_CIPHER_KEY = 'REACT_CIPHER_KEY',
    REACT_APP_PUBLIC_KEY = 'REACT_APP_PUBLIC_KEY',
    REACT_APP_IDLE_TIME = 'REACT_APP_IDLE_TIME'
}

export const getEnv = (variable: ENV) => {
    if (process.env.REACT_APP_NODE_ENVIRONMENT === 'production') {
        return process.env[`${variable}_PROD`] as string;
    } else if (process.env.REACT_APP_NODE_ENVIRONMENT === 'staging') {
        return process.env[`${variable}_STAGING`] as string;
    } else return process.env[`${variable}_DEV`] as string;
};
