import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';

import { Country, useCountryList } from '../../../hooks/use-country-list';
import { Dispatch, RootState } from 'app/store';
import { RenderOptions } from './render-option-label';
import { UK } from 'features/payments/context/constants';

import { CurrencyCode } from 'app/models/payments/mock';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 400,
            marginBottom: 30,
            marginRight: 20,
            display: 'flex',
            height: '4.5rem',
            alignItems: 'center',
            padding: '5px 20px',
            justifyContent: 'space-between',
            borderRadius: 8,
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0 0 7px 0 #bac4cf',
            position: 'relative',
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
        input: {
            color: theme.colors.textPrimary,
            fontWeight: 700,
            marginRight: 20,
            fontSize: '1.1rem',
            borderBottom: 'none',
            '& .MuiInput-underline::before': {
                borderBottom: 'none'
            },
            [theme.breakpoints.only('xs')]: {
                fontSize: '1rem'
            }
        },
        listbox: {
            position: 'absolute',
            top: 20,
            right: 0,
            width: 250,
            display: 'flex',
            '& .flag': {
                margin: 'auto',
                marginRight: 2,
                borderRadius: '50%'
            },
            '& .name': {
                margin: 'auto',
                fontSize: '0.8rem'
            },
            '& .currency': {
                margin: 'auto',
                fontSize: '0.8rem'
            },
            '& .coming_soon': {
                background: 'grey',
                fontSize: '0.65rem'
            }
        },
        label: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            fontWeight: 750,
            fontSize: '1.15em'
        },
        autoCompleteRoot: {},
        toggle__section: {
            width: 130,
            margin: 0
        }
    })
);

export function CurrencyAmount() {
    const classes = useStyles();
    const [showCountryList, setShowCountryList] = React.useState(false);
    const [amountValue, setAmountValue] = React.useState(100);
    const [countryValue, setCountryValue] = React.useState<Country | null>(UK);

    const { popularTargetCountries, countryCodeLookup } = useCountryList();
    const {
        auth: { hasuraUser }
    } = useSelector(({ auth }: RootState) => ({ auth }));
    const dispatch = useDispatch<Dispatch>();

    const options = popularTargetCountries?.map(it => ({ ...it, label: it.name }));

    const handleShow = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowCountryList(!showCountryList);
    };

    const handleCurrencyChange = (_: any, country: Country | null) => {
        setCountryValue(country);
        country && dispatch.payments.setBuyCurrency(country.currency.code as CurrencyCode);
    };

    const handleOnChangeAmountValue = ({ target: { value } }: any) => {
        const amount = value ? parseInt(value) : 0;
        setAmountValue(amount);
        dispatch.payments.setBuyAmount(amount);
    };
    const getOptionLabel = (option: Country) => `${option.emoji ?? ''}  ${option.currency.code}`;
    const optionRenderer = (optionData: Country) => <RenderOptions option={optionData} />;

    return (
        <div className={classes.root} onClick={handleShow}>
            <TextField
                id='amount'
                value={amountValue}
                type='number'
                label={'Amount'}
                className={classes.input}
                onChange={handleOnChangeAmountValue}
                InputProps={{
                    className: classes.input
                }}
            />
            <div>
                <Autocomplete
                    onChange={handleCurrencyChange}
                    className={classes.toggle__section}
                    disablePortal
                    id='currency'
                    loading={!hasuraUser || !countryCodeLookup}
                    value={countryValue || UK}
                    options={options}
                    classes={{
                        paper: classes.listbox,
                        root: classes.autoCompleteRoot
                    }}
                    autoComplete
                    getOptionLabel={option => getOptionLabel(option)}
                    renderOption={optionData => optionRenderer(optionData)}
                    renderInput={params => {
                        return (
                            <TextField
                                {...params}
                                label='Send to'
                                classes={{
                                    root: classes.autoCompleteRoot
                                }}
                                inputProps={{
                                    ...params.inputProps,
                                    className: classes.label
                                }}
                            />
                        );
                    }}
                />
            </div>
        </div>
    );
}
