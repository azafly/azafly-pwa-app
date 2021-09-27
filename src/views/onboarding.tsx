import { SyntheticEvent, useEffect, useState } from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';
import { Grid, Snackbar, SnackbarCloseReason, SnackbarOrigin } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom'

import { useFirebaseAuthContext } from 'providers/auth/firebase'
import { OnboardingIllustration } from 'features/onboarding/illustration';


import { useOnboardingMainStyles } from 'features/onboarding/sign-up/classes'
import { OnboardingTab } from 'features/onboarding/tab'
// import { useQuery } from '@apollo/client';
// import { IS_LOGGED_IN } from 'api/grapqhl/queries/users';


interface SnackBarAlertState {
    open: boolean,
    vertical: SnackbarOrigin['vertical']
    horizontal: SnackbarOrigin['horizontal']
}

const Onboarding = () => {
    const classes = useOnboardingMainStyles()
    const history = useHistory();
    const location = useLocation();
    const [alertState, setAlertState] = useState<SnackBarAlertState>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    })

    const { vertical, horizontal, open } = alertState;
    // const { data: userAuth } = useQuery<{ isLoggedIn: boolean }>(IS_LOGGED_IN);

    const { authError, resetLinkSuccess, authState: { isAuth } } = useFirebaseAuthContext()
    const handleClose = (_: SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertState({ ...alertState, open: false })
    };


    const { from } = location.state || { from: { pathname: "/dashboard" } };

    // console.log(userAuth)
    // if (userAuth?.isLoggedIn) history.replace(from)


    const message = resetLinkSuccess ? 'Link was sent Successfully' : authError



    useEffect(() => {
        setAlertState({
            ...alertState,
            open: resetLinkSuccess || Boolean(authError),
        })
    }, [authError, resetLinkSuccess])



    return (
        <div className={classes.onboarding} >
            <div className={classes.signup_container}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleClose} className={`${classes.alert}`} severity={resetLinkSuccess ? 'success' : 'error'} >
                        <AlertTitle> <strong>Error</strong>    </AlertTitle>
                        {message}
                    </Alert>
                </Snackbar>
                <Grid container >
                    <OnboardingIllustration />
                    <OnboardingTab />
                </Grid>
            </div>
        </div>
    )
}

export default Onboarding