import { SyntheticEvent, useEffect, useState } from 'react'
import { Button, Input, Snackbar, SnackbarCloseReason, SnackbarOrigin } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import { Link } from 'react-router-dom'

import { useFirebaseAuthContext } from 'providers/auth/firebase'
import { NavBar } from 'components/navBar';
import { useForgotPasswordStyles } from './classes'
import { UniqueTypeNamesRule } from 'graphql';



interface SnackBarAlertState {
    open: boolean,
    vertical: SnackbarOrigin['vertical']
    horizontal: SnackbarOrigin['horizontal']
}


const ForgotPassword = () => {
    const classes = useForgotPasswordStyles()
    const { sendPasswordResetEmail } = useFirebaseAuthContext()
    const [email, setEmail] = useState('')
    const [resetState, setResetState] = useState({
        success: false,
        error: false
    })
    const [alertState, setAlertState] = useState<SnackBarAlertState>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    })


    const { vertical, horizontal, open } = alertState;

    const handleFieldUpdate = (e: any) => {
        const { value } = e.target;
        setEmail(value)
    }

    const handleClose = (_: SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertState({ ...alertState, open: false })
    };
    const handleSendResetEmail = () => {
        sendPasswordResetEmail(email)
            .then(() => setResetState({ error: false, success: true }))
            .catch(() => setResetState({ error: true, success: false }))
            .finally(() => setAlertState({ ...alertState, open: true }))
    }




    const message = resetState.success ? 'Link was sent Successfully' : 'Error Sending resent Link. Try again'
    const alertSeverity = resetState.success ? 'success' : 'error'

    return (
        <>
            < NavBar classNames='reset-navbar' />

            <div className={classes.forgotPasswordRoot}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleClose} className={`${classes.alert}`} severity={alertSeverity} >
                        <AlertTitle> <strong>{alertSeverity}</strong>    </AlertTitle>
                        {message}
                    </Alert>
                </Snackbar>

                <div className={classes.form_container}>
                    <Input classes={{ underline: classes.underline }} type='text' id='reset-email' placeholder='Email Address' name={'email'} className={classes.input} onChange={(e) => handleFieldUpdate(e)} />
                    <div>
                        <Button className={classes.submit} disabled={!email} onClick={handleSendResetEmail}>Send Reset Link</Button>
                    </div>
                    <Link to="reset-password" className={classes.loginLink}> Login with your new password</Link>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword