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
            minWidth: 350,
            [theme.breakpoints.up('sm')]: {
                minWidth: 600
            }
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
            color: theme.colors.textPrimary
        },
        tip: {
            fontSize: '0.85rem',
            color: theme.colors.base,
            marginTop: 30
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        advisor: {
            fontWeight: 700,
            color: theme.colors.textPrimary
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
            color: theme.colors.base,
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
            color: theme.colors.textPrimary
        },
        actions: {
            '& .yes': {
                color: theme.colors.base,
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
