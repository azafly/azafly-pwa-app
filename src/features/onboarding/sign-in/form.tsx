import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { FacebookSvgComponent } from 'components/icons';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useFormStyles } from './classes';
import Logo from 'assets/logo.svg';

const validationSchema = yup.object().shape({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required')
});

export const SignInForm = () => {
    const { signInWithFacebook, signInWithGoogle, signinWithEmailPassword } = useFirebaseAuthContext();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: values => {
            signinWithEmailPassword(values.email, values.password);
        }
    });

    const classes = useFormStyles();
    return (
        <div className={classes.signInformRoot}>
            <div className={classes.form_container}>
                <div className={classes.facebook} onClick={signInWithFacebook}>
                    <FacebookSvgComponent />
                    <div className='text'>Facebook</div>
                </div>
                <div className={classes.google} onClick={signInWithGoogle}>
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
                    <Button color='primary' variant='contained' fullWidth type='submit'>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};
