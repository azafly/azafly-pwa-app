import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import LocalWalletCard from './cards/local-wallet';
import ResidenceWalletCard from './cards/residence-wallet';

import Slider from 'react-slick';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        reviewSlider_container: {
            marginTop: 40,
            cursor: 'pointer',
            borderRadius: 12,
            maxWidth: 900,
            margin: 'auto',
            marginBottom: 20,
            [theme.breakpoints.up('xl')]: { maxWidth: 1200 },
            '& .slick-dots li.slick-active': {
                '& button::before': {
                    color: theme.colors.base
                }
            },
            '& .slick-prev::before, .slick-next::before': {
                color: theme.colors.base
            }
        },
        heading: {
            fontWeight: 750,
            marginBottom: 10,
            [theme.breakpoints.only('xs')]: {
                textAlign: 'center'
            }
        },
        modal: {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            margin: 'auto'
        }
    })
);

interface WalletContainerProps {
    handleOpen: () => void;
}
const WalletContainer = ({ handleOpen }: WalletContainerProps) => {
    const classes = useStyles();
    const isSmallScreen = useMediaQuery('(max-width:620px)');

    const settings = {
        dots: true,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 1,
        centerPadding: '60px'
    };

    return (
        <div className={classes.reviewSlider_container}>
            <Typography className={classes.heading}> Balances </Typography>

            {isSmallScreen ? (
                <Slider {...settings}>
                    <div>
                        <ResidenceWalletCard />
                    </div>
                    <div>
                        <LocalWalletCard handleOpen={handleOpen} />
                    </div>
                </Slider>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <ResidenceWalletCard />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalWalletCard handleOpen={handleOpen} />
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default WalletContainer;
