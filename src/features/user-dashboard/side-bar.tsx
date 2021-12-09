import { Button, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom';

import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentsIcon from '@mui/icons-material/Payments';
import Stack from '@mui/material/Stack';

import { TransactionSvgComponent } from 'components/icons';

import { useSidebarStyles } from './classes';

const sideMenu = [
    {
        label: 'Dashboard',
        route: 'transactions',
        icon: <DashboardIcon sx={{ fontSize: '1.1em' }} style={{ marginRight: '16px' }} />
    },
    {
        label: 'Cards',
        route: 'cards',
        icon: <PaymentsIcon sx={{ fill: '#0D324D' }} style={{ marginRight: '16px' }} />
    },
    {
        label: 'Transactions',
        route: 'transactions',
        icon: <TransactionSvgComponent stroke={'#0D324D'} style={{ marginRight: '16px' }} />
    },
    {
        label: 'Account',
        route: 'account',
        icon: <AccountCircle sx={{ fill: '#0D324D' }} style={{ marginRight: '16px' }} />
    }
];

export const SideBar = () => {
    const classes = useSidebarStyles();
    const history = useHistory();
    const handlePushState = (route: string) => {
        history.push({
            state: {
                dashboardSubRoute: route
            }
        });
    };
    return (
        <Paper className={classes.sidebar__root}>
            <Stack sx={{ pt: 20, pl: 2, mr: 2 }} spacing={2}>
                {sideMenu.map(({ icon, label, route }) => {
                    return (
                        <Stack key={label + route} direction='row' className={classes.button} spacing={2}>
                            <Button
                                component={'a'}
                                startIcon={icon}
                                onClick={() => handlePushState(route)}
                                className={classes.button}
                                style={{ textDecoration: 'none' }}
                                classes={{ root: classes.button }}
                                size={'large'}
                            >
                                {label}{' '}
                            </Button>
                        </Stack>
                    );
                })}
            </Stack>
        </Paper>
    );
};
