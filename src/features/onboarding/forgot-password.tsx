import { Alert, AlertTitle } from '@material-ui/lab';
import { Button, Input, Snackbar, SnackbarCloseReason, SnackbarOrigin, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { SyntheticEvent, useState } from 'react';

import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useForgotPasswordStyles } from './classes';

interface SnackBarAlertState {
    open: boolean;
    vertical: SnackbarOrigin['vertical'];
    horizontal: SnackbarOrigin['horizontal'];
}

const ForgotPassword = () => {
    const classes = useForgotPasswordStyles();
    const { sendPasswordResetEmail } = useFirebaseAuthContext();
    const [email, setEmail] = useState('');
    const [resetState, setResetState] = useState({
        success: false,
        error: false
    });
    const [alertState, setAlertState] = useState<SnackBarAlertState>({
        open: false,
        vertical: 'top',
        horizontal: 'center'
    });

    const { vertical, horizontal, open } = alertState;

    const handleFieldUpdate = (e: any) => {
        const { value } = e.target;
        setEmail(value);
    };

    const handleClose = (_: SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertState({ ...alertState, open: false });
    };
    const handleSendResetEmail = () => {
        sendPasswordResetEmail(email)
            .then(() => setResetState({ error: false, success: true }))
            .catch(() => setResetState({ error: true, success: false }))
            .finally(() => setAlertState({ ...alertState, open: true }));
    };

    const message = resetState.success ? 'Link was sent Successfully' : 'Error Sending resent Link. Try again';
    const alertSeverity = resetState.success ? 'success' : 'error';

    return (
        <div className={classes.forgotPasswordRoot}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                <Alert onClose={handleClose} className={`${classes.alert}`} severity={alertSeverity}>
                    <AlertTitle>
                        {' '}
                        <strong>{alertSeverity}</strong>{' '}
                    </AlertTitle>
                    {message}
                </Alert>
            </Snackbar>

            <div className={classes.form_container}>
                <Typography color={'secondary'} paragraph style={{ color: 'blue' }}>
                    {resetState.success && ' We have sent a link to your email. Please follow the link to reset your password'}
                </Typography>
                <Input
                    classes={{ underline: classes.underline }}
                    type='text'
                    id='reset-email'
                    placeholder='Email Address'
                    name={'email'}
                    className={classes.input}
                    onChange={e => handleFieldUpdate(e)}
                />
                <div>
                    <Button className={classes.submit} disabled={!email} onClick={handleSendResetEmail}>
                        Send Reset Link
                    </Button>
                    <div>
                        {resetState.success && (
                            <Button style={{ width: '100%', border: '1px solid grey' }}>
                                <Link to={'/auth/signin'}>Go to Login</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
