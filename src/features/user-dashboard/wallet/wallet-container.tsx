import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import LocalWalletCard from './cards/local-wallet';
import ResidenceWalletCard from './cards/residence-wallet';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        reviewSlider_container: {
            marginTop: 40,
            cursor: 'pointer',
            borderRadius: 12,
            maxWidth: 1200,
            marginBottom: 20,
            margin: 'auto',
            [theme.breakpoints.only('lg')]: {
                marginRight: '-15vw'
            },
            [theme.breakpoints.down('sm')]: {
                width: '90vw'
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

    return (
        <div className={classes.reviewSlider_container}>
            <Typography className={classes.heading}> Your Wallet </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <ResidenceWalletCard />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalWalletCard handleOpen={handleOpen} />
                </Grid>
            </Grid>
        </div>
    );
};

export default WalletContainer;
