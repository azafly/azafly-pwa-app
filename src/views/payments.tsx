import { lazy, Suspense } from 'react';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { NavBar } from 'features/user-dashboard/nav-bar';

const LazyPayments = lazy(() => import('features/payments'));
const SuspenseComponent = () => <ThreeDots />;

const Payments = () => {
    return (
        <>
            <NavBar />
            <Suspense fallback={<SuspenseComponent />}>
                <LazyPayments />
            </Suspense>
        </>
    );
};

export default Payments;
