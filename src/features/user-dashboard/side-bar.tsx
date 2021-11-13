import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import PaymentsIcon from '@mui/icons-material/Payments';
import Stack from '@mui/material/Stack';

import { TransactionSvgComponent } from 'components/icons';

import { useSidebarStyles } from './classes';

const sideMenu = [
    {
        label: 'Dashboard',
        route: '/dashboard',
        icon: <DashboardIcon sx={{ fontSize: '1.1em' }} style={{ marginRight: '16px' }} />
    },
    {
        label: 'New Payment',
        route: '/payment',
        icon: <PaymentIcon sx={{ fill: '#0D324D' }} style={{ marginRight: '16px' }} />
    },
    {
        label: 'Cards',
        route: '/cards',
        icon: <PaymentsIcon sx={{ fill: '#0D324D' }} style={{ marginRight: '16px' }} />
    },
    {
        label: 'Transactions',
        route: '/dashboard',
        icon: <TransactionSvgComponent stroke={'#0D324D'} style={{ marginRight: '16px' }} />
    },
    {
        label: 'Account',
        route: '/account',
        icon: <AccountCircle sx={{ fill: '#0D324D' }} style={{ marginRight: '16px' }} />
    }
];

export const SideBar = () => {
    const classes = useSidebarStyles();
    return (
        <Stack sx={{ pt: 20, pl: 2, mr: 2 }} spacing={2} className={classes.item}>
            {sideMenu.map(({ icon, label, route }) => {
                return (
                    <Stack key={label + route} direction='row' className={classes.button} spacing={2}>
                        <Button startIcon={icon} component={Link} to={route} classes={{ root: classes.button }} size={'large'}>
                            {label}{' '}
                        </Button>
                    </Stack>
                );
            })}
        </Stack>
    );
};
