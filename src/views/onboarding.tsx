import { Alert, AlertTitle } from '@material-ui/lab';
import { Grid, Snackbar, SnackbarCloseReason, SnackbarOrigin } from '@material-ui/core';
import { useEffect, useState, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';

import { OnboardingIllustration } from 'features/onboarding/illustration';
import { OnboardingTab } from 'features/onboarding/tab';
import { useOnboardingMainStyles } from 'features/onboarding/sign-up/classes';
import { useHistory } from 'react-router-dom';
import { RootState } from 'app/store';

interface SnackBarAlertState {
    open: boolean;
    vertical: SnackbarOrigin['vertical'];
    horizontal: SnackbarOrigin['horizontal'];
}

const Onboarding = () => {
    const classes = useOnboardingMainStyles();
    const { isAuth } = useSelector((state: RootState) => state.auth);
    const history = useHistory();

    const [alertState, setAlertState] = useState<SnackBarAlertState>({
        open: false,
        vertical: 'top',
        horizontal: 'center'
    });

    const { vertical, horizontal, open } = alertState;

    const handleClose = (_: SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertState({ ...alertState, open: false });
    };

    useEffect(() => {
        const handleLoggedInUserDirect = () => {
            isAuth && history.push('/dashboard');
        };
        handleLoggedInUserDirect();
    }, [history, isAuth]);

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
