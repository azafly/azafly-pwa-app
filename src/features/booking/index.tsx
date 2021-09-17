import axios from 'axios'
import { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core';
import { format } from 'date-fns'
import { useRef } from 'react';
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles';
import { AvailableTimes } from './available-times';
import { BookingInfo } from './info/booking-info';
import { BookingCalendar } from './calendar';

import { useMainBookingStyle } from './classes'


import { useGetCurrentUserQuery } from 'api/generated/graphql'
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { DashboardLoaderSkeleton } from '../user-dasboard/loader-skeleton';
import DesktopNabBar from '../user-dasboard/nav';


const CALENDAR_URL = 'https://us-central1-pick-safe.cloudfunctions.net/consultationCalendar '


const BookingService = () => {
    const classes = useMainBookingStyle()
    const [date, setDate] = useState<any>()
    const [availableTimesArray, setAvailableTimeArray] = useState<any>([])
    const [availableDates, setAvailableDates] = useState<any>(null)

    const { authState: { user } } = useFirebaseAuthContext()
    const { data, loading } = useGetCurrentUserQuery({
        variables: {
            email: user!.email ?? '',
            id: user?.uid ?? ''
        }
    })

    const userData = data?.user_by_pk

    const fetchAvailableTime = async (date: any) => {
        try {
            const formattedDate = format(new Date(date), 'yyyy-MM-dd')
            const availableTimesForSelectedDate = availableDates[`${formattedDate}`]?.map((event: any) => event)
            setAvailableTimeArray(availableTimesForSelectedDate)
        } catch (error) {
            console.warn(error)
        }
    }

    const theme = useTheme();
    const isMobileScreen = useMediaQuery(theme.breakpoints.only('xs'));

    const timesRef = useRef<HTMLDivElement | null>(null)

    const onDateSelected = (selectedDate: any) => {
        new Promise((resolve) => {
            setDate(selectedDate)
            if (isMobileScreen && timesRef && timesRef.current) {
                timesRef.current.scrollIntoView({ behavior: 'smooth' })
            }
            resolve(selectedDate)
        }).then(async (newDate) => {
            await fetchAvailableTime(newDate)
        })
    }


    useEffect(() => {
        axios.get(CALENDAR_URL).then(({ data }: any) => {
            setAvailableDates(data)
        })
    }, [])

    if (loading) {
        return <DashboardLoaderSkeleton />
    }

    if (userData?.used_free_consultation) {
        return <div> Hey Yo, you sued your free consultation. Go to dashboard</div>
    }

    return (
        <>
            < DesktopNabBar />
            <div className={classes.bookingPage_container}>
                <Grid container spacing={3} justifyContent={'space-around'} alignItems={'center'}>
                    <BookingInfo />
                    <BookingCalendar date={date} onDateSelected={onDateSelected} availableDates={availableDates} />
                    <AvailableTimes availableTimesArray={availableTimesArray} ref={timesRef} />
                </Grid>
            </div>
        </>

    )
}

export default BookingService