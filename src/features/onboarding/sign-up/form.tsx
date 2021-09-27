import * as yup from 'yup';
import {
    Button,
    Checkbox,
    TextField,
    IconButton,
    InputAdornment
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';

import { FacebookSvgComponent } from 'components/icons';
import { useSignUpFormStyles } from './classes';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { useFormStyles } from './classes';
import { useState } from 'react';

const formFieldArray = [
    {
        placeholder: 'Email',
        type: 'email',
        name: 'email'
    },
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
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Needs to match password')
        .required('Required and Needs to match password'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    terms: yup
        .bool()
        .oneOf([true], 'Accept Terms & Conditions is required')
        .required('Accept Terms & Conditions is required')
});

enum SignUpMethod {
    FACEBOOK = 'FACEBOOK',
    GOOGLE = 'GOOGLE',
    EMAIL_AND_PASSWORD = '  EMAIL_AND_PASSWORD '
}

export const SignUpForm = () => {
    const classes = useSignUpFormStyles();
    const {
        authState: { isAuth },
        signupWithEmailPassword,
        signInWithFacebook,
        signInWithGoogle
    } = useFirebaseAuthContext();
    const [showPassword, setShowPassword] = useState('password');
    const handleClickShowPassword = () => setShowPassword('password');
    const handleMouseDownPassword = () => setShowPassword('text');

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
        onSubmit: values => {
            handleSignUp(
                SignUpMethod.EMAIL_AND_PASSWORD,
                values.email,
                values.password
            );
        }
    });

    type FormValue = keyof typeof formik.initialValues;

    const history = useHistory();
    const location = useLocation();

    const handleSignUp = (
        method: SignUpMethod,
        email?: string,
        password?: string
    ) => {
        const { from } = location.state || { from: { pathname: '/dashboard' } };
        switch (method) {
            case SignUpMethod.FACEBOOK:
                return;
            case SignUpMethod.GOOGLE:
                return signInWithGoogle().then(() => history.replace(from));
            case SignUpMethod.EMAIL_AND_PASSWORD:
                return signupWithEmailPassword(email, password).then(() =>
                    history.replace(from)
                );
            default:
                return null;
        }
    };

    return (
        <div className={classes.signUpformRoot}>
            <div className={classes.form_container}>
                <div
                    className={`${classes.facebook}`}
                    onClick={() => handleSignUp(SignUpMethod.FACEBOOK)}
                >
                    <FacebookSvgComponent />
                    <div className={'text'}>Facebook</div>
                </div>
                <div
                    className={` ${classes.google}`}
                    onClick={() => handleSignUp(SignUpMethod.GOOGLE)}
                >
                    <img
                        className='google-icon-svg'
                        src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                    />
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
                            error={
                                formik.touched.firstName &&
                                Boolean(formik.errors.firstName)
                            }
                            helperText={
                                formik.touched.firstName &&
                                formik.errors.firstName
                            }
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
                            error={
                                formik.touched.lastName &&
                                Boolean(formik.errors.lastName)
                            }
                            helperText={
                                formik.touched.lastName &&
                                formik.errors.lastName
                            }
                        />
                    </div>
                    <div className={` ${classes.others}`}>
                        {formFieldArray.map(({ name, placeholder, type }) => {
                            return (
                                <TextField
                                    fullWidth
                                    id={name}
                                    name={name}
                                    InputProps={{
                                        endAdornment: name !== 'email' && (
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='toggle password visibility'
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                >
                                                    {showPassword === 'text' ? (
                                                        <VisibilityIcon />
                                                    ) : (
                                                        <VisibilityOffIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    label={placeholder}
                                    type={
                                        name === 'email' ? type : showPassword
                                    }
                                    key={name}
                                    value={formik.values[name as FormValue]}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched[name as FormValue] &&
                                        Boolean(
                                            formik.errors[name as FormValue]
                                        )
                                    }
                                    helperText={
                                        formik.touched[name as FormValue] &&
                                        formik.errors[name as FormValue]
                                    }
                                />
                            );
                        })}
                    </div>
                    <div className={classes.terms}>
                        <Checkbox
                            id='terms'
                            name='terms'
                            onChange={formik.handleChange}
                        />
                        <p>
                            I agree to the{' '}
                            <span className={classes.termsLink}>terms</span> and{' '}
                            <span className={classes.termsLink}>
                                conditions
                            </span>{' '}
                        </p>
                    </div>
                    <p
                        className={classes.termsLink}
                        style={{ color: 'red', fontSize: '0.7rem' }}
                    >
                        {formik.touched.terms && formik.errors.terms}
                    </p>
                    <Button
                        color='primary'
                        variant='contained'
                        fullWidth
                        type='submit'
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};
