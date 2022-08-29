import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import {
    applyActionCode,
    confirmPasswordReset as confirmPassword,
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail as sendPasswordReset,
    signInWithEmailAndPassword as signInWithPass,
    signInWithPopup,
    UserCredential,
    setPersistence,
    browserSessionPersistence,
    verifyPasswordResetCode as verifyPassword
} from 'firebase/auth';

import { AuthContext, defaultAuhContext } from './constants';
import { firebaseApp } from './firebase-config';
import { LOCAL_STORAGE_KEY } from 'libs/local-storage-client';
import { RootState, Dispatch } from 'app/store';
import { computeIsAdmin } from 'libs/constants';

export const database = getDatabase(firebaseApp);
export const firebaseAuth = getAuth();
export const storage = getStorage(firebaseApp);

const HASURA_CLAIMS_URL = 'https://hasura.io/jwt/claims';
export const NO_USER_AUTH = { isAuth: false, isError: true, isLoading: false, hasuraUser: null, user: null, token: null, isNewUser: false };
export interface EmailAndPasswordSignUp {
    email: string;
    password: string;
}

const authContext = createContext<AuthContext>(defaultAuhContext);

function useFirebaseProviderAuth() {
    const dispatch = useDispatch<Dispatch>();
    const reduxAuthState = useSelector((state: RootState) => state.auth);

    const handleSignIn = async (signInCallback: Promise<UserCredential>) => {
        dispatch.auth.updateAuthState({ ...reduxAuthState, isLoading: true });
        try {
            const { user } = await signInCallback;
            const isNewUser = parseInt(user.metadata?.lastSignInTime ?? '0') - parseInt(user.metadata?.creationTime ?? '0') < 10;
            const token = await user.getIdToken(true);
            const to = isNewUser ? '/onboarding-update' : '/dashboard';
            dispatch.auth.updateAuthState({
                ...reduxAuthState,
                user,
                isAuth: true,
                isError: false,
                isLoading: false,
                token,
                action: 'sign-in'
            });
            location.replace(to);
            dispatch.dashboard.setCurrentDashboardTab('dashboard');
        } catch ({ message }) {
            dispatch.auth.updateAuthState({
                ...reduxAuthState,
                isAuth: false,
                isError: true,
                isLoading: false,
                user: null,
                action: 'sign-in',
                errorMessage: `${message}`
            });
        }
    };

    const signupWithEmailPassword = async ({ email, password }: EmailAndPasswordSignUp) => {
        handleSignIn(createUserWithEmailAndPassword(firebaseAuth, email, password));
    };

    const signout = async () => {
        return firebaseAuth
            .signOut()
            .then(() => {
                dispatch.auth.updateAuthState({ ...reduxAuthState, isAuth: false, user: null, token: null, isLoading: false });
                location.replace('/signin');
            })
            .catch(error => console.warn(error));
    };

    const sendPasswordResetEmail = async (email: string) => {
        return sendPasswordReset(firebaseAuth, email);
    };

    const verifyPasswordCode = async (code: string) => {
        return verifyPassword(firebaseAuth, code);
    };

    const confirmPasswordReset = async (code: string, password: string) => {
        return confirmPassword(firebaseAuth, code, password);
    };

    const signInWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        handleSignIn(signInWithPopup(firebaseAuth, googleProvider));
    };

    const signinWithEmailPassword = async (email: string, password: string) => {
        handleSignIn(signInWithPass(firebaseAuth, email, password));
    };

    const verifyEmail = async (actionCode: string) => {
        return applyActionCode(firebaseAuth, actionCode);
    };

    setPersistence(firebaseAuth, browserSessionPersistence).catch(error => {
        console.log(error);
    });
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async user => {
            if (!user) {
                localStorage.clear();
            }
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        confirmPasswordReset,
        sendPasswordResetEmail,
        signinWithEmailPassword,
        signInWithGoogle,
        signout,
        signupWithEmailPassword,
        verifyEmail,
        verifyPasswordCode
    };
}

export function FirebaseAuthProvider({ children }: PropsWithChildren<unknown>) {
    const auth = useFirebaseProviderAuth();
    return <authContext.Provider value={auth}> {children} </authContext.Provider>;
}

export const useFirebaseAuthContext = () => {
    return useContext(authContext);
};
