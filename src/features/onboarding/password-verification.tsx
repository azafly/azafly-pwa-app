import { Dispatch, useState, SetStateAction } from 'react';
import { Button, Input } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { useForgotPasswordStyles } from './classes';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useURLParams } from '../../hooks/use-url-params';

interface PasswordVerificationProps {
    setError: Dispatch<SetStateAction<string>>;
}

export const PasswordVerification = ({ setError }: PasswordVerificationProps) => {
    const classes = useForgotPasswordStyles();
    const { confirmPasswordReset, verifyPasswordCode } = useFirebaseAuthContext();
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleFieldUpdate = (e: any) => {
        const { value } = e.target;
        setPassword(value);
    };

    const verificationCode = useURLParams('oobCode');
    const isResetPasswordReferer = useURLParams('mode') === 'resetPassword';
    if (!isResetPasswordReferer) return null;
    const handlePasswordReset = async () => {
        verifyPasswordCode(verificationCode)
            .then(() => {
                confirmPasswordReset(verificationCode, password).then(() => {
                    history.push('/dashboard');
                });
            })
            .catch(() => setError('Error occurred with the password reset. Try again'));
    };
    return (
        <>
            <Input
                classes={{ underline: classes.underline }}
                type='password'
                id='reset-email'
                placeholder='New Password'
                name={'password'}
                className={classes.input}
                onChange={e => handleFieldUpdate(e)}
            />
            <div>
                <Button className={classes.submit} disabled={!password} size={'large'} color='inherit' onClick={handlePasswordReset}>
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
