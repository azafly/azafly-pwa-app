import React from 'react';
import { Badge, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PaymentIcon from '@mui/icons-material/Payment';
import PaymentsIcon from '@mui/icons-material/Payments';

import { DashboardSvgComponent } from 'components/icons/dashboard';
import { usePrevious } from '../../hooks/use-previous';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bottomNavRoot: {
            width: '100vw',
            position: 'fixed',
            boxShadow: '0 2px 16px 0 rgb(0 0 0 / 8%)',
            zIndex: 9999,
            left: 0,
            bottom: -0,
            [theme.breakpoints.up('lg')]: {
                display: 'none'
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
            boxShadow: '0 2px 16px 0 rgb(0 0 0 / 8%)',
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

    const previousLinkValue = usePrevious(value);
    const currentHistory = useHistory();

    const goToLink = (key: number) => {
        setValue(key);
        const isKeyChanged = previousLinkValue !== key;
        switch (key) {
            case 0:
                isKeyChanged && currentHistory.push('/dashboard');
                break;
            case 1:
                isKeyChanged && currentHistory.push('/dashboard');
                break;
            case 2:
                isKeyChanged && currentHistory.push('/payment');
                break;
            case 3:
                isKeyChanged && currentHistory.push('/account');
                break;
            default:
                break;
        }
    };
    return (
        <>
            <BottomNavigation
                value={value}
                onChange={(_, newValue) => {
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
