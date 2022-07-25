import { ReactNode } from 'react';
import { Route } from 'react-router-dom';

import ForgotPassword from 'features/onboarding/forgot-password';
import VerifyUser from 'features/onboarding/auth-verify';
import Onboarding from 'views/onboarding';
import Page404 from 'views/404';
import UserDashboard from 'views/user-dashboard';
import Payments from 'views/payments';
import { UserAccount } from 'views/user-account';
import { PaymentsCallback } from 'views/payments-callback';
import { OnboardingPreferences } from 'features/onboarding/initial-preferences';

import { PrivateRoute } from './private-routes';

export enum ROUTE_MAP_ENUM {
    'AUTH' = '/auth',
    'AUTH_SIGN_IN' = 'signin',
    'AUTH_SIGN_UP' = 'signup',
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

interface RouteConfig {
    name: string;
    path: ROUTE_MAP_ENUM;
    component: ReactNode;
    isPrivate?: boolean;
    children?: Omit<RouteConfig, 'isPrivate'>[];
}

export const routes: RouteConfig[] = [
    {
        name: 'Home',
        path: ROUTE_MAP_ENUM.HOME,
        component: <UserDashboard />
    },
    {
        name: 'Home',
        path: ROUTE_MAP_ENUM.HOME,
        component: <UserDashboard />
    },
    {
        name: 'Auth',
        path: ROUTE_MAP_ENUM.AUTH,
        component: <Onboarding />,
        children: [
            {
                name: 'signin',
                path: ROUTE_MAP_ENUM.AUTH_SIGN_IN,
                component: <Onboarding />
            },
            {
                name: 'signup',
                path: ROUTE_MAP_ENUM.AUTH_SIGN_UP,
                component: <Onboarding />
            }
        ]
    },
    {
        name: 'UserDashboard',
        path: ROUTE_MAP_ENUM.DASHBOARD,
        isPrivate: true,
        component: <UserDashboard />
    },
    {
        name: 'account',
        path: ROUTE_MAP_ENUM.ACCOUNT,
        isPrivate: true,
        component: <UserAccount />
    },
    {
        name: 'Payment',
        path: ROUTE_MAP_ENUM.PAYMENTS,
        isPrivate: true,
        component: <Payments />
    },
    {
        name: 'OnboardingUpdate',
        path: ROUTE_MAP_ENUM.ONBOARDING,
        isPrivate: true,
        component: <OnboardingPreferences />
    },
    {
        name: 'PaymentsCallback',
        path: ROUTE_MAP_ENUM.PAYMENTS_CALLBACK,
        isPrivate: true,
        component: <PaymentsCallback />
    },
    {
        name: 'ForgotPassword',
        path: ROUTE_MAP_ENUM.FORGOT_PASSWORD,
        isPrivate: true,
        component: <ForgotPassword />
    },
    {
        name: 'AuthVerify',
        path: ROUTE_MAP_ENUM.AUTH_VERIFY,
        isPrivate: true,
        component: <VerifyUser />
    },
    {
        name: '404',
        path: ROUTE_MAP_ENUM.ANY,
        isPrivate: true,
        component: <Page404 />
    }
];

export const routePaths = routes.map(route => route.path);

export const getRoutePathIndex = (path: ROUTE_MAP_ENUM) => {
    const index = routePaths.indexOf(path);
    return index > -1 ? index : 0;
};

export const RESOLVED_ROUTES = routes.map(({ name, path, isPrivate, component }) => {
    // return <Switch key={name}>{isPrivate ? <PrivateRoute path={path}>{component}</PrivateRoute> : <Route path={path}> {component} </Route>}</Switch>;
});
