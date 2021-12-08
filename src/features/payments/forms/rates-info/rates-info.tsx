import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import Chip from '@mui/material/Chip';

import { AfricaCountriesSelect } from './source-country/country-select';
import { CurrencyAmount } from './target-country/currency-amount';
import { Country, NIGERIA, useCountryList } from '../../hooks/use-country-list';
import { usePaymentContext } from '../../context';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            padding: 50,
            borderRadius: 8,
            margin: 50,
            maxWidth: 675,
            [theme.breakpoints.only('xs')]: {
                width: '100%',
                margin: '40px 0px 10px',
                backgroundColor: 'transparent',
                padding: 0
            }
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
        rateInfoProps: { sourceCountry, handleSourceCountryChange },
        paymentError
    } = usePaymentContext();

    const getOptionLabel = (option: Country) => `${option.emoji ?? ''} ${' '}${option.currency.code}`;
    const getOptionDisabled = (option: Country) => option.isComingSoon || option.isNotSupported;

    return (
        <form className={classes.root} noValidate autoComplete='on'>
            <div>
                <Grid container>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        {paymentError && <Chip color={'error'} label={paymentError} size={'medium'} sx={{ marginBottom: 3 }} variant={'outlined'} />}
                    </Box>
                    <Grid item xs={12}>
                        <AfricaCountriesSelect
                            handleCountryChange={handleSourceCountryChange}
                            classKeys={{ option: classes.option }}
                            options={[NIGERIA, ...popularSourceCountries]}
                            defaultOption={sourceCountry}
                            getOptionLabel={getOptionLabel}
                            getOptionDisabled={getOptionDisabled}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CurrencyAmount />
                    </Grid>
                </Grid>
            </div>
        </form>
    );
}
