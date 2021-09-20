import { createContext, PropsWithChildren, useState, useContext, useEffect } from 'react'

import { firebaseApp, firebaseConfig } from './firebase-config'
import { AuthState, defaultAuthState, defaultAuhContext } from './constants'

import "firebase/auth";
import "firebase/database";



firebaseApp.initializeApp(firebaseConfig)


interface AuthContext {
    signInWithGoogle: any
    signInWithFacebook: any
    confirmPasswordReset: any,
    sendPasswordResetEmail: any,
    signout: any,
    signinWithEmailPassword: any,
    signupWithEmailPassword: any,
    authState: AuthState,
    authError?: string,
    resetLinkSuccess: boolean
    verifyPasswordCode: any
}
const HASURA_CLAIMS_URL = 'https://hasura.io/jwt/claims'

const authContext = createContext<AuthContext>(defaultAuhContext);



export function FirebaseAuthProvider({ children }: PropsWithChildren<any>) {
    const auth = useFirebaseProviderAuth();
    return <authContext.Provider value={auth}> {children} </authContext.Provider>;
}



export const useFirebaseAuthContext = () => {
    return useContext(authContext);
};

function useFirebaseProviderAuth() {
    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
    const [authError, setAuthError] = useState<any>(null);
    const [resetLinkSuccess, setResetLinkSuccess] = useState<boolean>(false);

    const signinWithEmailPassword = async (email: string, password: string) => {
        return firebaseApp
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => setAuthError(error.message))


    };

    const signupWithEmailPassword = async (email: string, password: string) => {
        return firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email, password).catch((error) => setAuthError(error.message))

    };

    const signout = async () => {
        return firebaseApp
            .auth()
            .signOut().catch((error) => setAuthError(error.message))

    };

    const sendPasswordResetEmail = async (email: string) => {
        return firebaseApp
            .auth()
            .sendPasswordResetEmail(email).then(() => setResetLinkSuccess(true)).catch((error) => setAuthError(error.message))
    };

    const verifyPasswordCode = async (code: string) => {
        return firebaseApp
            .auth()
            .verifyPasswordResetCode(code)
            .then((hey) => console.log(hey, 'done')).catch((error) => console.log(error))
    };

    const confirmPasswordReset = async (code: string, password: string) => {
        return firebaseApp
            .auth()
            .confirmPasswordReset(code, password).catch((error) => setAuthError(error.message))

    };

    const signInWithGoogle = async () => {
        const googleProvider = new firebaseApp.auth.GoogleAuthProvider()
        try {
            return firebaseApp.auth().signInWithPopup(googleProvider)
        } catch (error) {
            console.warn(error)
            setAuthError(error.message)
        }
    }

    const signInWithFacebook = async () => {
        const FacebookAuthProvider = new firebaseApp.auth.FacebookAuthProvider()
        try {
            return firebaseApp.auth().signInWithPopup(FacebookAuthProvider)
        } catch (error) {
            setAuthError(error.message)
            console.warn(error)
        }
    }


    useEffect(() => {
        const unsubscribe = firebaseApp.auth().onAuthStateChanged(async (user) => {

            if (user) {
                const token = await user.getIdToken(true);
                const idTokenResult = await user.getIdTokenResult();
                const hasuraClaim = idTokenResult.claims[HASURA_CLAIMS_URL];
                if (hasuraClaim) {
                    new Promise((resolve) => {
                        resolve(token)
                        setAuthState({ isLoading: false, isError: false, isAuth: true, user, token })
                    }).then(() => localStorage.setItem('token', token))

                } else {
                    // Check if refresh is required.
                    const metadataRef = firebaseApp
                        .database()
                        .ref("metadata/" + user.uid + "/refreshTime");

                    metadataRef.on("value", async (data: any) => {
                        if (!data.exists) return
                        // Force refresh to pick up the latest custom claims changes.
                        const token = await user.getIdToken(true);
                        new Promise(() => {
                            localStorage.setItem('token', token)
                            setAuthState({ isLoading: false, isError: false, isAuth: true, user, token })
                        }).then(() => localStorage.setItem('token', token))

                    });
                }
            } else {
                new Promise(() => {
                    setAuthState({ isLoading: false, isError: false, isAuth: false, user: null })
                }).then(() => localStorage.removeItem('token'))



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
        authState,
        authError,
        resetLinkSuccess
    };
}
