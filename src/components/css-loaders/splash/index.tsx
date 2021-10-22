import { createStyles, makeStyles, Theme } from '@material-ui/core';

import './splash.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        splash_container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflowX: 'hidden',
            height: '100vh',
            width: '100vw',
            background: 'white'
        }
    })
);

const Splash = () => {
    const classes = useStyles();
    return (
        <div className={classes.splash_container}>
            <div className='lds-ripple'>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Splash;
