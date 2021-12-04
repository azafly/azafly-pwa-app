import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import Slider from 'react-slick';

import { useGetUserTransactionsQuery, useGetCurrentUserByEmailQuery } from 'api/generated/graphql';

import LocalWalletCard from './cards/local-wallet';
import ResidenceWalletCard from './cards/residence-wallet';

import { RootState } from 'app/store';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        reviewSlider_container: {
            cursor: 'pointer',
            borderRadius: 12,
            maxWidth: 900,
            margin: 'auto',
            marginBottom: 20,
            marginTop: '3vh',
            [theme.breakpoints.up('xl')]: { maxWidth: 1200 },
            [theme.breakpoints.only('xs')]: { marginTop: '12vh' }
        },
        heading: {
            fontWeight: 650,
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
        arrows: false,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 1.2,
        infinite: false
    };

    const { user } = useSelector((state: RootState) => state.auth);

    const { data: userData } = useGetCurrentUserByEmailQuery({
        variables: {
            email: user?.email ?? ''
        }
    });

    const id = userData?.users[0]?.id;
    const { data: transactionData, loading } = useGetUserTransactionsQuery({ variables: { id } });

    return (
        <div className={classes.reviewSlider_container}>
            <Typography className={classes.heading}> Your Accounts </Typography>

            {isSmallScreen ? (
                <Slider {...settings}>
                    <div>
                        <ResidenceWalletCard loading={loading || !transactionData} handleOpen={handleOpen} />
                    </div>
                    <div>
                        <LocalWalletCard loading={loading || !transactionData} handleOpen={handleOpen} />
                    </div>
                </Slider>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <ResidenceWalletCard loading={loading || !transactionData} handleOpen={handleOpen} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalWalletCard loading={loading || !transactionData} handleOpen={handleOpen} />
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default WalletContainer;
