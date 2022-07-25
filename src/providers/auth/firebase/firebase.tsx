import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import {
    applyActionCode,
    confirmPasswordReset as confirmPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail as sendPasswordReset,
    signInWithEmailAndPassword as signInWithPass,
    signInWithPopup,
    getAdditionalUserInfo,
    verifyPasswordResetCode as verifyPassword,
    UserCredential
} from 'firebase/auth';

import { AuthContext, defaultAuhContext, formatFirebaseErrorMessage } from './constants';
import { firebaseApp } from './firebase-config';
import { RootState, Dispatch } from 'app/store';
import { ROUTE_MAP_ENUM } from 'routes/utils';
import { LOCAL_STORAGE_KEY } from 'libs/local-storage-client';

export const database = getDatabase(firebaseApp);
export const firebaseAuth = getAuth();
export const storage = getStorage(firebaseApp);

const authContext = createContext<AuthContext>(defaultAuhContext);
export const NO_USER_AUTH = { isAuth: false, isError: true, isLoading: false, hasuraUser: null, user: null, token: null };
export const USER_AUTH = { isAuth: true, isError: false, isLoading: false, errorMessage: '' };
export const NO_USER = { ...NO_USER_AUTH, isError: false, isLoading: true, errorMessage: '' };

function useFirebaseProviderAuth() {
    const dispatch = useDispatch<Dispatch>();
    const reduxAuthState = useSelector((state: RootState) => state.auth);

    /**
     * If user new user - Take user through additional basic onboarding,
     * Otherwise just take user to dashboard
     */
    const handleSignIn = async (signInCallback: Promise<UserCredential>) => {
        try {
            const userCredential = await signInCallback;
            const { user } = userCredential;
            const token = await user.getIdToken(true);
            const { isNewUser } = getAdditionalUserInfo(userCredential) ?? { isNewUser: false };
            dispatch.auth.updateAuthState({ ...USER_AUTH, user, token, isNewUser, action: 'sign-in' });
            const to = isNewUser ? ROUTE_MAP_ENUM.ONBOARDING : ROUTE_MAP_ENUM.DASHBOARD;
            localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
            dispatch.dashboard.setCurrentDashboardTab('dashboard');
            location.replace(to);
        } catch ({ message }) {
            dispatch.auth.updateAuthState({ ...NO_USER_AUTH, action: 'sign-in', errorMessage: formatFirebaseErrorMessage(message as string) });
        }
    };

    const signout = async () => {
        return firebaseAuth
            .signOut()
            .then(() => {
                dispatch.auth.updateAuthState({ ...reduxAuthState, isAuth: false, user: null, token: null, isLoading: false });
                location.replace('/auth/signin');
                localStorage.clear();
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
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async user => {
            if (!user) {
                localStorage.clear();
                dispatch.auth.updateAuthState({ ...NO_USER_AUTH });
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
