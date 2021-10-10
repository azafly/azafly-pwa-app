import { ButtonUnstyled } from '@mui/core';

import { useURLParams } from '../../../hooks/use-url-params';
import { useFirebaseAuthContext } from 'providers/auth/firebase';

export const EmailVerification = () => {
    const { verifyEmail } = useFirebaseAuthContext();
    const actionCode = useURLParams('oobCode');
    const isVerifyEmailReferer = useURLParams('mode') === 'verifyEmail';

    const handleConfirmVerification = () => {
        verifyEmail(actionCode);
    };

    return (
        <div>{isVerifyEmailReferer && <ButtonUnstyled onClick={() => handleConfirmVerification()}>Complete Email Verification</ButtonUnstyled>}</div>
    );
};
