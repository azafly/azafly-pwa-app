import { createTheme } from '@material-ui/core/styles';
import { getPersistor } from '@rematch/persist';
import { theme } from 'providers/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { useIdleTimer } from 'react-idle-timer';
import { useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { PersistGate } from 'redux-persist/es/integration/react';

import { Routes } from 'routes';
import { ThreeDots } from 'components/css-loaders/three-dots';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useSetUserMetaData } from 'hooks/use-set-user-meta-data';

const IDLE_TIME = 1000 * 60 * 3;

function App() {
    const preferredTheme = useMemo(() => createTheme(theme), []);

    const { signout } = useFirebaseAuthContext();

    useSetUserMetaData();
    useIdleTimer({
        timeout: IDLE_TIME,
        onIdle: () => signout(),
        crossTab: {
            emitOnAllTabs: true
        }
    });

    return (
        <PersistGate loading={<ThreeDots />} persistor={getPersistor()}>
            <LocalizationProvider dateAdapter={DateAdapter}>
                {' '}
                <ThemeProvider theme={preferredTheme}>
                    <CssBaseline />
                    <Routes />
                </ThemeProvider>
            </LocalizationProvider>
        </PersistGate>
    );
}

export default App;
