import * as yup from 'yup';
import { Button, TextField } from '@material-ui/core'
import { useFormik } from 'formik';
import { useHistory, useLocation, Link } from 'react-router-dom'
import { FacebookSvgComponent } from 'components/icons'
import { useFirebaseAuthContext } from 'providers/auth/firebase'
import { useFormStyles } from './classes'


const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required'),
});

enum SignInMethod {
    FACEBOOK = 'FACEBOOK',
    GOOGLE = 'GOOGLE',
    EMAIL_AND_PASSWORD = '  EMAIL_AND_PASSWORD '

}


export const SignInForm = () => {
    const history = useHistory();
    const location = useLocation();
    const { authState: { isAuth }, signInWithFacebook, signInWithGoogle, signinWithEmailPassword } = useFirebaseAuthContext()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            signinWithEmailPassword(values.email, values.password)
        },
    });



    const classes = useFormStyles()
    return (
        <div className={classes.signInformRoot}>
            <div className={classes.form_container}>
                <div className={classes.facebook} onClick={signInWithFacebook}>
                    <FacebookSvgComponent />
                    <div className='text'>Facebook</div>
                </div>
                <div className={classes.google} onClick={signInWithGoogle} >
                    <img className="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                    <div className='text'  >Google</div>
                </div>

                <div className={`${classes.divider}`}>
                    <div className="line" /><div className="or">or</div><div className="line" />
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        className={classes.input}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        className={classes.input}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Link to="/forgot-password" className={classes.forgotPassword}> Forgot Password?</Link>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}

