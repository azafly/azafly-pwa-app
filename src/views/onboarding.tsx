import { Alert, AlertTitle } from '@material-ui/lab';
import { Grid, Snackbar, SnackbarCloseReason, SnackbarOrigin } from '@material-ui/core';
import { useState, SyntheticEvent } from 'react';

import { OnboardingIllustration } from 'features/onboarding/illustration';
import { OnboardingTab } from 'features/onboarding/tab';
import { useOnboardingMainStyles } from 'features/onboarding/sign-up/classes';

interface SnackBarAlertState {
    open: boolean;
    vertical: SnackbarOrigin['vertical'];
    horizontal: SnackbarOrigin['horizontal'];
}

const Onboarding = () => {
    const classes = useOnboardingMainStyles();

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
