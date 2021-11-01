import { Box } from '@mui/system';
import { lazy, Suspense } from 'react';
import PaymentsIcon from '@mui/icons-material/Payments';

import { NavBar } from 'features/user-dashboard/nav-bar';
import { ThreeDots } from 'components/css-loaders/three-dots';
import { BottomNavBar } from 'features/user-dashboard/bottom-navbar';

const LazyDashBoard = lazy(() => import('features/user-dashboard/dashboard'));
const SuspenseComponent = () => (
    <Box sx={{ width: '100vw', height: '100vh' }}>
        {' '}
        <ThreeDots styles={{ backgroundColor: '#4990a4' }} />{' '}
    </Box>
);

const callToAction = {
    text: 'New Payment',
    link: '/payment',
    icon: <PaymentsIcon />
};

const UserDashboard = () => {
    return (
        <>
            <NavBar callToAction={callToAction} />
            <Suspense fallback={<SuspenseComponent />}>
                <LazyDashBoard />
            </Suspense>
            <BottomNavBar />
        </>
    );
};

export default UserDashboard;
