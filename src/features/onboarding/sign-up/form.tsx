/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button, Checkbox, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import * as yup from 'yup';

import { addUser } from 'providers/auth/firebase/firebase';
import { DefaultSnackbar } from 'components';
import { FacebookSvgComponent } from 'components/icons';
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
const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;

const validationSchema = yup.object().shape({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Needs to match password')
        .required('Required and Needs to match password'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    terms: yup.bool().oneOf([true], 'Accept Terms & Conditions is required').required('Accept Terms & Conditions is required')
});

enum SignUpMethod {
    FACEBOOK = 'FACEBOOK',
    GOOGLE = 'GOOGLE',
    EMAIL_AND_PASSWORD = 'EMAIL_AND_PASSWORD '
}

export const SignUpForm = () => {
    const classes = useSignUpFormStyles();
    const [isAuthStateLoading, setAuthLoadingState] = useState(false);
    const [authError, setAuthError] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const {
        signupWithEmailPassword,
        signInWithFacebook,
        signInWithGoogle,
        isFirstTimeUser,
        authState: { user }
    } = useFirebaseAuthContext();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            terms: '',
            phone: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            localStorage.setItem('user', JSON.stringify(values));
            handleSignUp(SignUpMethod.EMAIL_AND_PASSWORD, values.email, values.password, `${values.firstName} ${values.lastName}`);
        }
    });

    type FormValue = keyof typeof formik.initialValues;

    const history = useHistory();
    const location = useLocation();

    const handleSignUp = (method: SignUpMethod, email?: string, password?: string, displayName?: string) => {
        const DASHBOARD = isFirstTimeUser ? '/onboarding-update' : '/dashboard';
        const from = location.state?.from?.pathname || DASHBOARD;
        setAuthLoadingState(true);
        switch (method) {
            case SignUpMethod.FACEBOOK:
                return signInWithFacebook()
                    .then(() => {
                        setAuthLoadingState(false);
                        history.replace(from);
                    })
                    .catch(({ message }: Record<string, string>): void => {
                        setAuthLoadingState(false);
                        setOpenSnackBar(true);
                        setAuthError(message);
                    });
            case SignUpMethod.GOOGLE:
                return signInWithGoogle()
                    .then(() => {
                        setAuthLoadingState(false);
                        history.replace(from);
                    })
                    .catch(({ message }: Record<string, string>): void => {
                        setOpenSnackBar(true);
                        setAuthError(message);
                        setAuthLoadingState(false);
                    });
            case SignUpMethod.EMAIL_AND_PASSWORD:
                if (!email || !password || !displayName) return;
                return signupWithEmailPassword({ email, password, displayName })
                    .then(() => {
                        setAuthLoadingState(false);
                        history.replace(from);
                        addUser({
                            email,
                            displayName,
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            firebaseId: user?.uid ?? '',
                            phone: null,
                            emailVerified: false,
                            photoURL: null
                        });
                    })
                    .catch(({ message }: Record<string, string>): void => {
                        setOpenSnackBar(true);
                        setAuthLoadingState(false);
                        setAuthError(message);
                    });
            default:
                return null;
        }
    };

    return (
        <div className={classes.signUpformRoot}>
            <DefaultSnackbar open={openSnackBar} handleClose={() => setOpenSnackBar(false)} severity={'error'} title={'Error'} info={authError} />
            <div className={classes.form_container}>
                <div className={`${classes.facebook}`} onClick={() => handleSignUp(SignUpMethod.FACEBOOK)}>
                    <FacebookSvgComponent />
                    <div className={'text'}>Facebook</div>
                </div>
                <div className={` ${classes.google}`} onClick={() => handleSignUp(SignUpMethod.GOOGLE)}>
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
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            id='phone'
                            name='phone'
                            label='Phone Number'
                            type='text'
                            placeholder='Phone Number'
                            className={`lastname`}
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            FormHelperTextProps={{
                                className: Boolean(formik.errors.phone) ? '' : 'info'
                            }}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={!formik.errors.phone ? 'Your phone number with the code' : formik.touched.phone && formik.errors.phone}
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
                                    type={type}
                                    key={name}
                                    value={formik.values[name as FormValue]}
                                    onChange={formik.handleChange}
                                    error={formik.touched[name as FormValue] && Boolean(formik.errors[name as FormValue])}
                                    helperText={formik.touched[name as FormValue] && formik.errors[name as FormValue]}
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
                        {isAuthStateLoading ? <ThreeDots /> : ' Submit'}
                    </Button>
                </form>
            </div>
        </div>
    );
};
