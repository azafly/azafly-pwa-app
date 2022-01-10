import { ApolloProvider } from '@apollo/client';
import { createTheme } from '@material-ui/core/styles';
import { theme } from 'providers/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { useEffect, useMemo } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { Dispatch, RootState } from 'app/store';
import { FirebaseAuthProvider, useFirebaseAuthContext } from 'providers/auth/firebase';
import { getApolloClient } from 'libs/apollo-client';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Routes } from 'routes';

import { ThreeDots } from 'components/css-loaders/three-dots';

const IDLE_TIME = 1000 * 60 * 5;

function App() {
    const { token, isAfrica } = useSelector((state: RootState) => state.auth);
    const preferredTheme = useMemo(() => createTheme(theme), []);
    const dispatch = useDispatch<Dispatch>();
    const { signout } = useFirebaseAuthContext();

    const client = getApolloClient(token);

    useIdleTimer({
        timeout: IDLE_TIME,
        onIdle: () => signout(),
        crossTab: {
            emitOnAllTabs: true
        },
        debounce: 500
    });

    useEffect(() => {
        if (isAfrica) {
            dispatch.dashboard.setViewState('local');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAfrica]);

    return (
        <ApolloProvider client={client}>
            <FirebaseAuthProvider>
                <PersistGate loading={<ThreeDots />} persistor={getPersistor()}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        {' '}
                        <ThemeProvider theme={preferredTheme}>
                            <CssBaseline />
                            <Routes />
                        </ThemeProvider>
                    </LocalizationProvider>
                </PersistGate>
            </FirebaseAuthProvider>
        </ApolloProvider>
    );
}

export default App;
