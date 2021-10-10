import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, TextField } from '@material-ui/core';

import { Country, useCountryList } from '../../hooks';
import { CountryList } from '../country-form-elements/country-list';
import { CountrySelectToggle } from './country-select-toggle';
import { usePaymentContext } from '../../context';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 500,
            marginBottom: 30,
            marginRight: 20,
            display: 'flex',
            height: '4rem',
            alignItems: 'center',
            padding: '5px 20px',
            justifyContent: 'space-between',
            borderRadius: 8,
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0 0 7px 0 #bac4cf',
            position: 'relative',
            [theme.breakpoints.only('xs')]: {
                width: 270
            }
        },
        input: {
            webkitAppearance: 'none',
            border: 'none',
            height: '100%',
            borderBottom: 'none',
            color: theme.colors.textPrimary,
            fontWeight: 750,
            fontSize: '1rem',
            '& .MuiInput-underline::before': {
                borderBottom: 'none'
            },
            [theme.breakpoints.only('xs')]: {
                fontSize: '0.9rem'
            }
        },
        listbox: {
            width: 500
        },
        autoCompleteRoot: {
            width: 500
        },
        toggle__section: {}
    })
);

interface CurrencyAmountProps {
    country: Country;
}

export function CurrencyAmount({ country }: CurrencyAmountProps) {
    const classes = useStyles();
    const [showCountryList, setShowCountryList] = React.useState(false);

    const { popularTargetCountries } = useCountryList();
    const defaultTargetCountry = popularTargetCountries.filter(({ name }) => name === 'United Kingdom of Great Britain and Northern Ireland')[0];

    const {
        rateInfoProps: { amount, handleSetAmount, handleTargetCountryChange }
    } = usePaymentContext();

    const handleShow = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowCountryList(!showCountryList);
    };

    return (
        <div className={classes.root} onClick={handleShow}>
            <TextField
                id='amount'
                value={amount}
                type='number'
                label={'Amount'}
                className={classes.input}
                onChange={handleSetAmount}
                InputProps={{
                    className: classes.input
                }}
            />
            <div className={classes.toggle__section}>
                <CountrySelectToggle selectedCountry={country ?? defaultTargetCountry} />
                {showCountryList && (
                    <CountryList
                        show={showCountryList && !!popularTargetCountries}
                        countryList={popularTargetCountries}
                        handleCountryChange={handleTargetCountryChange}
                    />
                )}
            </div>
        </div>
    );
}
