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
        form_container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '3vh 5vw',
            [theme.breakpoints.down('md')]: {}
        },
        edit: {
            cursor: 'pointer'
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
            width: 150,
            height: 150,
            opacity: '0.5',
            borderRadius: '50%',
            marginBottom: 10,
            cursor: 'pointer'
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
            marginTop: 25
        }
    })
);
