import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useCardStyles = makeStyles((theme: Theme) =>
    createStyles({
        dashboardCard__root: {
            cursor: 'pointer',
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)',
            borderRadius: 12,
            margin: 'auto',
            marginBottom: 20,
            [theme.breakpoints.up('md')]: {
                width: '74vw',
                padding: 20
            },
            [theme.breakpoints.only('sm')]: {
                width: '84vw',
                padding: 10
            },
            [theme.breakpoints.only('xs')]: {
                width: '90vw',
                padding: 0
            }
        },
        summary_heading: {
            fontWeight: 800,
            paddingBottom: 30
        },
        divider: {
            width: '150%',
            backgroundColor: 'rgb(212, 227, 235)',
            border: 'medium none',
            height: 2,
            margin: '30px -100px'
        },
        serviceInitiated: {
            backgroundColor: '#C5FAAC',
            color: '#0D324D',
            fontWeight: 450,
            display: 'flex',
            justifyContent: 'center',
            minWidth: '15ch',
            alignContent: 'center',
            '& span': {
                margin: 'auto'
            }
        },
        starter: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        serviceName: {
            '& .name': {
                fontWeight: 600
            },
            '& .date': {
                fontSize: '0.9rem',
                fontWeight: 500
            }
        }
    })
);

export const useInfoTextStyles = makeStyles((theme: Theme) =>
    createStyles({
        infoText_root: {
            display: 'flex',
            alignContent: 'center'
        },
        text: {
            padding: 10,
            borderRadius: 10,
            marginLeft: 10,
            width: '100%',
            fontSize: '0.8rem',
            fontWeight: 700,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.hint
        }
    })
);

export const StyledBadge = makeStyles(() =>
    createStyles({
        badge: {
            animation: '$ripple 1.4s infinite ease-in-out'
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(1.0)'
            },
            '100%': {
                transform: 'scale(1.3)'
            }
        }
    })
);

export const useDashboardStyles = makeStyles((theme: Theme) =>
    createStyles({
        dashboard_container: {
            backgroundColor: theme.palette.background.default,
            margin: 'auto',
            width: '100%',
            flexDirection: 'column',
            position: 'relative'
        },
        heading: {
            marginBottom: 30,
            fontSize: '2rem',
            fontFamily: 'Nunito',
            fontWeight: 900,
            color: theme.colors.textPrimary,
            [theme.breakpoints.up('md')]: {
                marginLeft: '13vw'
            },
            [theme.breakpoints.only('sm')]: {
                marginLeft: '8vw'
            },
            [theme.breakpoints.only('xs')]: {
                textAlign: 'center'
            }
        },
        name: {
            marginTop: 100
        }
    })
);

export const useEmptyCardStyles = makeStyles((theme: Theme) =>
    createStyles({
        empty_card_root: {
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)',
            borderRadius: 12,
            margin: 'auto',
            marginTop: '5vh',
            marginBottom: 20,
            [theme.breakpoints.up('md')]: {
                width: '74vw',
                padding: 20
            },
            [theme.breakpoints.only('sm')]: {
                width: '84vw',
                padding: 10
            },
            [theme.breakpoints.only('xs')]: {
                width: '90vw',
                padding: 0
            },
            '& svg': {
                width: '80%',
                height: '30vh',
                margin: 'auto'
            }
        },
        button: {
            textTransform: 'none',
            padding: 10,
            margin: 5,
            width: '100%',
            fontWeight: 300
        },
        nothing: {
            margin: 20,
            textAlign: 'center'
        },
        chip: {
            minWidth: '10ch',
            marginRight: '1ch',
            marginTop: '1ch'
        },
        disabled: {
            pointerEvents: 'none'
        }
    })
);
