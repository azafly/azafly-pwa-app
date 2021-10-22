import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { CountrySelect } from '../target-country/country-select';
import { CurrencyAmount } from '../target-country/currency-amount';
import { Country, NIGERIA, useCountryList } from '../../hooks/use-country-list';
import { usePaymentContext } from '../../context';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginTop: 50,
            '& .MuiTextField-root': {}
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
                fontSize: '1rem'
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
        rateInfoProps: { sourceCountry, targetCountry, handleSourceCountryChange }
    } = usePaymentContext();

    const getOptionLabel = (option: Country) => `${option.currency.symbol} ${option.name}(${option.currency.code})`;
    const getOptionDisabled = (option: Country) => option.isComingSoon || option.isNotSupported;

    return (
        <form className={classes.root} noValidate autoComplete='on'>
            <div>
                <Grid container>
                    <Grid xs={12} md={6}>
                        <CountrySelect
                            handleCountryChange={handleSourceCountryChange}
                            classKeys={{ option: classes.option }}
                            options={[NIGERIA, ...popularSourceCountries]}
                            defaultOption={sourceCountry}
                            getOptionLabel={getOptionLabel}
                            getOptionDisabled={getOptionDisabled}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <CurrencyAmount country={targetCountry} />
                    </Grid>
                </Grid>
            </div>
        </form>
    );
}
