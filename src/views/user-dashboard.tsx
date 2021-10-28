import { Box } from '@mui/system';
import { lazy, Suspense } from 'react';
import { NavBar } from 'features/user-dashboard/nav-bar';

import { ThreeDots } from 'components/css-loaders/three-dots';

const LazyDashBoard = lazy(() => import('features/user-dashboard/dashboard'));
const SuspenseComponent = () => (
    <Box sx={{ width: '100vw', height: '100vh' }}>
        {' '}
        <ThreeDots styles={{ backgroundColor: '#4990a4' }} />{' '}
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
