import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import { PrivateRoute } from './private-routes';

import BookingPage from 'features/booking';
import ForgotPassword from 'features/onboarding/sign-in/forgot-password';
import ResetPassword from 'features/onboarding/sign-in/reset-password';
import Onboarding from 'views/onboarding';
import Page404 from 'views/404';
import Profile from 'views/profile';
import UserDashboard from 'views/user-dashboard';
import Payments from 'views/payments';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Onboarding />
                </Route>
                <Route exact path='/profile'>
                    <Profile />
                </Route>
                <Route exact path='/signup'>
                    <Onboarding />
                </Route>
                <Route exact path='/payment'>
                    <Payments />
                </Route>
                <Route exact path='/signin'>
                    <Onboarding />
                </Route>
                <Route exact path='/forgot-password'>
                    <ForgotPassword />
                </Route>
                <Route exact path='/reset-password'>
                    <ResetPassword />
                </Route>
                <PrivateRoute path='/booking'>
                    <BookingPage />
                </PrivateRoute>
                <PrivateRoute path='/dashboard'>
                    <UserDashboard />
                </PrivateRoute>
                <Route exact path='*'>
                    <Page404 />
                </Route>
            </Switch>
        </Router>
    );
};
