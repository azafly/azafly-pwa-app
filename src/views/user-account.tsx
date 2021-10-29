import { lazy, Suspense } from 'react';

import { ThreeDots } from 'components/css-loaders/three-dots';

const LazyUserAccount = lazy(() => import('features/account'));

export const UserAccount = () => {
    return (
        <Suspense fallback={<ThreeDots />}>
            <LazyUserAccount />
        </Suspense>
    );
};
