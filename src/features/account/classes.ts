import { createStyles, makeStyles, Theme } from '@material-ui/core';
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        user_account__root: {
            display: 'flex',
            maxWidth: 1020,
            margin: 'auto',
            alignItems: 'center',
            marginTop: '20vh',
            flexDirection: 'column',
            height: '100vh'
        },
        heading: {
            fontSize: 25,
            fontWeight: 900,
            textAlign: 'center',
            '& span': {
                borderBottom: '2px solid green'
            },
            '& a': {
                cursor: 'pointer',
                zIndex: 100000
            }
        },
        files: {
            margin: 'auto',
            '& img': {
                width: '90%',
                margin: 'auto',
                height: 300,
                borderRadius: 8
            }
        },
        form_container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '3vh 5vw',
            [theme.breakpoints.down('md')]: {}
        },
        edit: {
            cursor: 'pointer',
            textAlign: 'center'
        },
        title: {
            alignSelf: 'flex-start',
            marginLeft: '10vw',
            marginBottom: 30,
            textDecoration: 'underline'
        },
        input: {
            borderRadius: 4,
            WebkitAppearance: 'none',
            border: 'none',
            width: '100%',
            padding: 10
        },
        picture: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.colors.base,
            padding: '4rem',
            borderRadius: '50%',
            marginBottom: 10,
            opacity: 0.5,
            cursor: 'pointer'
        },
        kyc_title: {
            fontWeight: 800,
            marginBottom: 20
        },
        terms: {
            display: 'flex',
            fontSize: 12,
            fontWeight: 450,
            color: '#77838F'
        },
        checkBox: {
            width: 20,
            marginRight: 10,
            borderRadius: 10,
            margin: 10,
            cursor: 'pointer'
        },
        submit: {
            margin: 25
        },
        disable: {
            pointerEvents: 'none'
        },

        upload: {
            '& label': {
                cursor: 'pointer'
            },
            '& span': {
                fonWeight: 900
            }
        }
    })
);
