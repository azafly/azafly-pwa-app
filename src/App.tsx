import { createTheme } from '@material-ui/core/styles';
import { getPersistor } from '@rematch/persist';
import { theme } from 'providers/theme';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core/styles';
import { useIdleTimer } from 'react-idle-timer';
import { useEffect, useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { PersistGate } from 'redux-persist/es/integration/react';
import { getApolloClient } from 'libs/apollo-client';

import { Routes } from 'routes';
import { ThreeDots } from 'components/css-loaders/three-dots';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { getEnv, ENV } from 'format-env';

import usePWAInstallPrompt from 'hooks/use-prompt-pwa-install';
import { RootState } from 'app/store';
import { useSelector } from 'react-redux';
import { ROUTE_MAP_ENUM } from 'routes/utils';

const IDLE_TIME = 1000 * 60 * parseInt(getEnv(ENV.REACT_APP_IDLE_TIME));

function App() {
    const preferredTheme = useMemo(() => createTheme(theme), []);

    const {
        auth: { isAuth }
    } = useSelector(({ auth }: RootState) => ({ auth }));
    const { signout } = useFirebaseAuthContext();

    useIdleTimer({
        timeout: IDLE_TIME,
        onIdle: () => signout(),
        crossTab: {
            emitOnAllTabs: true
        }
    });

    usePWAInstallPrompt({});
    const client = getApolloClient();

    useEffect(() => {
        if (isAuth) {
            location.replace(ROUTE_MAP_ENUM.DASHBOARD);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <ApolloProvider client={client}>
            <PersistGate loading={<ThreeDots />} persistor={getPersistor()}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    {' '}
                    <ThemeProvider theme={preferredTheme}>
                        <CssBaseline />
                        <Routes />
                    </ThemeProvider>
                </LocalizationProvider>
            </PersistGate>
        </ApolloProvider>
    );
}

export default App;
