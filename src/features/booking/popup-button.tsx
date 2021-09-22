import { Box, Button } from '@material-ui/core';

import { openPopupWidget, CalendlyEventListener } from "react-calendly";
import { CalendarSvgComponent } from 'components/icons/calendar';
import { useFirebaseAuthContext } from 'providers/auth/firebase';

interface Prefill {
    email: string,
    name?: string,
    guests: Array<string>
}

const pageSettings = {
    backgroundColor: 'ffffff',
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: '00a2ff',
    textColor: '4d5055'
}
interface BookinButtonProps {
    url: string
    prefill: Prefill
    pageSettings: typeof pageSettings
}

const CALENDAR_URL = 'https://calendly.com/ajiboye-o-john/azapy-initial-free-consultation'

const BokkingButton = ({ url, prefill, pageSettings }: BookinButtonProps) => {

    const onClick = () => openPopupWidget({ url, prefill, pageSettings });

    return <Button variant={'contained'} size={"large"} color={"primary"} onClick={onClick} endIcon={<CalendarSvgComponent />}> Book a Date</Button>;

};

interface PopUpButtonProps {
    onDateSelected: (date: Date | null) => void
}
export function PopUpButton({ onDateSelected }: PopUpButtonProps) {
    const { authState: { user } } = useFirebaseAuthContext()

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            margin: 50
        }}>
            < BokkingButton pageSettings={{
                backgroundColor: 'ffffff',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: '#4990a4',
                textColor: '4d5055'
            }}
                prefill={{
                    email: user?.email ?? '',
                    name: user?.displayName ?? '',
                    guests: [`${user?.email ?? ''}`],
                }}
                url={CALENDAR_URL}
            />
            <CalendlyEventListener
                onDateAndTimeSelected={(e) => onDateSelected}
                onEventScheduled={(e) => console.log(e)}
                onEventTypeViewed={function noRefCheck() { }}
                onProfilePageViewed={function noRefCheck() { }}
            />
        </Box>
    )
}