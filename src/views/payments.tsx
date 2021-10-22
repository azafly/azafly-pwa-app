import { lazy, Suspense } from 'react';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';

const LazyPayments = lazy(() => import('features/payments'));
const SuspenseComponent = () => <ThreeDots />;

const Payments = () => {
    return (
        <Suspense fallback={SuspenseComponent}>
            <LazyPayments />
        </Suspense>
    );
};

export default Payments;
