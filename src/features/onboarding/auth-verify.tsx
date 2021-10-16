import { SyntheticEvent, useState } from 'react';
import { Snackbar, SnackbarCloseReason, SnackbarOrigin } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { NavBar } from 'features/user-dashboard/nav-bar';
import { useForgotPasswordStyles } from './classes';
import { EmailVerification } from './email-verification';
import { PasswordVerification } from './password-verification';

interface SnackBarAlertState {
    open: boolean;
    vertical: SnackbarOrigin['vertical'];
    horizontal: SnackbarOrigin['horizontal'];
}

const ResetPassword = () => {
    const classes = useForgotPasswordStyles();
    const [error, setError] = useState('');
    const [alertState, setAlertState] = useState<SnackBarAlertState>({
        open: false,
        vertical: 'top',
        horizontal: 'center'
    });

    const { vertical, horizontal } = alertState;

    const handleClose = (_: SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError('');
        setAlertState({ ...alertState, open: false });
    };

    return (
        <>
            <NavBar />
            <div className={classes.forgotPasswordRoot}>
                <Snackbar
                    open={!!error}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical, horizontal }}
                    key={vertical + horizontal}
                >
                    <Alert onClose={handleClose} className={`${classes.alert}`} severity={'error'}>
                        <AlertTitle>
                            {' '}
                            <strong>Error</strong>{' '}
                        </AlertTitle>
                        {error}
                    </Alert>
                </Snackbar>
                <div className={classes.form_container}>
                    <EmailVerification />
                    <PasswordVerification setError={setError} />
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
