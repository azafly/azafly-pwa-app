import { createContext, PropsWithChildren, useState, useContext, useEffect } from 'react';

import { firebaseApp, firebaseConfig } from './firebase-config';
import { AuthState, defaultAuthState, defaultAuhContext } from './constants';

import 'firebase/auth';
import 'firebase/database';

firebaseApp.initializeApp(firebaseConfig);

interface AuthContext {
    signInWithGoogle: any;
    signInWithFacebook: any;
    confirmPasswordReset: any;
    sendPasswordResetEmail: any;
    signout: any;
    signinWithEmailPassword: any;
    signupWithEmailPassword: any;
    authState: AuthState;
    verifyPasswordCode: any;
    verifyEmail: any;
}
const HASURA_CLAIMS_URL = 'https://hasura.io/jwt/claims';

const authContext = createContext<AuthContext>(defaultAuhContext);

function useFirebaseProviderAuth() {
    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
    const [authError, setAuthError] = useState('');

    const signinWithEmailPassword = async (email: string, password: string) => {
        return firebaseApp.auth().signInWithEmailAndPassword(email, password);
    };

    const signupWithEmailPassword = async (email: string, password: string) => {
        return firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
                if (!user?.emailVerified) {
                    // Void the sign in session until email is verified
                    user?.sendEmailVerification()
                        .then(data => {
                            console.log(data, 'email Sent');
                        })
                        .catch(error => console.log(error));
                }
            });
    };

    const signout = async () => {
        return firebaseApp
            .auth()
            .signOut()
            .then(() => {
                localStorage.removeItem('token');
                location.replace('/signin');
            })
            .catch(error => console.log(error));
    };

    const sendPasswordResetEmail = async (email: string) => {
        return firebaseApp.auth().sendPasswordResetEmail(email);
    };

    const verifyPasswordCode = async (code: string) => {
        return firebaseApp.auth().verifyPasswordResetCode(code);
    };

    const confirmPasswordReset = async (code: string, password: string) => {
        return firebaseApp.auth().confirmPasswordReset(code, password);
    };

    const signInWithGoogle = async () => {
        const googleProvider = new firebaseApp.auth.GoogleAuthProvider();
        return firebaseApp.auth().signInWithPopup(googleProvider);
    };

    const signInWithFacebook = async () => {
        const FacebookAuthProvider = new firebaseApp.auth.FacebookAuthProvider();
        return firebaseApp.auth().signInWithPopup(FacebookAuthProvider);
    };

    const verifyEmail = async (actionCode: string) => {
        try {
            await firebaseApp.auth().applyActionCode(actionCode);
            location.replace('/dashboard');
        } catch (error) {
            setAuthError('Error verifying your email');
        }
    };

    useEffect(() => {
        const unsubscribe = firebaseApp.auth().onAuthStateChanged(async user => {
            if (user) {
                const token = await user.getIdToken(true);
                const idTokenResult = await user.getIdTokenResult();
                const hasuraClaim = idTokenResult.claims[HASURA_CLAIMS_URL];
                if (hasuraClaim) {
                    localStorage.setItem('token', token);
                    setAuthState(prevState => ({ ...prevState, isAuth: true, user }));
                } else {
                    // Check if refresh is required.
                    const metadataRef = firebaseApp.database().ref('metadata/' + user.uid + '/refreshTime');

                    metadataRef.on('value', async (data: any) => {
                        if (!data.exists) return;
                        // Force refresh to pick up the latest custom claims changes.
                        const newToken = await user.getIdToken(true);
                        setAuthState(prevState => ({ ...prevState, isAuth: true, user }));
                        localStorage.setItem('token', newToken);
                    });
                }
            } else {
                localStorage.removeItem('token');
                setAuthState(prevState => ({ ...prevState, isAuth: false, user: null }));
            }
        });
        return () => unsubscribe();
    }, []);

    return {
        confirmPasswordReset,
        sendPasswordResetEmail,
        signout,
        signinWithEmailPassword,
        signupWithEmailPassword,
        signInWithGoogle,
        signInWithFacebook,
        verifyPasswordCode,
        verifyEmail,
        authState
    };
}

export function FirebaseAuthProvider({ children }: PropsWithChildren<unknown>) {
    const auth = useFirebaseProviderAuth();
    return <authContext.Provider value={auth}> {children} </authContext.Provider>;
}

export const useFirebaseAuthContext = () => {
    return useContext(authContext);
};
