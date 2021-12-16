import axios from 'axios';
import { firebaseAuth } from './firebase';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

(window as any).recaptchaVerifier = new RecaptchaVerifier(
    'recaptcha',
    {
        size: 'invisible'
    },
    firebaseAuth
);
export const sendAuthSMS = async (phoneNumber: string) => {
    const appVerifier = (window as any).recaptchaVerifier;
    return signInWithPhoneNumber(firebaseAuth, phoneNumber, appVerifier);
};
export const verifyPhoneNumber = async (code: string, sessionInfo: string) => {
    const googleAPI = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPhoneNumber?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    return axios.post(googleAPI, {
        sessionInfo,
        code
    });
};
