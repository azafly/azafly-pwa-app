import { Box, Card, Typography } from '@mui/material';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { GuaranteeTag } from './guarantee-tag';
import { ThreeDots } from '../../../../components/css-loaders/three-dots/three-dots';
import InfoIcon from '@mui/icons-material/Info';
import { RootState } from 'app/store';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 675,
            borderRadius: 4,
            margin: '10px 0px',
            [theme.breakpoints.only('xs')]: {
                width: '100%',
                margin: '10px 0px',
                backgroundColor: 'transparent',
                padding: 0
            },
            '& .MuiButton-containedPrimary': {
                backgroundColor: theme.colors.base,
                textTransform: 'capitalize',
                fontWeight: 900,
                fontFamily: `Nunito`,
                margin: 'auto',
                '&:hover': {
                    opacity: 0.8,
                    backgroundColor: theme.colors.base
                }
            }
        },
        card: {
            borderRadius: 7,
            padding: 10,
            marginBottom: 20,
            marginTop: 10,
            [theme.breakpoints.only('xs')]: {
                marginTop: 20
            }
        },
        price: {
            color: theme.colors.textPrimary,
            fontWeight: 900,
            fontSize: '1.5rem',
            margin: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 10
        }
    })
);

export function PriceCard() {
    const classes = useStyles();
    const {} = useSelector((state: RootState) => state.payment);

    const getFormattedCurrency = () => {
        // const localStoragePaymentOffer = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.INITIAL_OFFER) as string) as LocalStorageInitialOffer;

        // if (!initialOffer && localStoragePaymentOffer) {
        //     return formatCurrency({
        //         currency: localStoragePaymentOffer?.target_currency ?? 'NGN',
        //         amount: localStoragePaymentOffer?.total_in_target_with_charges || 0,
        //         countryCode: 'NG'
        //     });
        // } else {
        //     return formatCurrency({
        //         currency: sourceCountry.currency.code,
        //         amount: initialOffer?.total_in_target_with_charges || 0,
        //         countryCode: sourceCountry.code
        //     });
        // }
        return '100$';
    };

    return (
        <div className={classes.root}>
            <GuaranteeTag isLoading={false} />
            <Card elevation={0} className={classes.card}>
                {false ? (
                    <ThreeDots variantColor={'base'} />
                ) : (
                    <div>
                        <h5 className={classes.price}> {getFormattedCurrency()}</h5>
                    </div>
                )}
                <Box sx={{ display: 'flex' }}>
                    <InfoIcon color={'info'} />
                    <Typography paragraph className={'paragraph'} sx={{ fontSize: '0.7rem', padding: '0px 10px' }} align={'justify'}>
                        {' '}
                        {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                                dummy text ever since the 1500s.
                                `}
                    </Typography>
                </Box>
            </Card>
        </div>
    );
}
