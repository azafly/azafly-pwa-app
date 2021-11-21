import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { PrivateRoute } from './private-routes';

import ForgotPassword from 'features/onboarding/forgot-password';
import VerifyUser from 'features/onboarding/auth-verify';
import Onboarding from 'views/onboarding';
import Page404 from 'views/404';
import UserDashboard from 'views/user-dashboard';
import Payments from 'views/payments';
import { UserAccount } from 'views/user-account';
import { PaymentsCallback } from 'views/payments-callback';
import { InitialPreferences } from 'features/onboarding/preferences/initial-preferences';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/signin'>
                    <Onboarding />
                </Route>
                <Route exact path='/'>
                    <Onboarding />
                </Route>
                <Route exact path='/signup'>
                    <Onboarding />
                </Route>
                <PrivateRoute exact path='/payment'>
                    <Payments />
                </PrivateRoute>
                <PrivateRoute exact path='/onboarding-update'>
                    <InitialPreferences />
                </PrivateRoute>
                <PrivateRoute exact path='/payments-callback'>
                    <PaymentsCallback />
                </PrivateRoute>
                <Route exact path='/forgot-password'>
                    <ForgotPassword />
                </Route>
                <Route exact path='/auth-verify'>
                    <VerifyUser />
                </Route>
                <PrivateRoute path='/dashboard'>
                    <UserDashboard />
                </PrivateRoute>
                <PrivateRoute path='/account'>
                    <UserAccount />
                </PrivateRoute>
                <Route exact path='*'>
                    <Page404 />
                </Route>
            </Switch>
        </Router>
    );
};
