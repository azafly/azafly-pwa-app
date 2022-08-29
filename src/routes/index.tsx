import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';

import { PrivateRoute } from './private-routes';

import ForgotPassword from 'features/onboarding/forgot-password';
import VerifyUser from 'features/onboarding/auth-verify';
import Onboarding from 'views/onboarding';
import Page404 from 'views/404';
import UserDashboard from 'views/user-dashboard';
import Payments from 'views/payments';
import { UserAccount } from 'views/user-account';
import { PaymentsCallback } from 'views/payments-callback';
import { OnboardingPreferences } from 'features/onboarding/initial-preferences';
import { Transactions } from '../features/user-dashboard/transactions/index';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' element={<Onboarding />} />
                <Route path='/auth' element={<Onboarding />}>
                    <Route path='signin' element={<Onboarding />} />
                    <Route path='signup' element={<Onboarding />} />
                </Route>
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route element={<VerifyUser />} path='/auth-verify' />
                <Route
                    path='/dashboard'
                    element={
                        <PrivateRoute>
                            <UserDashboard />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<Transactions />}></Route>
                    <Route path='account' element={<UserAccount />}></Route>
                    <Route path='payments' element={<Payments />}></Route>
                    <Route path='trades' element={<Payments />}></Route>
                </Route>

                <Route
                    path='/onboarding-update'
                    element={
                        <PrivateRoute>
                            <OnboardingPreferences />
                        </PrivateRoute>
                    }
                ></Route>
                <Route
                    path='/payments-callback'
                    element={
                        <PrivateRoute>
                            <PaymentsCallback />
                        </PrivateRoute>
                    }
                ></Route>

                <Route path='*' element={<Page404 />}></Route>
            </Switch>
        </Router>
    );
};
