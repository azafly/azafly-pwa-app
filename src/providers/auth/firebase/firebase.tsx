import { createContext, PropsWithChildren, useState, useContext, useEffect } from 'react';

import { firebaseApp, firebaseConfig } from './firebase-config';
import { AuthContext, AuthState, defaultAuthState, defaultAuhContext, FirebaseUser } from './constants';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

firebaseApp.initializeApp(firebaseConfig);
const fireStore = firebaseApp.firestore();

const HASURA_CLAIMS_URL = 'https://hasura.io/jwt/claims';

export interface EmailAndPasswordSignUp {
    email: string;
    password: string;
    displayName: string;
}

const authContext = createContext<AuthContext>(defaultAuhContext);

export const getUserById = async (firebaseId: string) => {
    return new Promise((resolve, reject) => {
        fireStore.collection('user').onSnapshot(snapshot => {
            const updatedData = snapshot.docs.map(doc => doc.data());
            const updatedUser = updatedData.filter(({ user }) => user.firebaseId === firebaseId);
            resolve(updatedUser);
        }, reject);
    });
};

export const addUser = (user: FirebaseUser) => {
    return fireStore.collection('user').add({
        user
    });
};

export const updateUserVerification = (userId: string) => {
    return fireStore.collection('user').doc(userId).set({ emailVerified: true }, { merge: true });
};

export const updateFirebaseUser = (userId: string, user: any) => {
    return fireStore.collection('user').doc(userId).set(user, { merge: true });
};

function useFirebaseProviderAuth() {
    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
    const [authError, setAuthError] = useState('');

    const signinWithEmailPassword = async (email: string, password: string) => {
        return firebaseApp.auth().signInWithEmailAndPassword(email, password);
    };

    const signupWithEmailPassword = async ({ email, password, displayName }: EmailAndPasswordSignUp) => {
        const { user } = await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
        if (user) {
            const profile = { displayName };
            localStorage.setItem('is_email_signup', 'true');
            user.updateProfile(profile)
                .then(() => {
                    setAuthState(prevState => ({ ...prevState, isAuth: true, user }));
                })
                .catch(error => console.log(error));
        }
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
        return firebaseApp.auth().applyActionCode(actionCode);
    };

    useEffect(() => {
        const unsubscribe = firebaseApp.auth().onAuthStateChanged(async user => {
            if (user) {
                user.updateProfile;
                const token = await user.getIdToken(true);
                const idTokenResult = await user.getIdTokenResult();
                const hasuraClaim = idTokenResult.claims[HASURA_CLAIMS_URL];
                if (user.emailVerified) {
                    setAuthState(prevState => {
                        const newUser = { ...user, emailVerified: true };
                        return {
                            ...prevState,
                            user: newUser
                        };
                    });
                }
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
        authState,
        authError,
        setAuthError
    };
}

export function FirebaseAuthProvider({ children }: PropsWithChildren<unknown>) {
    const auth = useFirebaseProviderAuth();
    return <authContext.Provider value={auth}> {children} </authContext.Provider>;
}

export const useFirebaseAuthContext = () => {
    return useContext(authContext);
};
