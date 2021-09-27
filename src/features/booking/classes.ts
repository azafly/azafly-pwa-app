import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core'
import Badge from '@material-ui/core/Badge';

export const useMainBookingStyle = makeStyles((theme: Theme) =>
    createStyles({
        bookingPage_container: {
            backgroundColor: 'rgb(239, 242, 246)',
            height: '100vh',
            paddingTop: 10,
            zIndex: 999,
            [theme.breakpoints.only('xs')]: {
                margin: '0px 5vw',
                paddingTop: 30
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
            minWidth: 350,
            maxWidth: '100vw',
            overflowX: 'hidden',
            [theme.breakpoints.up('sm')]: {
                minWidth: 600,
                maxWidth: 800,
                margin: 20
            }
        },
        card: {
            transition: 'all 0.28s cubic-bezier(0.15, 0, 0.15, 1) 0s',
            boxShadow: 'rgba(0, 27, 71, 0.16) 0px 29px 32px -25px',
            borderRadius: 8,

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
