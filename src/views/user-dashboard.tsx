import Dashboard from 'features/user-dasboard/dashboard';

import { useLocation } from 'react-router-dom';

const UserDashboard = () => {
    const location = useLocation();
    return (
        <>
            <Dashboard key={location.key} />
        </>
    );
};

export default UserDashboard;
