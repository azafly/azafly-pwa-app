import { Provider as ReduxProvider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import { ErrorBoundary } from 'components/error-boundary';
import { FirebaseAuthProvider } from 'providers/auth/firebase';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store } from 'app/store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App';

// stylings
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { ThreeDots } from './features/user-dashboard/loader-skeleton';

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <ReduxProvider store={store}>
                <FirebaseAuthProvider>
                    <PersistGate loading={<ThreeDots />} persistor={getPersistor()}>
                        <App />
                    </PersistGate>
                </FirebaseAuthProvider>
            </ReduxProvider>
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

//reportWebVitals(console.log);
