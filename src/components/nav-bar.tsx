import { AppBar, Toolbar, Button, IconButton, useMediaQuery } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Logo1SvgComponent } from 'components/icons';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from 'react-router-dom';

interface NavbarProps {
    handleDrawerOpen?: () => void;
    classNames?: string;
    open?: boolean;
}

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navbarContainer: {
            width: '100vw',
            overflowX: 'hidden'
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            background: 'white',
            color: theme.colors.textPrimary
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginRight: drawerWidth
        },
        toolBar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
            width: '80vw',
            margin: 'auto',
            height: 70
        },
        logo: {
            flexGrow: 1,
            textDecoration: 'none',
            display: 'flex',
            width: 100
        },
        links: {
            color: theme.palette.secondary.main,
            display: 'flex',
            fontWeight: 400,
            fontSize: '0.85rem',
            marginRight: 15,
            justifyContent: 'space-around'
        },
        active: {
            display: 'inline-block',
            borderBottom: '2px solid #4990A4',
            color: theme.colors.base,
            paddingRight: 0
        },
        title: {
            flexGrow: 1,
            fontWeight: 900,
            opacity: 0.7,
            color: theme.colors.textPrimary
        },
        hide: {
            display: 'none'
        },
        menuIcon: {
            color: theme.colors.textPrimary,
            position: 'absolute',
            right: 0,
            justifySelf: 'flex-end'
        },
        downloadLink: {
            flexGrow: 1,
            marginLeft: 70,
            fontWeight: 500,
            justifyContent: 'flex-end',
            display: 'flex'
        },
        register: {
            background: theme.palette.primary.main,
            textTransform: 'capitalize',
            color: 'white',
            fontWeight: 500,
            paddingRight: 25,
            paddingLeft: 25,
            transition: 'background .25s ease-in -out, transform .15s ease,- webkit - transform .15s ease',
            '&:hover': {
                opacity: 0.9,
                background: theme.palette.primary.main,
                transform: 'scale(1.01)',
                borderRadius: 6
            }
        },
        signin: {
            textTransform: 'capitalize',
            marginRight: '2vw',
            fontWeight: 500,
            color: theme.palette.secondary.main
        },
        underline: {
            border: '3px solid #4990A4'
        }
    })
);

export const NavBar = ({ handleDrawerOpen, open }: NavbarProps) => {
    const classes = useStyles();

    const isSmallScreen = useMediaQuery('(max-width:950px)');

    return (
        <div className={`${classes.navbarContainer}`}>
            {isSmallScreen ? (
                <AppBar
                    elevation={0}
                    position='fixed'
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar>
                        <Link to='/' className={`${classes.logo}`}>
                            <Logo1SvgComponent />{' '}
                        </Link>
                        <IconButton
                            color='secondary'
                            aria-label='open drawer'
                            edge='end'
                            onClick={handleDrawerOpen}
                            className={clsx(open && classes.hide)}
                        >
                            <MenuIcon className={classes.menuIcon} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            ) : (
                <AppBar className={classes.appBar} elevation={0}>
                    <Toolbar className={classes.toolBar}>
                        <Link to='/' className={`${classes.logo}`}>
                            <Logo1SvgComponent />{' '}
                        </Link>
                        <section className={classes.links}></section>
                        <section className={classes.downloadLink}>
                            <Button className={classes.register} component={Link} to='/dashboard'>
                                Go to Dashboard{' '}
                            </Button>
                        </section>
                    </Toolbar>
                </AppBar>
            )}
        </div>
    );
};
