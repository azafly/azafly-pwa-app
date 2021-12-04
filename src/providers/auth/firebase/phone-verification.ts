import { firebaseApp } from './firebase-config';

const recaptchaVerifier = new firebaseApp.auth.RecaptchaVerifier('recaptcha', {
    size: 'invisible',
    callback: function (response: any) {
        console.log('solved: ', response);
    }
});
export const sendAuthSMS = async (user: any, phoneNumber: string) => {
    user.multiFactor.getSession().then(function (multiFactorSession: any) {
        // Specify the phone number and pass the MFA session.
        const phoneInfoOptions = {
            phoneNumber,
            session: multiFactorSession
        };
        const phoneAuthProvider = new firebaseApp.auth.PhoneAuthProvider();
        // Send SMS verification code.
        return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
    });
};
export const verifyPhoneNumber = async (user: any, verificationId: string, verificationCode: string) => {
    // Ask user for the verification code.
    const cred = firebaseApp.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    const multiFactorAssertion = firebaseApp.auth.PhoneMultiFactorGenerator.assertion(cred);
    // Complete enrollment.
    return user.multiFactor.enroll(multiFactorAssertion, 'sign-in-button');
};
