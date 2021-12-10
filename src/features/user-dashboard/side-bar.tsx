import { Button, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { Dispatch, RootState } from 'app/store';
import { SideBarTabs } from 'app/models/dashboard';
import { TransactionSvgComponent } from 'components/icons';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentsIcon from '@mui/icons-material/Payments';
import Stack from '@mui/material/Stack';

import { useSidebarStyles } from './classes';

const sideMenu = [
    {
        label: 'Dashboard',
        route: 'dashboard',
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

    const dispatch = useDispatch<Dispatch>();
    const { currentSideBarTab } = useSelector((rootState: RootState) => rootState.dashboard);

    return (
        <Paper className={classes.sidebar__root}>
            <Stack sx={{ pt: 20, pl: 2, mr: 2 }} spacing={2}>
                {sideMenu.map(({ icon, label, route }) => {
                    return (
                        <Stack
                            key={label + route}
                            direction='row'
                            className={`${classes.button} ${currentSideBarTab === route ? classes.active : ''}`}
                            spacing={2}
                        >
                            <Button
                                component={'a'}
                                startIcon={icon}
                                onClick={() => dispatch.dashboard.setCurrentDashboardTab(route as SideBarTabs)}
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
