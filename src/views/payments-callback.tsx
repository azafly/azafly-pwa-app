import { lazy, Suspense } from 'react';

import { ThreeDots } from 'components/css-loaders/three-dots';
const LazyPaymentCallbackPage = lazy(() => import('features/payments/verify-redirect/verify-payment'));

export const PaymentsCallback = () => {
    return (
        <Suspense fallback={ThreeDots}>
            <LazyPaymentCallbackPage />
        </Suspense>
    );
};
