import { createContext, PropsWithChildren, useState, useContext, useEffect } from 'react';

import { AuthContext, AuthState, defaultAuthState, defaultAuhContext, FirebaseUser } from './constants';
import { firebaseApp, firebaseConfig } from './firebase-config';
import { LOCAL_STORAGE_KEY } from 'libs/local-storage-keys';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

firebaseApp.initializeApp(firebaseConfig);
const fireStore = firebaseApp.firestore();
export const storage = firebaseApp.storage();
const auth = firebaseApp.auth();

const HASURA_CLAIMS_URL = 'https://hasura.io/jwt/claims';

export interface EmailAndPasswordSignUp {
    email: string;
    password: string;
    displayName: string;
}

const authContext = createContext<AuthContext>(defaultAuhContext);

export const getUserById = async (firebaseId: string) => {
    return new Promise((resolve, reject) => {
        fireStore.collection(LOCAL_STORAGE_KEY.USER).onSnapshot(snapshot => {
            const updatedData = snapshot.docs.map(doc => doc.data());
            const updatedUser = updatedData.filter(({ user }) => user.firebaseId === firebaseId);
            resolve(updatedUser);
        }, reject);
    });
};

export const addUser = (user: FirebaseUser) => {
    return fireStore.collection(LOCAL_STORAGE_KEY.USER).add({
        user
    });
};

export const updateUserVerification = (userId: string) => {
    return fireStore.collection(LOCAL_STORAGE_KEY.USER).doc(userId).set({ emailVerified: true }, { merge: true });
};

export const updateFirebaseUser = (userId: string, user: Partial<FirebaseUser>) => {
    return fireStore.collection(LOCAL_STORAGE_KEY.USER).doc(userId).set(user, { merge: true });
};

function useFirebaseProviderAuth() {
    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
    const [authError, setAuthError] = useState('');
    const [isFirstTimeUser, setFirstTimeUser] = useState(false);

    const signinWithEmailPassword = async (email: string, password: string) => {
        return firebaseApp.auth().signInWithEmailAndPassword(email, password);
    };

    const handleUpdateFirebaseProfile = (user: any, profile: Partial<FirebaseUser>) => {
        user.updateProfile(profile)
            .then(() => {
                setAuthState(prevState => ({ ...prevState, isAuth: true, user }));
            })
            .catch((error: unknown) => console.log(error));
    };

    const signupWithEmailPassword = async ({ email, password, displayName }: EmailAndPasswordSignUp) => {
        const { user } = await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
        if (user) {
            const profile = { displayName };
            localStorage.setItem(LOCAL_STORAGE_KEY.IS_EMAIL_SIGNUP_SENT, 'true');
            user.updateProfile(profile)

                .then(async () => {
                    const token = await user.getIdToken(true);
                    const idTokenResult = await user.getIdTokenResult();
                    const hasuraClaim = idTokenResult.claims[HASURA_CLAIMS_URL];
                    hasuraClaim && localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
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
                localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
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
                const token = await user.getIdToken(true);
                const idTokenResult = await user.getIdTokenResult();
                const hasuraClaim = idTokenResult.claims[HASURA_CLAIMS_URL];
                localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
                localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(user));

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
                    localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
                    setAuthState(prevState => ({ ...prevState, isAuth: true, user }));
                    // TODO : CLEAR WHEN ACTION IS COMPLETED
                } else {
                    // Check if refresh is required.
                    const metadataRef = firebaseApp.database().ref('metadata/' + user.uid + '/refreshTime');

                    metadataRef.on('value', async (data: any) => {
                        if (!data.exists) return;
                        // Force refresh to pick up the latest custom claims changes.
                        const newToken = await user.getIdToken(true);
                        setAuthState(prevState => ({ ...prevState, isAuth: true, user }));
                        localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, newToken);
                    });
                }
                setFirstTimeUser(user.metadata.creationTime === user.metadata.lastSignInTime);
            } else {
                localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
                setAuthState(prevState => ({ ...prevState, isAuth: false, user: null }));
            }
        });
        return () => unsubscribe();
    }, []);

    return {
        authError,
        authState,
        isFirstTimeUser,
        confirmPasswordReset,
        handleUpdateFirebaseProfile,
        sendPasswordResetEmail,
        setAuthError,
        signinWithEmailPassword,
        signInWithFacebook,
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
