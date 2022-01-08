import { initializeApp } from 'firebase/app';
import { ENV, getEnv } from 'format-env';

export const firebaseConfig = {
    apiKey: getEnv(ENV.REACT_APP_FIREBASE_API_KEY),
    authDomain: getEnv(ENV.REACT_APP_FIREBASE_AUTH_DOMAIN),
    databaseURL: getEnv(ENV.REACT_APP_FIREBASE_DATABASE_URL),
    projectId: getEnv(ENV.REACT_APP_FIREBASE_PROJECT_ID),
    storageBucket: getEnv(ENV.REACT_APP_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: getEnv(ENV.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
    appId: getEnv(ENV.REACT_APP_FIREBASE_APP_ID),
    measurementId: getEnv(ENV.REACT_APP_FIREBASE_MEASUREMENT_ID)
};

export const firebaseApp = initializeApp(firebaseConfig);
