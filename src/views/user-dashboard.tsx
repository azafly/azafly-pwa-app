import { lazy, Suspense } from 'react';

import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';

const LazyDashBoard = lazy(() => import('features/user-dashboard/dashboard'));

const UserDashboard = () => {
    return (
        <Suspense fallback={<ThreeDots />}>
            <LazyDashBoard />
        </Suspense>
    );
};

export default UserDashboard;
