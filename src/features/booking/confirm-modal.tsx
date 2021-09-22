import React, { useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { TransitionProps } from '@material-ui/core/transitions';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Snackbar, Typography, } from '@material-ui/core'
import { useHistory } from 'react-router-dom';


import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { addUserToCalendarEvent } from './utils/index';
import { useModalStyles } from './classes'




// api
import { useInsertNewFreeConsulationTransactionMutation } from 'api/generated/graphql';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});




interface ConfirmatioDialogProps {
    handleClose: () => void
    open: boolean
    appointmentDateAndTime: string
    event: any
}





export function ConfrimationDialog({ handleClose, open, appointmentDateAndTime, event }: ConfirmatioDialogProps) {
    const [openAlert, setAlertOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const { authState: { user, token } } = useFirebaseAuthContext()
    const [insertNewFreeConsulationTransactionMutation] = useInsertNewFreeConsulationTransactionMutation({
        variables: {
            user_id: user!.uid ?? '',
            email: user!.email ?? ''
        }
    })



    const history = useHistory()
    const onConfirmDateSelection = async () => {
        try {
            await addUserToCalendarEvent(event.meta.id, user?.email, token)
            await insertNewFreeConsulationTransactionMutation()
            history.push('/dashboard')
            setAlertOpen(true)
            setSuccess(true)
        } catch (error) {
            setAlertOpen(true)
            setSuccess(false)
        } finally {
            handleClose()
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
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Sure about this time?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Typography paragraph className={classes.text}>
                            {`Please confirm your consultation for`} <Box fontWeight="fontWeightBold">{appointmentDateAndTime}</Box>
                        </Typography>

                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={onConfirmDateSelection} className='yes'>Confirm Date</Button>
                    <Button onClick={handleClose} className={'no'}> Change Date</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
