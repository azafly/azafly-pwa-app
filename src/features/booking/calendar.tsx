import { isPast, format } from 'date-fns'
import { Calendar } from 'react-nice-dates'
import { Box, Card, Grid } from '@material-ui/core';
import { enGB } from 'date-fns/locale'


import { useCalendarStyles } from './classes'
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { openPopupWidget } from "react-calendly";


const modifiersClassNames = {
    disabled: 'disabled',
    available: 'available'
}

function isDateAvailable(availableDates: any, date: Date) {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd')
    return !isPast(date) && !!availableDates && (formattedDate in availableDates)
}


interface BookingCalendarProps {
    date: Date
    onDateSelected: (date: Date | null) => void
    availableDates: any // type this from google docs
    loading: boolean
}
export function BookingCalendar({ onDateSelected, availableDates, loading }: BookingCalendarProps) {

    const modifiers = {
        disabled: (date: Date) => isPast(date),
        available: (date: Date) => isDateAvailable(availableDates, date),
    }



    const classes = useCalendarStyles()
    return (

        <Grid item xs={12} md={4} >
            <Card className={classes.calendarContainer}>
                {loading ?
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                        <ThreeDots />
                    </Box>
                    :
                    <Calendar
                        locale={enGB}
                        modifiers={modifiers}
                        onDayClick={onDateSelected}
                        modifiersClassNames={modifiersClassNames}
                    />
                }
            </Card>
        </Grid>
    )
}