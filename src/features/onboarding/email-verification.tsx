import { Alert, AlertTitle } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import { styled } from '@mui/system';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

import { timeout } from 'utils';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useURLParams } from '../../hooks/use-url-params';

const StyledAlert = styled(Alert)`
        margin: 15;
        overflowWrap: 'break-word;
`;

export const EmailVerification = () => {
    const [error, setError] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [success, setSuccess] = useState('');

    const { verifyEmail } = useFirebaseAuthContext();
    const actionCode = useURLParams('oobCode');
    const isVerifyEmailReferer = useURLParams('mode') === 'verifyEmail';

    const handleConfirmVerification = () => {
        verifyEmail(actionCode)
            .then(() => {
                setOpenSnackBar(true);
                setSuccess('Your Email was successfully Verified');
                timeout(1500).then(() => location.replace('/dashboard'));
            })
            .catch(() => {
                setOpenSnackBar(true);
                setError('Error verifying your email. Try again by opening your email');
            })
            .finally(() => {
                timeout(2000).then(() => {
                    setOpenSnackBar(false);
                    setSuccess('');
                    setError('');
                });
            });
    };

    return (
        <div>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackBar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <StyledAlert onClose={() => setOpenSnackBar(false)} severity={error ? 'error' : 'success'}>
                    <AlertTitle>
                        {' '}
                        <strong>{error ? 'Error' : 'Success'}</strong>{' '}
                    </AlertTitle>
                    {success || error}
                </StyledAlert>
            </Snackbar>
            {isVerifyEmailReferer && (
                <Button color={'primary'} variant={'contained'} onClick={() => handleConfirmVerification()}>
                    Complete Email Verification
                </Button>
            )}
        </div>
    );
};
