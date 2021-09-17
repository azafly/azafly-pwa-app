import { useDayAvailableTimeStyles } from './classes'
import { format } from 'date-fns'

interface DayAvailableTimeProps {
    availableTimes: any
    onClickOpen: () => void
}

export const DayAvailableTime = ({ availableTimes, onClickOpen }: DayAvailableTimeProps) => {
    const classes = useDayAvailableTimeStyles()

    const handleConfirmationOpen = () => {
        onClickOpen()
    }

    return (
        <div className={classes.timesContainer} onClick={handleConfirmationOpen}>
            {`${format(new Date(availableTimes.start), 'HH:mm')}`}
        </div>
    )
}
