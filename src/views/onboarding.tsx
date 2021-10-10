import { SyntheticEvent, useEffect, useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Grid, Snackbar, SnackbarCloseReason, SnackbarOrigin } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { OnboardingIllustration } from 'features/onboarding/illustration';

import { useOnboardingMainStyles } from 'features/onboarding/sign-up/classes';
import { OnboardingTab } from 'features/onboarding/tab';

interface SnackBarAlertState {
    open: boolean;
    vertical: SnackbarOrigin['vertical'];
    horizontal: SnackbarOrigin['horizontal'];
}

const Onboarding = () => {
    const classes = useOnboardingMainStyles();
    const history = useHistory();
    const location = useLocation();
    const [alertState, setAlertState] = useState<SnackBarAlertState>({
        open: false,
        vertical: 'top',
        horizontal: 'center'
    });

    const { vertical, horizontal, open } = alertState;
    // const { data: userAuth } = useQuery<{ isLoggedIn: boolean }>(IS_LOGGED_IN);

    const {
        authState: { isAuth }
    } = useFirebaseAuthContext();
    const handleClose = (_: SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertState({ ...alertState, open: false });
    };

    const { from } = location.state || {
        from: { pathname: '/dashboard' }
    };

    const token = localStorage.getItem('token');

    if (token) history.replace(from);

    // const message = resetLinkSuccess ? 'Link was sent Successfully' : authError;

    // useEffect(() => {
    //     setAlertState({
    //         ...alertState,
    //         open: resetLinkSuccess || Boolean(authError)
    //     });
    // }, [authError, resetLinkSuccess]);

    return (
        <div className={classes.onboarding}>
            <div className={classes.signup_container}>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical, horizontal }}
                    key={vertical + horizontal}
                >
                    <Alert onClose={handleClose} className={`${classes.alert}`} severity={'success'}>
                        <AlertTitle>
                            {' '}
                            <strong>Error</strong>{' '}
                        </AlertTitle>
                        {'message'}
                    </Alert>
                </Snackbar>
                <Grid container>
                    <OnboardingIllustration />
                    <OnboardingTab />
                </Grid>
            </div>
        </div>
    );
};

export default Onboarding;
