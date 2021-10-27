import { lazy, Suspense } from 'react';

import { DashboardSvgComponent } from 'components/icons';

const LazyDashBoard = lazy(() => import('features/user-dashboard/dashboard'));

const UserDashboard = () => {
    return (
        <Suspense fallback={<DashboardSvgComponent />}>
            <LazyDashBoard />
        </Suspense>
    );
};

export default UserDashboard;
