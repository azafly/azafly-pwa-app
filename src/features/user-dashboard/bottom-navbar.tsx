import { Badge, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PaymentIcon from '@mui/icons-material/Payment';
import PaymentsIcon from '@mui/icons-material/Payments';
import React from 'react';

import { Dispatch } from 'app/store';
import { DashboardSvgComponent } from 'components/icons/dashboard';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bottomNavRoot: {
            width: '100vw',
            position: 'fixed',
            boxShadow: '0 2px 20px rgb(212 216 232 / 52%)',
            zIndex: 9999,
            left: 0,
            bottom: -0,
            [theme.breakpoints.up('lg')]: {
                display: 'none'
            },
            '& .MuiBottomNavigationAction-label.Mui-selected': {
                fontSize: '0.85em'
            },
            '& .MuiBottomNavigationAction-label': {
                fontSize: '0.85em'
            }
        },
        grow: {
            flexGrow: 1,
            [theme.breakpoints.only('xs')]: {
                flexGrow: 0
            }
        },
        appBar: {
            backgroundColor: 'white',
            marginBottom: 200,
            boxShadow: '0 2px 20px rgb(212 216 232 / 52%)',
            [theme.breakpoints.only('xs')]: {
                top: 'auto',
                bottom: 0
            }
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block'
            }
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch'
            }
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex'
            }
        },
        sectionMobile: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100vw',
            [theme.breakpoints.up('sm')]: {
                display: 'none'
            }
        }
    })
);

export function BottomNavBar() {
    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const dispatch = useDispatch<Dispatch>();

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const [value, setValue] = React.useState(0);
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label='show 4 new mails' color='primary'>
                    <Badge badgeContent={4} color='secondary'>
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label='show 11 new notifications' color='primary'>
                    <Badge badgeContent={11} color='primary'>
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem component={Link} to={'/profile'}>
                <IconButton aria-label='account of current user' aria-controls='primary-search-account-menu' aria-haspopup='true' color='primary'>
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const currentHistory = useHistory();

    const goToLink = (key: number) => {
        switch (key) {
            case 0:
                currentHistory.push('/dashboard');
                dispatch.dashboard.setCurrentDashboardTab('dashboard');
                break;
            case 1:
                currentHistory.push('/dashboard/cards');
                dispatch.dashboard.setCurrentDashboardTab('cards');
                break;
            case 2:
                currentHistory.push('/payment');
                dispatch.dashboard.setCurrentDashboardTab('payment');
                break;
            case 3:
                currentHistory.push('/account');
                dispatch.dashboard.setCurrentDashboardTab('account');
                break;
            default:
                break;
        }
    };
    return (
        <>
            <div style={{ marginTop: '10vh' }}></div>
            <BottomNavigation
                value={value}
                onChange={(_, newValue) => {
                    setValue(newValue);
                    goToLink(newValue);
                }}
                className={classes.bottomNavRoot}
                showLabels
            >
                <BottomNavigationAction label='Dashboard' icon={<DashboardSvgComponent />} />
                <BottomNavigationAction label='My Cards' icon={<PaymentsIcon />} />
                <BottomNavigationAction label='New Payment' icon={<PaymentIcon />} />
                <BottomNavigationAction label='Profile' icon={<AccountCircle />} />
            </BottomNavigation>
            {renderMobileMenu}
        </>
    );
}
