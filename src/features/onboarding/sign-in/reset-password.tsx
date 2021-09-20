import { SyntheticEvent, useEffect, useState } from 'react'
import { Button, Input, Snackbar, SnackbarCloseReason, SnackbarOrigin } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import { Link } from 'react-router-dom'

import { useFirebaseAuthContext } from 'providers/auth/firebase'
import { NavBar } from 'components/navBar';
import { useForgotPasswordStyles } from './classes'
import { useURLParams } from '../../../hooks/use-url-params';


interface SnackBarAlertState {
    open: boolean,
    vertical: SnackbarOrigin['vertical']
    horizontal: SnackbarOrigin['horizontal']
}


const ResetPassword = () => {
    const classes = useForgotPasswordStyles()
    const { authError, confirmPasswordReset, verifyPasswordCode } = useFirebaseAuthContext()
    const [password, setPassword] = useState('')
    const [alertState, setAlertState] = useState<SnackBarAlertState>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    })

    const verificationCode = useURLParams('oobCode')


    const { vertical, horizontal, open } = alertState;

    const handleFieldUpdate = (e: any) => {
        const { value } = e.target;
        setPassword(value)
    }

    const handlePasswordReset = () => {
        verifyPasswordCode(verificationCode).then((result: any) => {
            confirmPasswordReset(verificationCode, password)
        }).catch((error: any) => console.log(error))
    }

    const handleClose = (_: SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertState({ ...alertState, open: false })
    };


    return (
        <>
            < NavBar classNames='reset-navbar' />
            <div className={classes.forgotPasswordRoot}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleClose} className={`${classes.alert}`} severity={'success'} >
                        <AlertTitle> <strong>Error</strong>    </AlertTitle>
                        {'message'}
                    </Alert>
                </Snackbar>

                <div className={classes.form_container}>
                    {/* <Input classes={{ underline: classes.underline }} type='password' id='reset-email' placeholder='Old Password' name={'oldPassword'} className={classes.input} onChange={(e) => handleFieldUpdate(e)} /> */}
                    <Input classes={{ underline: classes.underline }} type='password' id='reset-email' placeholder='New Password' name={'password'} className={classes.input} onChange={(e) => handleFieldUpdate(e)} />
                    <div >
                        <Button className={classes.submit} size={'large'} color="inherit" onClick={handlePasswordReset}>Reset Password</Button>
                    </div>
                    <Link to="/signin" className={classes.loginLink}> Login with your new password</Link>
                </div>
            </div>
        </>
    )
}

export default ResetPassword