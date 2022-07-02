interface RouteConfig {
    name: string;
    path: string;
    isPrivate?: boolean;
}

export enum ROUTE_MAP {
    'AUTH' = '/auth',
    'SIGN_IN' = 'auth/signin',
    'SIGN_UP' = 'auth/signup',
    'HOME' = '/',
    'PAYMENTS' = '/payment',
    'ONBOARDING' = '/onboarding-update',
    'PAYMENTS_CALLBACK' = '/payments-callback',
    'FORGOT_PASSWORD' = '/forgot-password',
    'AUTH_VERIFY' = '/auth-verify',
    'DASHBOARD' = '/dashboard',
    'ACCOUNT' = '/account',
    'ANY' = '*'
}
export const routes: RouteConfig[] = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Home',
        path: '/home'
    },
    {
        name: 'UserDashboard',
        path: '/dashboard',
        isPrivate: true
    },
    {
        name: 'login',
        path: '/login'
    },
    {
        name: 'profile',
        path: '/account'
    }
];

export const routePaths = routes.map(route => route.path);

export const getRoutePathIndex = (path: string) => {
    const index = routePaths.indexOf(path);
    return index > -1 ? index : 0;
};
