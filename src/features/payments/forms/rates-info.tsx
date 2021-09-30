import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { CountrySelect } from './country-form-elements/country-select';
import { CurrencyAmount } from './country-form-elements/currency-amount';
import { Country, NIGERIA, useCountryList } from './../hooks';

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
    const [country, setCountry] = React.useState<Country>(NIGERIA);
    const { popularSourceCountries } = useCountryList();

    const handleCountryChange = (_: React.ChangeEvent<unknown>, value: Country) => {
        setCountry(value);
    };

    const getOptionLabel = (option: Country) => `${option.currency.symbol} ${option.name}(${option.currency.code})`;
    const getOptionDisabled = (option: Country) => option.isComingSoon || option.isNotSupported;

    return (
        <form className={classes.root} noValidate autoComplete='on'>
            <div>
                <Grid container>
                    <Grid xs={12} md={6}>
                        <CountrySelect
                            handleCountryChange={handleCountryChange}
                            classKeys={{ option: classes.option }}
                            options={[NIGERIA, ...popularSourceCountries]}
                            defaultOption={NIGERIA}
                            getOptionLabel={getOptionLabel}
                            getOptionDisabled={getOptionDisabled}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <CurrencyAmount country={country} handleCountryChange={handleCountryChange} />
                    </Grid>
                </Grid>
            </div>
        </form>
    );
}
