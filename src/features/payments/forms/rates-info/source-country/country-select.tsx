/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete, { AutocompleteClassKey } from '@material-ui/lab/Autocomplete';

import { Country, NIGERIA, useCountryList } from '../../../hooks/use-country-list';
import { Dispatch, RootState } from 'app/store';
import { RenderOptions } from './render-option-label';

import { useURLParams } from 'hooks/use-url-params';
import { CurrencyCode } from 'app/models/payments';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: 400,
        marginBottom: 30,
        marginRight: 20,
        padding: '5px 20px',
        borderRadius: 8,
        height: '4.5rem',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 0 7px 0 #bac4cf',
        [theme.breakpoints.only('xs')]: {
            width: '100%'
        },
        '& .MuiInput-underline::before': {
            borderBottom: 'none'
        },
        '& .MuiInput-underline::after': {
            borderBottom: 'none'
        }
    },
    option: {
        '& > span': {
            marginRight: 10
        },
        '& .emoji': {
            fontSize: '1.5rem',
            margin: 'auto',
            [theme.breakpoints.only('xs')]: {
                fontSize: '1rem'
            }
        },
        '& .name': {
            marginRight: 5,
            color: theme.colors.textPrimary,
            fontWeight: 450,
            fontSize: '1.1rem',
            margin: 'auto'
        }
    },
    input: {
        color: theme.colors.textPrimary,
        fontWeight: 750,
        fontSize: '1.1rem',
        borderBottom: 'none'
    }
}));

export type CountrySelectProps = {
    classKeys?: {
        [key in AutocompleteClassKey]?: string;
    };
    options: Country[];
    defaultOption?: Country;
    getOptionDisabled?: (option: Country) => boolean;
    getOptionLabel?: (option: Country) => string;
    renderOption?: (option: Country) => ReactElement;
};

export const AfricaCountriesSelect = ({ classKeys, options, getOptionLabel, getOptionDisabled, renderOption, defaultOption }: CountrySelectProps) => {
    const classes = useStyles();
    const [country, setCountry] = useState<Country | null>(null);
    const classOverrides: typeof classKeys = {
        option: classes.option,
        ...classKeys
    };

    const {
        payments: { sellCurrency },
        auth: { hasuraUser }
    } = useSelector(({ auth, payments }: RootState) => ({ auth, payments }));

    const { popularSourceCountries, countryCodeLookup } = useCountryList();
    const dispatch = useDispatch<Dispatch>();

    const urlParamSendFrom = useURLParams('send_from');
    const sendFrom = countryCodeLookup[urlParamSendFrom ?? 'NG'];
    const handleSetCountryValue = (e: any, value: any) => {
        setCountry(e.value);
        value && dispatch.payments.setSellCurrency(value.currency.code as CurrencyCode);
    };

    const optionRenderer = (optionData: Country) => (renderOption ? renderOption : <RenderOptions option={optionData} />);
    const optionLabel = getOptionLabel ? getOptionLabel : (option: Country) => `${option.emoji ?? ''} ${' '}${option.currency.code}`;
    const optionDisabled = getOptionDisabled ? getOptionDisabled : (option: Country) => option.isComingSoon || option.isNotSupported;
    const _options = options ? options : [NIGERIA, ...popularSourceCountries];
    const _defaultOption = urlParamSendFrom ? sendFrom : NIGERIA;

    useEffect(() => {
        const getCountry = (comparator: CurrencyCode) => options.find(it => it.currency.code === comparator);
        if (getCountry(sellCurrency)) {
            const country = getCountry(sellCurrency);
            setCountry(country!);
        } else if (defaultOption) setCountry(_defaultOption);
        else if (hasuraUser && getCountry(hasuraUser.country! as CurrencyCode)) {
            const country = getCountry(hasuraUser.country! as CurrencyCode);
            setCountry(country!);
        } else setCountry(NIGERIA);
    }, [country, sellCurrency, options, defaultOption, _defaultOption, hasuraUser]);

    console.log(country);

    return (
        <div className={classes.root}>
            <Autocomplete
                id='country-select'
                options={_options}
                loading={true}
                classes={classOverrides}
                onChange={handleSetCountryValue}
                value={country}
                autoComplete
                getOptionDisabled={option => optionDisabled(option)}
                getOptionLabel={option => optionLabel(option)}
                renderOption={optionData => optionRenderer(optionData)}
                renderInput={params => {
                    return (
                        <TextField
                            {...params}
                            label='Send From'
                            inputProps={{
                                ...params.inputProps,
                                className: classes.input
                            }}
                        />
                    );
                }}
            />
        </div>
    );
};
