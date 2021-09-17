import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core'
import Badge from '@material-ui/core/Badge';

export const useMainBookingStyle = makeStyles((theme: Theme) =>
    createStyles({
        bookingPage_container: {
            marginTop: '150px',
            margin: '150px 10vw',
            zIndex: 999,
            [theme.breakpoints.only('xs')]: {
                margin: '90px 5vw',
            }
        },
    }),

);

export const useCalendarStyles = makeStyles((theme: Theme) =>
    createStyles({
        calendarContainer: {
            minWidth: 350,
            margin: 'auto',
            padding: 10,
            [theme.breakpoints.only('xs')]: {
                marginTop: 20,
                borderRadius: 10,
            },
        },
    })
);

export const useDayAvailableTimeStyles = makeStyles((theme: Theme) =>
    createStyles({
        timesContainer: {
            padding: '10px 30px',
            minWidth: 70,
            textAlign: 'center',
            border: `2px solid ${theme.colors.mainGreen}`,
            borderRadius: 6,
            margin: 'auto',
            cursor: 'pointer',
            background: 'white',
            marginBottom: 10,
            fontWeight: 800,
            '&:hover': {
                background: theme.colors.mainGreen,
            }
        }
    })
);



export const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }),
)(Badge);


export const useBookingInfoStyles = makeStyles((theme: Theme) =>
    createStyles({
        booking_info_container: {
            height: '100%',
            minWidth: 350
        },
        title: {
            fontWeight: 900,
            marginTop: 20,
            textTransform: 'capitalize'
        },
        time: {
            display: 'flex',
            color: '#424242'
        },
        infoText: {
            fontSize: '0.85rem',
            color: theme.colors.black
        },
        tip: {
            fontSize: '0.85rem',
            color: theme.colors.mainGreen,
            marginTop: 30
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        advisor: {
            fontWeight: 700,
            color: theme.colors.black
        }
    })
);


export const useDaysTimeContainerStyles = makeStyles((theme: Theme) =>
    createStyles({
        days_time_container: {
            margin: 'auto',
        },
        notavailable: {
            fontWeight: 900,
            fontSize: '1rem'
        },
        available: {
            fontWeight: 900,
            fontSize: '1rem'
        },
        tip: {
            fontSize: '0.8rem',
            color: theme.colors.mainGreen,
            marginTop: 30
        },

    })
);


export const useModalStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal_root: {
            fontSize: '.9rem',
            fontWeight: 800,
            '&:hover': {
                background: 'white'
            }
        },
        text: {
            fontSize: '1rem',
            color: theme.colors.black
        },
        actions: {
            '& .yes': {
                color: theme.colors.mainGreen,
                fontSize: '1rem',
                textTransform: 'capitalize',
                fontWeight: 900
            },
            '& .no': {
                color: 'red',
                fontSize: '1rem',
                textTransform: 'capitalize',
                fontWeight: 900
            }
        }
    })
);
