import { Box, Typography } from '@mui/material';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { formatCurrency } from 'utils';
import { GuaranteeTag } from './guarantee-tag';
import { usePaymentContext } from '../../context';
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 675,
            boxShadow: '0 2px 20px 0 rgba(0,0,0,.05) !important',
            padding: 50,
            borderRadius: 4,
            margin: 50,
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
            boxShadow: '0 0 7px 0 #bac4cf',
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
        initialOffer,
        rateInfoProps: { sourceCountry },
        isLoading
    } = usePaymentContext();

    const formattedOffer = formatCurrency({
        currency: sourceCountry.currency.code,
        amount: initialOffer?.total_in_target_with_charges ?? 0,
        countryCode: sourceCountry.code
    });

    return (
        <div className={classes.root}>
            <GuaranteeTag isLoading={isLoading} />
            <div className={classes.card}>
                <div>{initialOffer && <h5 className={classes.price}> {formattedOffer}</h5>}</div>
                <Box sx={{ display: 'flex' }}>
                    <InfoIcon color={'info'} />
                    <Typography paragraph className={'paragraph'} sx={{ fontSize: '0.7rem', padding: '0px 10px' }} align={'justify'}>
                        {' '}
                        {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                                dummy text ever since the 1500s.
                                `}
                    </Typography>
                </Box>
            </div>
        </div>
    );
}
