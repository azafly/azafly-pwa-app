import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useSignUpFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        signUpformRoot: {},
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
            maxWidth: 600,
            marginTop: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            [theme.breakpoints.down('md')]: {
                margin: 0
            },
            '& .info': {
                color: '#4990A4'
            }
        },
        name: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            background: 'none !important',
            '& .MuiInput-formControl::before': {
                opacity: 0.7
            },
            '& .MuiFormLabel-root': {
                opacity: 0.7,
                marginLeft: 15,
                fontSize: '0.8rem',
                [theme.breakpoints.down('md')]: {
                    marginLeft: 5,
                    fontSize: '0.7rem'
                }
            },
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column'
            },
            '& .lastname': {
                [theme.breakpoints.up('md')]: {
                    marginLeft: 10,
                    width: 'calc(50% -5px)'
                }
            }
        },
        others: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#77838F',
            '& .MuiInput-formControl': {
                opacity: 0.7
            },
            '& .MuiFormLabel-root': {
                opacity: 0.7,
                marginLeft: 15,
                fontSize: '0.8rem',
                [theme.breakpoints.down('md')]: {
                    marginLeft: 5,
                    fontSize: '0.7rem'
                }
            }
        },
        input: {
            borderRadius: 4,
            WebkitAppearance: 'none',
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
            background: '#fff !important',
            border: 'none',
            margin: '10px 0px'
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
        divider: {
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            margin: '10px 0px',
            '& .line': {
                width: '50%',
                backgroundColor: 'rgb(212, 227, 235)',
                border: 'medium none',
                height: 1
            },
            '& .or': {
                color: 'rgb(175, 199, 209)',
                fontWeight: 400,
                margin: '0px 10px'
            }
        },
        facebook: {
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgb(0, 118, 251)',
            padding: 5,
            color: 'white',
            fontWeight: 500,
            textTransform: 'none',
            fontSize: '0.875rem',
            borderRadius: 6,
            margin: '10px 0px',
            height: 40,
            zIndex: 10000,
            textAlign: 'center',
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
            '& svg': {
                flexGrow: 0,
                width: 40,
                height: 40
            },
            '& .text': {
                margin: 'auto',
                textAlign: 'right'
            }
        },
        google: {
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            height: 40,
            backgroundColor: 'rgb(255, 255, 255)',
            padding: 5,
            color: theme.palette.text.primary,
            fontWeight: 500,
            textTransform: 'none',
            fontSize: '0.875rem',
            borderRadius: 6,
            margin: '10px 0px',
            zIndex: 10000,
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
            '& svg': {
                flexGrow: 0,
                width: 40,
                height: 40
            },
            '& .text': {
                margin: 'auto'
            }
        },
        termsLink: {
            color: theme.palette.primary.main,
            fontWeight: 600,
            cursor: 'pointer'
        },
        submit: {
            background: theme.colors.base,
            borderRadius: 6,
            textAlign: 'center',
            cursor: 'pointer',
            '&:hover': {
                background: '#4990a4',
                opacity: 0.9
            },
            '& button': {
                color: 'white',
                fontWeight: 500,
                textTransform: 'none'
            }
        },
        '& .lastname': {
            border: 'none',
            [theme.breakpoints.up('md')]: {
                marginLeft: 15
            }
        },
        '& label': {
            paddingLeft: 10
        }
    })
);

export const useOnboardingMainStyles = makeStyles((theme: Theme) =>
    createStyles({
        onboarding: {},
        signup_container: {
            overflowX: 'hidden',
            position: 'relative',
            display: 'flex',
            width: '100vw',
            height: '100vh',
            background: theme.palette.background.default
        },
        alert: {
            margin: 15,
            overflowWrap: 'break-word'
        },
        signupBGIllustration1: {
            position: 'absolute',
            bottom: 0,
            opacity: 0.4,
            pointerEvents: 'none'
        },
        signupBGIllustration2: {
            position: 'absolute',
            top: -64,
            right: -90,
            opacity: 0.4,
            pointerEvents: 'none',
            [theme.breakpoints.down('sm')]: {
                top: -64,
                left: 0
            }
        }
    })
);
