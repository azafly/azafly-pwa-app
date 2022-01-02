import { Box } from '@mui/system';
import { lazy, Suspense } from 'react';

import { NavBar } from 'components/nav-bar';
import { ThreeDots } from 'components/css-loaders/three-dots';

const LazyDashBoard = lazy(() => import('features/user-dashboard/dashboard'));
const SuspenseComponent = () => (
    <Box sx={{ width: '100vw', height: '100vh' }}>
        {' '}
        <ThreeDots variantColor={'base'} />{' '}
    </Box>
);

const UserDashboard = () => {
    return (
        <>
            <NavBar />
            <Suspense fallback={<SuspenseComponent />}>
                <LazyDashBoard />
            </Suspense>
        </>
    );
};

export default UserDashboard;
