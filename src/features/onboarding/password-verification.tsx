import { Dispatch, useState, SetStateAction } from 'react';
import { Button, Input, IconButton } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useForgotPasswordStyles } from './classes';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useURLParams } from '../../hooks/use-url-params';
import { Typography } from '@mui/material';

interface PasswordVerificationProps {
    setError: Dispatch<SetStateAction<string>>;
}

export const PasswordVerification = ({ setError }: PasswordVerificationProps) => {
    const [password, setPassword] = useState({ password: '', confirm: '' });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const history = useHistory();

    const classes = useForgotPasswordStyles();
    const { confirmPasswordReset, verifyPasswordCode } = useFirebaseAuthContext();
    const handleFieldUpdate = (e: any) => {
        const { value, name } = e.target;
        setPassword(prev => ({ ...prev, [`${name}`]: value }));
    };

    const verificationCode = useURLParams('oobCode');
    const isResetPasswordReferer = useURLParams('mode') === 'resetPassword';

    if (!isResetPasswordReferer) return null;
    const handlePasswordReset = async () => {
        verifyPasswordCode(verificationCode)
            .then(() => {
                confirmPasswordReset(verificationCode, password.password).then(() => {
                    history.push('/dashboard');
                });
            })
            .catch(() => setError('Error occurred with the password reset. Try again'));
    };
    const noMatch = password.confirm !== password.password;
    return (
        <>
            <Input
                classes={{ underline: classes.underline }}
                type={showPassword ? 'text' : 'password'}
                id='reset-password'
                placeholder='New Password'
                name={'password'}
                className={classes.input}
                onChange={e => handleFieldUpdate(e)}
                endAdornment={
                    <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                }
            />
            <Input
                classes={{ underline: classes.underline }}
                type={showPassword ? 'text' : 'password'}
                id='reset-password'
                placeholder='Confirm password'
                name={'confirm'}
                className={classes.input}
                onChange={e => handleFieldUpdate(e)}
                endAdornment={
                    <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                }
            />

            {noMatch && <Typography style={{ color: 'red' }}>Password do not match </Typography>}

            <div>
                <Button className={classes.submit} disabled={noMatch} size={'large'} color='inherit' onClick={handlePasswordReset}>
                    Reset Password
                </Button>
            </div>
            <Link to='/signin' className={classes.loginLink}>
                {' '}
                Login with your new password
            </Link>
        </>
    );
};
