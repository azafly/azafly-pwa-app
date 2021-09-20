import { SyntheticEvent, useEffect, useState } from 'react'
import { Button, Input, Snackbar, SnackbarCloseReason, SnackbarOrigin } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import { Link } from 'react-router-dom'

import { useFirebaseAuthContext } from 'providers/auth/firebase'
import { NavBar } from 'components/navBar';
import { useForgotPasswordStyles } from './classes'



interface SnackBarAlertState {
    open: boolean,
    vertical: SnackbarOrigin['vertical']
    horizontal: SnackbarOrigin['horizontal']
}


const ForgotPassword = () => {
    const classes = useForgotPasswordStyles()
    const { authError, sendPasswordResetEmail, resetLinkSuccess } = useFirebaseAuthContext()
    const [email, setEmail] = useState('')
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

    useEffect(() => {
        setAlertState({
            ...alertState,
            open: resetLinkSuccess || Boolean(authError),
        })
    }, [authError, resetLinkSuccess])


    const message = resetLinkSuccess ? 'Link was sent Successfully' : authError

    return (
        <>
            < NavBar classNames='reset-navbar' />

            <div className={classes.forgotPasswordRoot}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleClose} className={`${classes.alert}`} severity={resetLinkSuccess ? 'success' : 'error'} >
                        <AlertTitle> <strong>Error</strong>    </AlertTitle>
                        {message}
                    </Alert>
                </Snackbar>

                <div className={classes.form_container}>
                    <Input classes={{ underline: classes.underline }} type='text' id='reset-email' placeholder='Email Address' name={'email'} className={classes.input} onChange={(e) => handleFieldUpdate(e)} />
                    <div>
                        <Button className={classes.submit} onClick={() => sendPasswordResetEmail(email)}>Send Reset Link</Button>
                    </div>
                    <Link to="reset-password" className={classes.loginLink}> Login with your new password</Link>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword