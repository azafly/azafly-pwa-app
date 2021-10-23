import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Chip from '@mui/material/Chip';

import { CountrySelect } from './target-country/country-select';
import { CurrencyAmount } from './target-country/currency-amount';
import { Country, NIGERIA, useCountryList } from '../../hooks/use-country-list';
import { usePaymentContext } from '../../context';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            boxShadow: '0 2px 20px 0 rgba(0,0,0,.05) !important',
            padding: 50,

            borderRadius: 8,
            margin: 50,
            maxWidth: 675,
            backgroundColor: '#fff'
        },
        option: {
            fontSize: '1rem',
            fontWeight: 650,
            '& > span': {
                marginRight: 10
            },
            '& .emoji': {
                fontSize: 24
            },
            '& .name': {
                marginRight: 5,
                color: theme.colors.textPrimary,
                fontWeight: 650,
                fontSize: '0.75rem'
            },
            '& .coming-soon': {
                background: 'grey',
                border: '1px solid inherit',
                padding: 5,
                borderRadius: 6,
                marginLeft: 10
            }
        }
    })
);

export function RatesInfo() {
    const classes = useStyles();
    const { popularSourceCountries } = useCountryList();

    const {
        rateInfoProps: { sourceCountry, targetCountry, handleSourceCountryChange },
        paymentError
    } = usePaymentContext();

    const getOptionLabel = (option: Country) => `${option.currency.symbol} ${option.name}(${option.currency.code})`;
    const getOptionDisabled = (option: Country) => option.isComingSoon || option.isNotSupported;

    return (
        <form className={classes.root} noValidate autoComplete='on'>
            <div>
                <Grid container>
                    {paymentError && <Chip color={'error'} label={'paymentError'} sx={{ marginBottom: 3 }} />}
                    <Grid xs={12}>
                        <CountrySelect
                            handleCountryChange={handleSourceCountryChange}
                            classKeys={{ option: classes.option }}
                            options={[NIGERIA, ...popularSourceCountries]}
                            defaultOption={sourceCountry}
                            getOptionLabel={getOptionLabel}
                            getOptionDisabled={getOptionDisabled}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <CurrencyAmount country={targetCountry} />
                    </Grid>
                </Grid>
            </div>
        </form>
    );
}
