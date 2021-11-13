import { Box, Grid, Modal, Typography, useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { lazy } from 'react';
import Slider from 'react-slick';
import { CreditCard } from './cards/credit-card';

const LazyLocalCard = lazy(() => import('./cards/local-wallet'));
const ResidenceLocalCard = lazy(() => import('./cards/residence-wallet'));

const settings = {
    dots: true,
    className: 'slider variable-width',
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 2,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    autoplay: true,
    arrows: false
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        reviewSlider_container: {
            marginTop: 40,
            maxWidth: 1200,
            [theme.breakpoints.only('xs')]: {
                marginLeft: '5vw',
                width: 620
            }
        },
        heading: {
            fontWeight: 750,
            marginBottom: 10
        }
    })
);
const WalletContainer = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isMobileScreen = useMediaQuery('(max-width:450px)');

    const classes = useStyles();
    return (
        <Box className={classes.reviewSlider_container}>
            <Typography className={classes.heading}> Your Wallet </Typography>
            {isMobileScreen ? (
                <Slider {...settings}>
                    <ResidenceLocalCard />
                    <LazyLocalCard />
                    <Modal open={open} onClose={handleClose} aria-labelledby='credit-card' aria-describedby='credit-card-payment'>
                        <CreditCard handleOpen={handleOpen} />
                    </Modal>
                </Slider>
            ) : (
                <>
                    <Grid container spacing={3}>
                        <Grid item>
                            <ResidenceLocalCard />
                        </Grid>
                        <Grid item>
                            <LazyLocalCard />
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default WalletContainer;
