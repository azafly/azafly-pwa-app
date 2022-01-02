import { Box, Card, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import { formatCurrency } from 'libs';
import { isAllValueTruthy } from 'libs/index';
import { RootState } from 'app/store';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 675,
            borderRadius: 4,
            margin: '10px 0px',
            backgroundColor: 'white',
            border: '1px solid #DCDCDC',
            boxShadow: '0 2px 20px rgb(212 216 232 / 52%)',
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
    const {
        offerBasedOnRate,
        apiFetchState: { loading }
    } = useSelector((state: RootState) => state.payments);

    const { destination_currency, total_in_target_with_charges } = offerBasedOnRate || {};
    const getFormattedCurrency = () => {
        if (offerBasedOnRate && isAllValueTruthy(destination_currency, total_in_target_with_charges)) {
            return formatCurrency({
                currency: offerBasedOnRate.destination_currency ?? 'NGN',
                amount: offerBasedOnRate.total_in_target_with_charges ?? 0,
                countryCode: 'NG'
            });
        }
    };

    return (
        <div className={classes.root}>
            <Card elevation={0} className={classes.card}>
                {loading ? (
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
