import { Button } from '@material-ui/core';

import { CalendarSvgComponent } from './icons/calendar';

interface BookingButtonProps {
    text: string
    onClick: any
}
export const Bookingutton = ({ text, onClick }: BookingButtonProps) => {
    return (
        <Button onClick={onClick} variant={'contained'} color={'primary'} style={{ textTransform: 'none' }} endIcon={<CalendarSvgComponent />}>{text}</Button>
    )
}
