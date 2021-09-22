import { Grid } from '@material-ui/core';
import { BookingInfo } from './info/booking-info';

import { useMainBookingStyle } from './classes'


import { useGetCurrentUserQuery } from 'api/generated/graphql'
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import DesktopNabBar from '../user-dasboard/nav';





const BookingService = () => {
    const classes = useMainBookingStyle()

    const { authState: { user } } = useFirebaseAuthContext()
    const { data } = useGetCurrentUserQuery({
        variables: {
            email: user!.email ?? '',
            id: user?.uid ?? ''
        }
    })

    const userData = data?.user_by_pk

    // TODO => UPDATE TO PROPER COMPONENT
    if (userData?.used_free_consultation) {
        return <div> Hey Yo, you sued your free consultation. Go to dashboard</div>
    }

    return (
        <>
            < DesktopNabBar />
            <div className={classes.bookingPage_container}>
                <Grid container spacing={3} justifyContent={'space-around'} alignItems={'center'}>
                    <BookingInfo />
                </Grid>
            </div>
        </>

    )
}

export default BookingService