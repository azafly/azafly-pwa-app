import { Button, Checkbox, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { DefaultSnackbar } from 'components';
import { RootState } from 'app/store';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useSignUpFormStyles } from './classes';
import Logo from 'assets/google.svg';

const formFieldArray = [
    {
        placeholder: 'Password',
        type: 'password',
        name: 'password'
    },
    {
        placeholder: 'Re-enter Password',
        type: 'password',
        name: 'confirmPassword'
    }
];

const validationSchema = yup.object().shape({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Needs to match password')
        .required('Required and Needs to match password'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    terms: yup.bool().oneOf([true], 'Accept Terms & Conditions is required').required('Accept Terms & Conditions is required')
});

export const SignUpForm = () => {
    const classes = useSignUpFormStyles();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const { signupWithEmailPassword, signInWithGoogle } = useFirebaseAuthContext();
    const { errorMessage = 'An Authentication has occurred', isError, isLoading } = useSelector((state: RootState) => state.auth);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            terms: ''
        },
        validationSchema: validationSchema,
        onSubmit: ({ email, password }) => {
            signupWithEmailPassword(email, password);
        }
    });

    type FormValue = keyof typeof formik.initialValues;

    useEffect(() => {
        if (isError && !isLoading) {
            setOpenSnackBar(true);
        }
    }, [isLoading, isError]);

    return (
        <div className={classes.signUpformRoot}>
            <DefaultSnackbar open={openSnackBar} handleClose={() => setOpenSnackBar(false)} severity={'error'} title={'Error'} info={errorMessage} />
            <div className={classes.form_container}>
                <div className={` ${classes.google}`} onClick={signInWithGoogle}>
                    <img className='google-icon-svg' src={Logo} alt={'goggle-logo'} />
                    <div className={'text'}>Google</div>
                </div>
                <div className={`${classes.divider}`}>
                    <div className='line' />
                    <div className='or'>or</div>
                    <div className='line' />
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div className={`${classes.name}`}>
                        <TextField
                            fullWidth
                            id='firstName'
                            name='firstName'
                            label='First Name'
                            type='text'
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            fullWidth
                            id='lastName'
                            name='lastName'
                            label='Last Name'
                            type='text'
                            placeholder='Last Name'
                            className={`lastname`}
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </div>
                    <div className={`${classes.name}`}>
                        <TextField
                            fullWidth
                            id='email'
                            name='email'
                            label='Email'
                            type='text'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </div>
                    <div className={` ${classes.others}`}>
                        {formFieldArray.map(({ name, placeholder, type }) => {
                            return (
                                <TextField
                                    fullWidth
                                    id={name}
                                    name={name}
                                    label={placeholder}
                                    type={showPassword ? 'text' : type}
                                    key={name}
                                    value={formik.values[name as FormValue]}
                                    onChange={formik.handleChange}
                                    error={formik.touched[name as FormValue] && Boolean(formik.errors[name as FormValue])}
                                    helperText={formik.touched[name as FormValue] && formik.errors[name as FormValue]}
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
                            );
                        })}
                    </div>
                    <div className={classes.terms}>
                        <Checkbox id='terms' name='terms' onChange={formik.handleChange} />
                        <p>
                            I agree to the <span className={classes.termsLink}>terms</span> and <span className={classes.termsLink}>conditions</span>{' '}
                        </p>
                    </div>
                    <p className={classes.termsLink} style={{ color: 'red', fontSize: '0.7rem' }}>
                        {formik.touched.terms && formik.errors.terms}
                    </p>
                    <Button color='primary' variant='contained' fullWidth type='submit' style={{ height: '40px' }}>
                        {isLoading ? <ThreeDots /> : ' Submit'}
                    </Button>
                </form>
            </div>
        </div>
    );
};
