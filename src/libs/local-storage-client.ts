export enum LOCAL_STORAGE_KEY {
    INITIAL_OFFER = 'initial_offer',
    PAYMENT_INFO = 'payment_info',
    TOKEN = 'token',
    USER = 'user',
    IS_EMAIL_SIGNUP_SENT = 'is_email_sign_up',
    IS_PAYMENT_LINK_OPENED = 'is_lo',
    PAYMENT_ACTIVE_STEP = 'payment_active_step'
}

// discriminated union for Local storage arguments
export type LocalStorageArgs<T> = { method: 'GET'; key: string } | { method: 'REMOVE'; key: string } | { method: 'SET'; key: string; data: T };

export function localStorageClient<T>(args: LocalStorageArgs<T>) {
    if (args.method === 'SET') {
        localStorage.setItem(args.key, JSON.stringify(args.data));
    } else if (args.method === 'REMOVE') {
        localStorage.removeItem(args.key);
    } else {
        return localStorage.getItem(args.key) as unknown as T;
    }
}
