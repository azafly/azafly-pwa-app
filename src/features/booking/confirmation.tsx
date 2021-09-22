import { useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core'
import { useHistory } from 'react-router-dom';


import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useModalStyles } from './classes'




// api
import { useInsertNewFreeConsulationTransactionMutation } from 'api/generated/graphql';
import { PopUpButton } from './popup-button';






export function Confrimation() {
    const [openAlert, setAlertOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const { authState: { user } } = useFirebaseAuthContext()
    const [insertNewFreeConsulationTransactionMutation] = useInsertNewFreeConsulationTransactionMutation({
        variables: {
            user_id: user!.uid ?? '',
            email: user!.email ?? ''
        }
    })



    const history = useHistory()
    const onConfirmDateSelection = async () => {
        try {
            await insertNewFreeConsulationTransactionMutation()
            history.push('/dashboard')
            setAlertOpen(true)
            setSuccess(true)
        } catch (error) {
            setAlertOpen(true)
            setSuccess(false)
        } finally {
            setAlertOpen(false)
        }
    }

    const handleSnackBarClose = () => {
        setAlertOpen(false)
    }

    const classes = useModalStyles()
    const alertSeverity = success ? 'success' : 'error'
    const alertMessaage = success ? `We successfully booked your event` : `Sorry, we couldn't book your event`
    const alertTitle = success ? 'Success' : 'Error'

    return (
        <>
            <Snackbar open={openAlert || success} autoHideDuration={5000} onClose={handleSnackBarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} key={'errorClandar'}>
                <Alert onClose={handleSnackBarClose} severity={alertSeverity} >
                    <AlertTitle> <strong>{alertTitle}</strong></AlertTitle>
                    {alertMessaage}
                </Alert>
            </Snackbar>
            <PopUpButton onDateSelected={onConfirmDateSelection} />
        </>
    );
}
