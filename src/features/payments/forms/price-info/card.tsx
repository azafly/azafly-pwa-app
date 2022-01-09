import { Card } from '@mui/material';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import InfoIcon from '@mui/icons-material/Info';

import { formatCurrency } from 'libs';
import { isAllValueTruthy } from 'libs/index';
import { RootState } from 'app/store';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { SupportedMethods } from './supported-methods';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 675,
            margin: '10px 0px',
            backgroundColor: 'white',
            borderRadius: 10,
            border: '1px solid #DCDCDC',
            transition: '200ms all cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 2px 4px 0 rgba(218,228,239,0.5)',
            [theme.breakpoints.only('xs')]: {
                width: '100%',
                margin: '10px 0px',
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
            borderRadius: 10,
            cursor: 'pointer',
            [theme.breakpoints.only('xs')]: {
                marginTop: 20
            }
        },
        moreInfo: {
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 10,
            paddingBottom: 10,
            margin: '0px -20px',
            marginTop: 10,
            backgroundColor: '#f9fafa',
            '&:hover': {
                backgroundColor: 'white'
            }
        },
        paragraph: {
            fontSize: '0.7rem',
            padding: '0px 10px'
        },
        prices: {
            marginLeft: '2rem',
            justifyContent: 'space-between',
            '& .price': {
                color: theme.colors.textPrimary,
                fontWeight: 800,
                fontSize: '1.5rem',
                marginTop: 10
            },
            '& .heading': {
                fontWeight: 400,
                fontSize: '0.9rem'
            },
            '& .rate': {
                color: theme.colors.base,
                fontSize: '.75rem',
                fontWeight: 600,
                marginRight: '4ch'
            },
            '& .fees': {
                color: theme.colors.base,
                fontSize: '.75rem',
                fontWeight: 600
            }
        }
    })
);

export function PriceCard() {
    const classes = useStyles();
    const {
        offerBasedOnRate,
        apiFetchState: { loading },
        buyCurrency,
        sellCurrency
    } = useSelector((state: RootState) => state.payments);

    const { destination_currency, total_in_target_with_charges } = offerBasedOnRate || {};
    const getFormattedCurrency = () => {
        if (offerBasedOnRate && isAllValueTruthy(destination_currency, total_in_target_with_charges)) {
            const totalPriceToPay = formatCurrency({
                currency: offerBasedOnRate.destination_currency ?? 'NGN',
                amount: offerBasedOnRate.total_in_target_with_charges ?? 0,
                countryCode: 'NG'
            });

            return {
                rate: offerBasedOnRate?.exchange_rate_info?.base_rate,
                totalPriceToPay,
                feesTotal: offerBasedOnRate?.fees_info?.total
            };
        }
        return {};
    };

    const { rate, totalPriceToPay, feesTotal } = getFormattedCurrency();

    return (
        <div className={classes.root}>
            <Card classes={{ root: classes.card }}>
                {loading ? (
                    <ThreeDots variantColor={'base'} loadingText={'fetching rates'} />
                ) : (
                    offerBasedOnRate && (
                        <div className={classes.prices}>
                            <h5 className={'price'}>
                                <span className={'heading'}>{offerBasedOnRate ? 'Total amount to pay in Naira' : 'Go back to get rates'}</span>
                                <br />
                                {totalPriceToPay}
                            </h5>
                            <Stack direction={'row'} sx={{ marginTop: '-50px' }}>
                                {' '}
                                <p className={'rate'}>
                                    {' '}
                                    Rate : 1 {buyCurrency} = {sellCurrency} {rate}
                                </p>
                                <p className={'fees'}> Our fees: {feesTotal}</p>
                            </Stack>
                        </div>
                    )
                )}
                {offerBasedOnRate && (
                    <Stack direction={'row'} className={classes.moreInfo}>
                        <InfoIcon color={'info'} />
                        <Typography className={classes.paragraph} align={'justify'}>
                            {' '}
                            {`Please be aware that this payment option is subject to limits imposed by the Central Bank of Nigeria on how much each payer can send to pay school fees abroad. Payment will require additional documentation to be filled out by the payer.  We recommend providing the Authorization Letter issued with the payment instructions along with it. 

Due to currency controls implemented in Nigeria, we advise the payer to take into consideration the total amount available by banks on a daily basis whenever preparing to send funds abroad with specific due dates. .
                                `}
                        </Typography>
                    </Stack>
                )}
            </Card>
        </div>
    );
}
