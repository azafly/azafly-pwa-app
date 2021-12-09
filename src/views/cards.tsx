import { lazy, Suspense } from 'react';

import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';

const LazyCardList = lazy(() => import('features/user-dashboard/virtual-cards/card-list'));

export const CardsPage = () => {
    return (
        <Suspense fallback={<ThreeDots />}>
            <LazyCardList />
        </Suspense>
    );
};
