import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Background from './illustrations/background-circle.svg'

export const useMainFAQStyle = makeStyles((theme: Theme) =>
    createStyles({
        faq__main: {
            marginTop: 100,
            background: 'white',
            maxWidth: '100vw',
            overflowX: 'hidden',
            [theme.breakpoints.up('md')]: {
                backgroundImage: `url(${Background})`,
                backgroundPosition: 'top -0px right -100px',
                backgroundRepeat: 'no-repeat',
            }
        },
        hero: {

        }
    }),

);


export const useHeroStyle = makeStyles((theme: Theme) =>
    createStyles({
        hero__main: {
            background: theme.palette.background.default,
            [theme.breakpoints.up('md')]: {
                height: 600,



            }
        },
        searchRoot: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        },
    }),
);



export const useCardContainerStyle = makeStyles((theme: Theme) =>
    createStyles({
        cards: {
            margin: 'auto',
            [theme.breakpoints.up('md')]: {
                width: '80%',
                margin: 'auto'




            }
        }
    }),
);


export const useCardStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
            marginTop: -100
        },
        media: {
            height: 140
        },
        action: {
            padding: 20
        }
    }),
);


export const useSearchContainerStyle = makeStyles((theme: Theme) =>
    createStyles({
        search: {
            borderRadius: theme.shape.borderRadius,
            '&:hover': {

            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }),
);



export const useTabStyles = makeStyles((theme: Theme) => ({
    tabContainer: {
        marginTop: 100,
        [theme.breakpoints.up('md')]: {
            marginLeft: '10vw',
        },

    },
    title: {
        marginBottom: 20,
        fontWeight: 700
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        '& .MuiTab-wrapper': {
            textTransform: 'capitalize',
            color: theme.colors.black,
            fontWeight: 550

        },
        '& .Mui-selected': {
            fontWeight: 550
        },
        '& .MuiBox-root-36': {
            [theme.breakpoints.up('md')]: {
                maxWidth: '60vw',
                width: '60vw',
                margin: 'auto',
            },
        },
        '& .MuiTabs-flexContainerVertical': {
            [theme.breakpoints.up('md')]: {
                width: '20vw'
            },
            width: '20vw'
        },
        '& .MuiBox-root-59': {
            [theme.breakpoints.up('md')]: {
                width: '20vw'
            },
        }
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },


}));