import { Box } from '@mui/system';
import { Button } from '@mui/material';

import { DashboardSvgComponent } from '../../components/icons/dashboard';
import { Link } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import PaymentsIcon from '@mui/icons-material/Payments';
import Stack from '@mui/material/Stack';

import { useSidebarStyles } from './classes';

const sideMenu = [
    {
        label: 'Dashboard',
        route: '/dashboard',
        icon: <DashboardSvgComponent />
    },
    {
        label: 'New Payment',
        route: '/payment',
        icon: <PaymentIcon sx={{ fill: '#333' }} />
    },
    {
        label: 'Cards',
        route: '/cards',
        icon: <PaymentsIcon sx={{ fill: '#333' }} />
    },
    {
        label: 'Transactions',
        route: '/dashboard',
        icon: <AccountBalanceWalletIcon sx={{ fill: '#333' }} />
    },
    {
        label: 'Account',
        route: '/account',
        icon: <AccountCircle sx={{ fill: '#333' }} />
    }
];

export const SideBar = () => {
    const classes = useSidebarStyles();
    return (
        <Box
            sx={{
                height: '120vh',
                boxShadow: '0 2px 16px 0 rgb(0 0 0 / 8%)',
                background: 'white',
                mt: -10,
                overflowY: 'clip'
            }}
        >
            <Stack sx={{ pt: 30 }} spacing={2} className={classes.item}>
                {sideMenu.map(({ icon, label, route }) => {
                    return (
                        <Stack key={label + route} direction='row' className={classes.button} spacing={4}>
                            <Button startIcon={icon} component={Link} to={route} classes={{ root: classes.button }}>
                                {label}{' '}
                            </Button>
                        </Stack>
                    );
                })}
            </Stack>
        </Box>
    );
};
