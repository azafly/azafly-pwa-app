import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useCardStyles = makeStyles((theme: Theme) =>
    createStyles({
        dashboardCard__root: {
            cursor: 'pointer',
            borderRadius: 12,
            maxWidth: 1200,
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)',
            marginBottom: 20,
            margin: 'auto',
            [theme.breakpoints.only('lg')]: {
                marginLeft: '10vw',
                width: '60vw'
            },
            [theme.breakpoints.down('sm')]: {
                width: '90vw'
            }
        },
        summary_heading: {
            fontWeight: 800,
            padding: 30
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
                fontWeight: 800,
                fontSize: '1.1rem'
            },
            '& .date': {
                fontSize: '0.8rem',
                fontWeight: 500
            }
        }
    })
);

export const useInfoTextStyles = makeStyles((theme: Theme) =>
    createStyles({
        infoText_root: {
            display: 'flex',
            alignContent: 'center',
            maxWidth: 800
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
            fontSize: '1.1rem',
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

export const useSidebarStyles = makeStyles((theme: Theme) =>
    createStyles({
        sidebar__root: {
            height: '100vh',
            borderRadius: 4,
            position: 'fixed',
            background: 'white',
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)',
            width: 250,
            flexGrow: 1,
            marginRight: '3vw',
            paddingTop: '20vh'
        },
        button: {
            textDecoration: 'none',
            '& a': {
                textTransform: 'capitalize',
                fontFamily: 'Nunito',
                color: '#0D324D',
                fontWeight: 600,
                fontSize: '0.9rem'
            }
        }
    })
);

export const useDashboardStyles = makeStyles((theme: Theme) =>
    createStyles({
        dashboard_container: {
            backgroundColor: theme.palette.background.default,
            margin: 'auto',
            flexDirection: 'column',
            marginTop: '10vh',
            [theme.breakpoints.up('lg')]: {
                width: '60vw'
            }
        },
        main: {
            display: 'flex'
        },
        heading: {
            marginBottom: 10,
            fontFamily: 'Nunito',
            fontWeight: 800,
            marginTop: '4em',
            color: theme.colors.textPrimary,
            [theme.breakpoints.up('md')]: {
                marginLeft: '10vw'
            },
            [theme.breakpoints.only('lg')]: {},
            [theme.breakpoints.only('sm')]: { textAlign: 'center' },
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
            borderRadius: 12,
            margin: 'auto',
            marginBottom: 20,
            maxWidth: 1200,
            [theme.breakpoints.only('lg')]: {
                marginRight: '-15vw'
            },
            [theme.breakpoints.down('md')]: {
                width: '90vw'
            },
            '& svg': {
                height: '20vh',
                margin: 'auto',
                width: '80%'
            }
        },
        card: {
            marginTop: 20
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
