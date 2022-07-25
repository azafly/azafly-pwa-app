import { Button, Checkbox, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { DefaultSnackbar } from 'components';
import { RootState } from 'app/store';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { firebaseAuth, NO_USER_AUTH, useFirebaseAuthContext, USER_AUTH } from 'providers/auth/firebase';
import { useSignUpFormStyles } from './classes';
import Logo from 'assets/google.svg';
import { LOCAL_STORAGE_KEY } from 'libs/local-storage-client';
import { formatFirebaseErrorMessage } from 'providers/auth/firebase/constants';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ROUTE_MAP_ENUM } from 'routes/utils';

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
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { signInWithGoogle } = useFirebaseAuthContext();
    const { errorMessage = 'An Authentication has occurred', isLoading } = useSelector((state: RootState) => state.auth);

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
        onSubmit: async ({ email, password, firstName, lastName }) => {
            try {
                const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
                const token = await user.getIdToken();
                dispatch.onboarding.setDisplayName(`${firstName} ${lastName}`);
                dispatch.auth.updateAuthState({ ...USER_AUTH, user, token, isNewUser: true, action: 'sign-up' });
                localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
                navigate(ROUTE_MAP_ENUM.ONBOARDING);
            } catch ({ message }) {
                dispatch.auth.updateAuthState({ ...NO_USER_AUTH, errorMessage: formatFirebaseErrorMessage(message as string) });
                setOpenSnackBar(true);
            }
        }
    });

    type FormValue = keyof typeof formik.initialValues;

    return (
        <div className={classes.signUpformRoot}>
            <DefaultSnackbar
                autoHideDuration={30000}
                open={openSnackBar}
                handleClose={() => setOpenSnackBar(false)}
                severity={'error'}
                title={'Error'}
                info={errorMessage}
                position={{ vertical: 'top', horizontal: 'right' }}
            />
            <div className={classes.form_container}>
                <div className={` ${classes.google}`} onClick={signInWithGoogle}>
                    <img className='google-icon-svg' src={Logo} alt={'goggle-logo'} />
                    <div className={'text'}>Signup with Google</div>
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
