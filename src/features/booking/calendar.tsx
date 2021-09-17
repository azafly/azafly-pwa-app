import { useState } from 'react';
import { isPast, format } from 'date-fns'
import { Calendar } from 'react-nice-dates'

import { Card, Grid, Paper } from '@material-ui/core';
import { enGB } from 'date-fns/locale'

import { useCalendarStyles } from './classes'



const modifiersClassNames = {
    disabled: 'disabled',
    available: 'available'
}

function isDateAvailable(availableDates: any, date: Date) {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd')
    return !isPast(date) && !!availableDates && (formattedDate in availableDates)
}


interface BookingCalendarProps {
    date: any
    onDateSelected: (date: any) => void
    availableDates: any
}
export function BookingCalendar({ date, onDateSelected, availableDates }: BookingCalendarProps) {

    const modifiers = {
        disabled: (date: any) => isPast(date),
        available: (date: any) => isDateAvailable(availableDates, date),
    }


    const classes = useCalendarStyles()
    return (

        <Grid item xs={12} md={4} >
            <Card className={classes.calendarContainer}>
                <Calendar
                    locale={enGB}
                    modifiers={modifiers}
                    onDayClick={onDateSelected}
                    modifiersClassNames={modifiersClassNames}
                />
            </Card>
        </Grid>



    )
}