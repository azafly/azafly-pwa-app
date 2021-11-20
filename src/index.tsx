import { ApolloProvider } from '@apollo/client';
import { ErrorBoundary } from 'components/error-boundary';
import { FirebaseAuthProvider } from 'providers/auth/firebase';
import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App';
import client from 'libs/apollo-client';
import reportWebVitals from './reportWebVitals';

// stylings
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <FirebaseAuthProvider>
                <ApolloProvider client={client}>
                    <App />
                </ApolloProvider>
            </FirebaseAuthProvider>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
