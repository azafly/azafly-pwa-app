import { Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as yup from 'yup';

import { DefaultSnackbar } from 'components';
import { FacebookSvgComponent } from 'components/icons';
import { RootState } from 'app/store';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useFormStyles } from '../classes';
import Logo from 'assets/google.svg';

const validationSchema = yup.object().shape({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required')
});

export const SignInForm = () => {
    const { signInWithFacebook, signInWithGoogle, signinWithEmailPassword } = useFirebaseAuthContext();

    const { isLoading, isError, errorMessage = 'An Authentication has occurred' } = useSelector((state: RootState) => state.auth);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (email, password) => {
            signinWithEmailPassword({ email, password });
        }
    });

    const classes = useFormStyles();
    useEffect(() => {
        if (isError && !isLoading) {
            setOpenSnackBar(true);
        }
    }, [isLoading, isError]);

    return (
        <div className={classes.signInformRoot}>
            <DefaultSnackbar
                open={isError && !isLoading && openSnackBar}
                handleClose={() => setOpenSnackBar(false)}
                severity={'error'}
                title={'Error'}
                info={errorMessage}
                autoHideDuration={4000}
            />
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
                        type={showPassword ? 'text' : 'password'}
                        value={formik.values.password}
                        className={classes.input}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Link to='/forgot-password' className={classes.forgotPassword}>
                        {' '}
                        Forgot Password?
                    </Link>
                    <Button color='primary' variant='contained' fullWidth type='submit' style={{ height: '40px' }}>
                        {isLoading ? <ThreeDots /> : 'Submit'}
                    </Button>
                </form>
            </div>
        </div>
    );
};
