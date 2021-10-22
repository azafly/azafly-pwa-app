import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { SetStateAction, useState } from 'react';
import * as yup from 'yup';

import { DefaultSnackbar } from 'components';
import { FacebookSvgComponent } from 'components/icons';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useFormStyles } from '../classes';
import Logo from 'assets/google.svg';
import { string } from 'yup/lib/locale';

const validationSchema = yup.object().shape({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required')
});

enum SignInMethod {
    FACEBOOK = 'FACEBOOK',
    GOOGLE = 'GOOGLE',
    EMAIL_AND_PASSWORD = 'EMAIL_AND_PASSWORD '
}

export const SignInForm = () => {
    const { signInWithFacebook, signInWithGoogle, signinWithEmailPassword } = useFirebaseAuthContext();
    const [isAuthStateIsLoading, setAuthLoadingState] = useState(false);
    const [authError, setAuthError] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const history = useHistory();

    const handleSignin = (method: SignInMethod, email?: string, password?: string) => {
        const DASHBOARD = '/dashboard';
        setAuthLoadingState(true);
        switch (method) {
            case SignInMethod.FACEBOOK:
                signInWithFacebook()
                    .then(() => {
                        setAuthLoadingState(false);
                        history.replace(DASHBOARD);
                    })
                    .catch(({ message }: Record<string, string>): void => {
                        setAuthLoadingState(false);
                        setOpenSnackBar(true);
                        setAuthError(message);
                    });
                break;
            case SignInMethod.GOOGLE:
                signInWithGoogle()
                    .then(() => {
                        setAuthLoadingState(false);
                        history.replace(DASHBOARD);
                    })
                    .catch(({ message }: Record<string, string>): void => {
                        setAuthLoadingState(false);
                        setOpenSnackBar(true);
                        setAuthError(message);
                    });
                break;
            case SignInMethod.EMAIL_AND_PASSWORD:
                signinWithEmailPassword(email, password)
                    .then(() => {
                        setAuthLoadingState(false);
                        history.replace(DASHBOARD);
                    })
                    .catch(({ message }: Record<string, string>): void => {
                        setAuthLoadingState(false);
                        setOpenSnackBar(true);
                        setAuthError(message);
                    });
                break;
            default:
                return null;
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: values => {
            setAuthLoadingState(true);
            handleSignin(SignInMethod.EMAIL_AND_PASSWORD, values.email, values.password);
        }
    });

    const classes = useFormStyles();
    return (
        <div className={classes.signInformRoot}>
            <DefaultSnackbar open={openSnackBar} handleClose={() => setOpenSnackBar(false)} severity={'error'} title={'Error'} info={authError} />
            <div className={classes.form_container}>
                <div className={classes.facebook} onClick={() => handleSignin(SignInMethod.FACEBOOK)}>
                    <FacebookSvgComponent />
                    <div className='text'>Facebook</div>
                </div>
                <div className={classes.google} onClick={() => handleSignin(SignInMethod.GOOGLE)}>
                    <img className='google-icon-svg' src={Logo} />
                    <div className='text'>Google</div>
                </div>

                <div className={`${classes.divider}`}>
                    <div className='line' />
                    <div className='or'>or</div>
                    <div className='line' />
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id='email'
                        name='email'
                        label='Email'
                        value={formik.values.email}
                        className={classes.input}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        id='password'
                        name='password'
                        label='Password'
                        type='password'
                        value={formik.values.password}
                        className={classes.input}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Link to='/forgot-password' className={classes.forgotPassword}>
                        {' '}
                        Forgot Password?
                    </Link>
                    <Button color='primary' variant='contained' fullWidth type='submit' style={{ height: '40px' }}>
                        {isAuthStateIsLoading ? <ThreeDots /> : 'Submit'}
                    </Button>
                </form>
            </div>
        </div>
    );
};
