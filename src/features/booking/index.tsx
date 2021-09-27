import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


import { BookingInfo } from './info/booking-info';
import { PriceCardList } from './price-cards/container'
import { useMainBookingStyle } from './classes'
import DesktopNabBar from '../user-dasboard/nav';

// api
import { useInsertNewFreeConsulationTransactionMutation, useGetCurrentUserQuery } from 'api/generated/graphql';
import { useFirebaseAuthContext } from 'providers/auth/firebase';


const BookingService = () => {

    const [openPriceList, setOpenPriceList] = useState<boolean>(false)
    const [openAlert, setAlertOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const { authState: { user } } = useFirebaseAuthContext()
    const variables = {
        user_id: user!.uid ?? '',
        email: user!.email ?? ''
    }

    const { data } = useGetCurrentUserQuery({
        variables: {
            id: user?.uid ?? '',
            email: user?.email ?? ''
        }
    })

    const [insertNewFreeConsulationTransactionMutation] = useInsertNewFreeConsulationTransactionMutation({ variables })

    const userHasFreeNoBookingLeft = data?.user_by_pk?.used_free_consultation ?? true
    const history = useHistory()

    const handleConfirmationSlectedFree = async () => {
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




    const handleOnclickBookNow = () => {
        // check if free consulation used
        handleConfirmationSlectedFree
        if (userHasFreeNoBookingLeft) {
            setOpenPriceList(true)

            //
        } else {

        }


    }


    const classes = useMainBookingStyle()
    return (
        <div style={{
            background: 'rgb(239, 242, 246)',
        }}>
            < DesktopNabBar />
            <div className={classes.bookingPage_container}>
                <Grid container spacing={3} justifyContent={'space-around'} alignItems={'center'}>
                    <BookingInfo confirmationProps={{ success, openAlert, handleSnackBarClose, handleConfirmationSlected: handleOnclickBookNow, userHasFreeNoBookingLeft }} />
                    {openPriceList && <PriceCardList />}
                </Grid>
            </div>
        </div>

    )
}

export default BookingService