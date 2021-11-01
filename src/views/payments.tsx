import { lazy, Suspense } from 'react';

import { BottomNavBar } from 'features/user-dashboard/bottom-navbar';
import { NavBar } from 'features/user-dashboard/nav-bar';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';

const LazyPayments = lazy(() => import('features/payments'));
const SuspenseComponent = () => <ThreeDots />;

const Payments = () => {
    return (
        <>
            <NavBar />
            <Suspense fallback={<SuspenseComponent />}>
                <LazyPayments />
            </Suspense>
            <BottomNavBar />
        </>
    );
};

export default Payments;
