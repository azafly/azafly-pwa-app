import { makeStyles, Theme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AutocompleteClassKey } from '@material-ui/lab/Autocomplete'

import { Country } from './use-country-list'
import { useDefaultCountrySelectProps } from './default-country-select-props'

import { ReactElement } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: 350,
        marginRight: 20,
        marginBottom: 30,
        padding: '15px 20px',
        borderRadius: 8,
        boxShadow: '0 0 7px 0 #bac4cf',
        [theme.breakpoints.only('xs')]: {
            width: 270
        }

    },
    option: {
        '& > span': {
            marginRight: 10,

        },
        '& .emoji': {
            fontSize: '1.5rem',
        },
        '& .name': {
            marginRight: 5,
            color: theme.colors.textPrimary,
            fontWeight: 450,
            fontSize: '18px',

        },
    }

}),
);


export type CountrySelectProps = {
    handleCountryChange: (event: any, value: any,) => void
    classKeys?: {
        [key in AutocompleteClassKey]?: string
    }
    options?: Country[]
    defaultOption?: Country
    getOptionDisabled?: (option: Country) => boolean
    getOptionLabel?: (option: Country) => string
    renderOption?: (option: Country) => ReactElement

}

export const CountrySelect = ({ handleCountryChange, classKeys, options, defaultOption }: CountrySelectProps) => {

    const {
        options: defaultOptions,
        defaultOption: option,
        getOptionDisabled: defaultGetOptionDisabled,
        getOptionLabel: defaultGetOptionLabel,
        renderOption: defaultRenderOption
    } = useDefaultCountrySelectProps({ options, defaultOption })

    const classes = useStyles();
    const classOverrides = {
        option: classes.option,
        root: classes.root,
        ...classKeys
    }


    return (
        <Autocomplete
            id="country-select"
            className={`${classKeys?.root}`}
            options={defaultOptions}
            loading={true}
            classes={classOverrides}
            onChange={handleCountryChange}
            defaultValue={option}
            autoHighlight
            autoComplete
            getOptionDisabled={defaultGetOptionDisabled}
            getOptionLabel={defaultGetOptionLabel}
            renderOption={defaultRenderOption}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="From"
                    inputProps={{
                        ...params.inputProps,
                    }}
                />
            )}
        />
    );
}
