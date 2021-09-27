
import { Alert, AlertTitle } from '@material-ui/lab';
import { Box, Snackbar } from '@material-ui/core'




// components
import { PopUpButton } from './popup-button';
import { Bookingutton } from 'components/booking-button';



export interface BookingConfirmationProps {
    success: boolean
    openAlert: boolean
    handleSnackBarClose: () => void
    handleConfirmationSlected: () => void
    userHasFreeNoBookingLeft: boolean
}


export function Confirmation({ success, openAlert, handleConfirmationSlected, handleSnackBarClose, userHasFreeNoBookingLeft }: BookingConfirmationProps) {



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
            <PopUpButton onDateSelected={() => handleConfirmationSlected()} />
            {/* {userHasFreeNoBookingLeft ?
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    margin: 30,
                    justifyContent: 'center'
                }}>
                    <Bookingutton text={'Book a consultation'} onClick={handleConfirmationSlected} />
                </Box>

                :
                <PopUpButton onDateSelected={handleConfirmationSlected} />
            } */}

        </>
    );
}
