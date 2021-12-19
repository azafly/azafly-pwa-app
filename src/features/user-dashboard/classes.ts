import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useCardStyles = makeStyles((theme: Theme) =>
    createStyles({
        dashboardCard__root: {
            cursor: 'pointer',
            borderRadius: 8,
            marginBottom: 10,
            maxWidth: 900,
            margin: 'auto',
            border: '1px solid #DCDCDC',
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)',
            padding: 0,
            [theme.breakpoints.up('xl')]: { maxWidth: 1200 }
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
            fontFamily: 'Nunito',
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

export const useSidebarStyles = makeStyles(() =>
    createStyles({
        sidebar__root: {
            height: '120vh',
            borderRadius: 4,
            position: 'fixed',
            background: 'white',
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)',
            width: 250,
            flexGrow: 1,
            marginRight: '3vw',
            paddingTop: '5vh',
            marginTop: '-10vh'
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
        },
        active: {
            background: '#F0F8FF'
        }
    })
);

export const useDashboardStyles = makeStyles((theme: Theme) =>
    createStyles({
        dashboard_container: {
            backgroundColor: '#f2f5f7',
            minHeight: '100vh',
            height: 'auto',
            paddingTop: 120,
            [theme.breakpoints.down('xs')]: { paddingTop: 0 }
        },
        data__section: {
            margin: 'auto',
            '& .heading': {
                marginBottom: 10,
                fontFamily: 'Nunito',
                fontWeight: 650,
                marginTop: '4em',
                display: 'block',
                maxWidth: 900,
                margin: 'auto',
                color: theme.colors.textPrimary,
                [theme.breakpoints.up('xl')]: { maxWidth: 1200 },
                [theme.breakpoints.down('xs')]: { textAlign: 'center' }
            },
            [theme.breakpoints.down('sm')]: { width: '90vw' }
        },
        name: {
            fontWeight: 700,
            fontSize: '1.5rem',
            maxWidth: 900,
            margin: 'auto',
            paddingTop: '2vh',
            color: theme.colors.textPrimary,
            [theme.breakpoints.up('xl')]: { maxWidth: 1200 },
            textTransform: 'capitalize'
        }
    })
);

export const useEmptyCardStyles = makeStyles((theme: Theme) =>
    createStyles({
        empty_card_root: {
            borderRadius: 12,
            margin: 'auto',
            marginBottom: 20,
            maxWidth: 900,
            [theme.breakpoints.up('xl')]: { maxWidth: 1200 },
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
