import { Avatar } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, { memo } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { CountryViewToggleSwitch } from 'components/country-view-toggle';
import { DashboardSvgComponent, SignOutSvgComponent, ProfileSvgComponent, HelpSvgComponent } from 'components/icons';
import { Dispatch } from 'app/store';
import { Logo2SvgComponent } from 'components/icons/logo-style-2';
import { ThreeDots } from 'components/css-loaders/three-dots';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useUserContext } from 'hooks/use-user-context';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
            '& .MuiToolbar-regular': {
                height: 50
            }
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            display: 'flex',
            height: 60
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex'
            },
            '& .name': {
                textTransform: 'capitalize'
            },
            '& .link': {
                textDecoration: 'none',
                fontWeight: 700
            },
            '& .payment_button': {
                fontWeight: 550,
                background: 'white',
                color: theme.colors.textPrimary,
                textTransform: 'capitalize'
            }
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none'
            }
        },
        menuItem_text: {
            color: theme.colors.textPrimary,
            fontWeight: 450
        }
    })
);

export const NavBar = memo(function NavBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatch = useDispatch<Dispatch>();

    const { signout } = useFirebaseAuthContext();
    const { pathname } = useLocation();
    const { user: userData, loading } = useUserContext();

    const profileSrc = userData?.image_url;

    const isOnboardingPage = pathname === '/onboarding-update';

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleRestDashboardTab = () => {
        dispatch.dashboard.setCurrentDashboardTab('dashboard');
    };

    const menuId = 'primary-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem component={Link} to={'/account'}>
                <IconButton aria-label='account of current user' aria-controls='menu' aria-haspopup='true' color='inherit'>
                    <ProfileSvgComponent />
                </IconButton>
                <Typography className={classes.menuItem_text}>Profile</Typography>
            </MenuItem>
            <MenuItem onClick={() => location.replace('https://www.lucqax.com/faq')}>
                <IconButton aria-label='account of current user' aria-controls='menu' aria-haspopup='true' color='inherit'>
                    <HelpSvgComponent />
                </IconButton>
                <Typography className={classes.menuItem_text}>Help</Typography>
            </MenuItem>
            {!isOnboardingPage && (
                <MenuItem component={Link} to={'/dashboard'}>
                    <IconButton aria-label='account of current user' aria-controls='menu' aria-haspopup='true' color='inherit'>
                        <DashboardSvgComponent />
                    </IconButton>
                    <Typography className={classes.menuItem_text}>Dashboard</Typography>
                </MenuItem>
            )}
            <MenuItem />
            <MenuItem /> <MenuItem /> <MenuItem /> <MenuItem />
            <MenuItem />
            <MenuItem onClick={() => signout()}>
                <IconButton aria-label='account of current user' aria-controls='menu' aria-haspopup='true' color='inherit'>
                    <SignOutSvgComponent />
                </IconButton>
                <Typography className={classes.menuItem_text}>Log Out</Typography>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {!isOnboardingPage && (
                <MenuItem component={Link} to={'/account'}>
                    <IconButton aria-label='account of current user' aria-controls='menu' aria-haspopup='true' color='inherit'>
                        <ProfileSvgComponent />
                    </IconButton>
                    <Typography>Profile</Typography>
                </MenuItem>
            )}
            <MenuItem onClick={() => location.replace('https://www.lucqax.com/faq')}>
                <IconButton aria-label='help' aria-controls='menu' aria-haspopup='true' color='inherit'>
                    <HelpSvgComponent />
                </IconButton>
                <Typography>Help</Typography>
            </MenuItem>
            {!isOnboardingPage && (
                <MenuItem component={Link} to={'/dashboard'} style={{ margin: 2 }}>
                    <IconButton aria-label='dashboard' aria-controls='dashboard' aria-haspopup='true' color='inherit'>
                        <DashboardSvgComponent />
                    </IconButton>
                    <Typography className={classes.menuItem_text}>Dashboard</Typography>
                </MenuItem>
            )}
            <MenuItem />
            <MenuItem /> <MenuItem />
            <MenuItem />
            <MenuItem onClick={() => signout()}>
                <IconButton aria-label='account of current user' aria-controls='menu' aria-haspopup='true' color='inherit'>
                    <SignOutSvgComponent />
                </IconButton>
                <Typography className={classes.menuItem_text}>Log out</Typography>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position='fixed' elevation={0}>
                <Toolbar>
                    <Link to={isOnboardingPage ? '#' : '/dashboard'} className={classes.title} onClick={handleRestDashboardTab}>
                        {' '}
                        <Logo2SvgComponent />
                    </Link>
                    <div className={classes.grow} />
                    <CountryViewToggleSwitch />
                    <div className={classes.sectionDesktop}>
                        {!isOnboardingPage && (
                            <>
                                <IconButton
                                    edge='end'
                                    aria-label='account of current user'
                                    aria-controls={menuId}
                                    aria-haspopup='true'
                                    onClick={handleProfileMenuOpen}
                                    color='inherit'
                                >
                                    {loading ? <ThreeDots /> : <Avatar src={profileSrc ?? ''} />}
                                </IconButton>
                                <IconButton aria-label='notifications' color='inherit'>
                                    <Badge badgeContent={3} color='secondary'>
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    edge='end'
                                    aria-label='account of current user'
                                    aria-controls={menuId}
                                    aria-haspopup='true'
                                    onClick={handleProfileMenuOpen}
                                    color='inherit'
                                />
                            </>
                        )}
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label='show more'
                            aria-controls={mobileMenuId}
                            aria-haspopup='true'
                            onClick={handleMobileMenuOpen}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
});
