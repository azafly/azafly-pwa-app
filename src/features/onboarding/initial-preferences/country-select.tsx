import { makeStyles, Theme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Autocomplete, { AutocompleteClassKey } from '@material-ui/lab/Autocomplete';

import { NIGERIA } from 'types/country-data';
import { Country } from 'types/country-data';
import { RenderOptions } from './render-option-label';
import { RootState } from 'app/store';
import { UK } from 'features/payments/context/constants';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginBottom: 30,
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
    getOptionDisabled?: (option: Country) => boolean;
    getOptionLabel?: (option: Country) => string;
};

export const CountrySelect = ({ handleCountryChange, classKeys, getOptionLabel, getOptionDisabled }: CountrySelectProps) => {
    const classes = useStyles();
    const classOverrides: typeof classKeys = {
        option: classes.option,
        ...classKeys
    };

    const {
        country,
        countryList: { popularSourceCountries, formattedCountries }
    } = useSelector((state: RootState) => state.onboarding);

    const optionRenderer = (optionData: Country) => <RenderOptions option={optionData} />;
    const optionLabel = getOptionLabel ? getOptionLabel : (option: Country) => `${option.name}`;
    const optionDisabled = getOptionDisabled ? getOptionDisabled : (option: Country) => option.isComingSoon || option.isNotSupported;
    const _options = country?.isAfrica ? [NIGERIA, ...popularSourceCountries] : formattedCountries;

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
                defaultValue={country}
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
