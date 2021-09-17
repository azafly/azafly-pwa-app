import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Typography, Box } from '@material-ui/core';

import { useModalStyles } from '../classes'
import { addUserToCalendarEvent } from '../utils/index';
import { useHistory } from 'react-router-dom';

// graphql
import { useInsertNewFreeConsulationTransactionMutation } from 'api/generated/graphql';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

import { useFirebaseAuthContext } from 'providers/auth/firebase';




interface ConfirmatioDialogProps {
    handleClose: () => void
    open: boolean
    appointmentDateAndTime: string
    event: any
}





export function ConfrimationDialog({ handleClose, open, appointmentDateAndTime, event }: ConfirmatioDialogProps) {
    const history = useHistory()
    const { authState: { user, token } } = useFirebaseAuthContext()
    const [insertNewFreeConsulationTransactionMutation, { data, loading, error }] = useInsertNewFreeConsulationTransactionMutation({
        variables: {
            user_id: user!.uid ?? '',
            email: user!.email ?? ''
        }
    })

    const onConfirmDateSelection = () => {
        addUserToCalendarEvent(event.meta.id, user?.email, token)
        insertNewFreeConsulationTransactionMutation().then((data) => {
            handleClose()
        }).then(() => history.push('/dashboard'))
            .catch(error => console.warn(error))

    }

    const classes = useModalStyles()
    return (
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
                        {`Please confirm your consulation for`} <Box fontWeight="fontWeightBold">{appointmentDateAndTime}</Box>
                    </Typography>

                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button onClick={onConfirmDateSelection} className='yes'>Confirm Date</Button>
                <Button onClick={handleClose} className={'no'}> Change Date</Button>
            </DialogActions>
        </Dialog>
    );
}
