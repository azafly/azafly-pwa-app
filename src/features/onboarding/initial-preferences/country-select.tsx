/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete, { AutocompleteClassKey } from '@material-ui/lab/Autocomplete';

import { Country, NIGERIA } from 'features/payments/hooks/use-country-list';
import { RenderOptions } from 'features/payments/forms/rates-info/source-country/render-option-label';
import { Dispatch, RootState } from 'app/store';
import { UK } from 'features/payments/context/constants';
import { useEffect } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: 400,
        marginBottom: 30,
        marginRight: 20,
        padding: '10px 20px',
        borderRadius: 8,
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
    handleCountryChange: (value: Country) => void;
    classKeys?: {
        [key in AutocompleteClassKey]?: string;
    };
    options?: Country[];
    defaultOption?: Country;
    getOptionDisabled?: (option: Country) => boolean;
    getOptionLabel?: (option: Country) => string;
    renderOption?: (option: Country) => ReactElement;
    optionVariant?: 'local' | 'foreign';
};

export const CountrySelect = ({
    handleCountryChange,
    classKeys,
    defaultOption,
    getOptionLabel,
    getOptionDisabled,
    renderOption,
    optionVariant = 'local'
}: CountrySelectProps) => {
    const classes = useStyles();
    const classOverrides: typeof classKeys = {
        option: classes.option,
        ...classKeys
    };

    const { popularSourceCountries, formattedCountries } = useSelector((state: RootState) => state.onboarding.countryList);

    const optionRenderer = (optionData: Country) => (renderOption ? renderOption : <RenderOptions option={optionData} />);
    const optionLabel = getOptionLabel ? getOptionLabel : (option: Country) => `${option.name}`;
    const optionDisabled = getOptionDisabled ? getOptionDisabled : (option: Country) => option.isComingSoon || option.isNotSupported;
    const _options = optionVariant === 'local' ? [NIGERIA, ...popularSourceCountries] : formattedCountries;
    const _defaultOption = defaultOption ? defaultOption : NIGERIA;
    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        dispatch.onboarding.fetchCountryList();
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <Autocomplete
                id='country-select'
                options={_options}
                loading={true}
                classes={classOverrides}
                onChange={(_, value, reason) => {
                    reason === 'select-option' && handleCountryChange(value ?? UK);
                }}
                defaultValue={_defaultOption}
                autoComplete
                getOptionDisabled={option => optionDisabled(option)}
                getOptionLabel={option => optionLabel(option)}
                renderOption={optionData => optionRenderer(optionData)}
                renderInput={params => {
                    return (
                        <TextField
                            {...params}
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
