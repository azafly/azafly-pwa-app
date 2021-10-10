/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Autocomplete, { AutocompleteClassKey } from '@material-ui/lab/Autocomplete';
import { ReactElement } from 'react';

import { RenderOptions } from '../country-form-elements/render-option-label';
import { Country } from '../../hooks';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: 500,
        marginBottom: 30,
        marginRight: 20,
        padding: '5px 20px',
        borderRadius: 8,
        height: '4rem',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 0 7px 0 #bac4cf',
        [theme.breakpoints.only('xs')]: {
            width: 270
        },
        '& .MuiInput-underline::before': {
            borderBottom: 'none'
        }
    },
    option: {
        '& > span': {
            marginRight: 10
        },
        '& .emoji': {
            fontSize: '1rem',
            margin: 'auto',
            [theme.breakpoints.only('xs')]: {
                fontSize: '1rem'
            }
        },
        '& .name': {
            marginRight: 5,
            color: theme.colors.textPrimary,
            fontWeight: 450,
            fontSize: '0.8rem',
            margin: 'auto'
        }
    },
    input: {
        color: theme.colors.textPrimary,
        fontWeight: 850,
        fontSize: '0.8rem',
        borderBottom: 'none'
    }
}));

export type CountrySelectProps = {
    handleCountryChange: (event: React.ChangeEvent<unknown>, value: Country) => void;
    classKeys?: {
        [key in AutocompleteClassKey]?: string;
    };
    options: Country[];
    defaultOption: Country;
    getOptionDisabled: (option: Country) => boolean;
    getOptionLabel: (option: Country) => string;
    renderOption?: (option: Country) => ReactElement;
};

export const CountrySelect = ({
    handleCountryChange,
    classKeys,
    options,
    defaultOption,
    getOptionLabel,
    getOptionDisabled,
    renderOption
}: CountrySelectProps) => {
    const classes = useStyles();
    const classOverrides: typeof classKeys = {
        option: classes.option,
        root: classes.root,
        ...classKeys
    };

    const optionRenderer = (optionData: Country) => (renderOption ? renderOption : <RenderOptions option={optionData} />);

    return (
        <Autocomplete
            id='country-select'
            className={`${classKeys?.root}`}
            options={options}
            loading={true}
            classes={classOverrides}
            onChange={() => handleCountryChange}
            defaultValue={defaultOption}
            autoComplete
            getOptionDisabled={option => getOptionDisabled(option)}
            getOptionLabel={option => getOptionLabel(option)}
            renderOption={optionData => optionRenderer(optionData)}
            renderInput={params => {
                return (
                    <TextField
                        {...params}
                        label='From'
                        classes={{}}
                        inputProps={{
                            ...params.inputProps,
                            className: classes.input
                        }}
                    />
                );
            }}
        />
    );
};
