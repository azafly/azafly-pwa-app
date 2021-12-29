/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Autocomplete, { AutocompleteClassKey } from '@material-ui/lab/Autocomplete';

import { Country, NIGERIA, useCountryList } from '../../../hooks/use-country-list';
import { Dispatch } from 'app/store';
import { RenderOptions } from './render-option-label';

import { useURLParams } from 'hooks/use-url-params';
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
    options?: Country[];
    defaultOption?: Country;
    getOptionDisabled?: (option: Country) => boolean;
    getOptionLabel?: (option: Country) => string;
    renderOption?: (option: Country) => ReactElement;
};

export const AfricaCountriesSelect = ({ classKeys, options, getOptionLabel, getOptionDisabled, renderOption }: CountrySelectProps) => {
    const [defaultOption, setDefaultOption] = useState<Country | null>(null);
    const classes = useStyles();
    const classOverrides: typeof classKeys = {
        option: classes.option,
        ...classKeys
    };

    const { popularSourceCountries, countryCodeLookup } = useCountryList();

    const urlParamSendFrom = useURLParams('send_from');
    // const urlParamSendTo = useURLParams('send_to');
    // const defaultParams = 'NG';

    const optionRenderer = (optionData: Country) => (renderOption ? renderOption : <RenderOptions option={optionData} />);
    const optionLabel = getOptionLabel ? getOptionLabel : (option: Country) => `${option.emoji ?? ''} ${' '}${option.currency.code}`;
    const optionDisabled = getOptionDisabled ? getOptionDisabled : (option: Country) => option.isComingSoon || option.isNotSupported;
    const _options = options ? options : [NIGERIA, ...popularSourceCountries];

    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        if (countryCodeLookup) {
            const sendFrom = countryCodeLookup[urlParamSendFrom ?? 'NG'];
            setDefaultOption(sendFrom ?? NIGERIA);
        }
    }, [countryCodeLookup, urlParamSendFrom]);

    return (
        <div className={classes.root}>
            <Autocomplete
                id='country-select'
                options={_options}
                loading={true}
                classes={classOverrides}
                onChange={(e, value) => {
                    value && dispatch.payment.setRatesInfoSourceCountry(value);
                }}
                value={defaultOption}
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
