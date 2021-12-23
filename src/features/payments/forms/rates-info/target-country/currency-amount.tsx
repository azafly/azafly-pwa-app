import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState, useEffect } from 'react';

import { Country, NIGERIA, useCountryList } from '../../../hooks/use-country-list';
import { Dispatch, RootState } from 'app/store';
import { RenderOptions } from './render-option-label';
import { UK } from 'features/payments/context/constants';

import { useURLParams } from 'hooks/use-url-params';

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

    const { popularTargetCountries, countryCodeLookup } = useCountryList();
    const dispatch = useDispatch<Dispatch>();
    const { amount } = useSelector((state: RootState) => state.payment.rateInfo);

    const options = popularTargetCountries?.map(it => ({ ...it, label: it.name }));

    const handleShow = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowCountryList(!showCountryList);
    };

    const getOptionLabel = (option: Country) => `${option.emoji ?? ''}  ${option.currency.code}`;
    const optionRenderer = (optionData: Country) => <RenderOptions option={optionData} />;

    const urlParamSendTo = useURLParams('send_to');
    const [initialValue, setInitialValue] = useState(NIGERIA);

    useEffect(() => {
        urlParamSendTo ? setInitialValue(countryCodeLookup[urlParamSendTo]) : '';

        console.log(initialValue);
    }, [urlParamSendTo, initialValue, countryCodeLookup]);

    console.log(initialValue);

    return (
        <div className={classes.root} onClick={handleShow}>
            <TextField
                id='amount'
                value={amount}
                type='number'
                label={'Amount'}
                className={classes.input}
                onChange={event => dispatch.payment.setRatesInfoAmount(parseInt(event.target.value))}
                InputProps={{
                    className: classes.input
                }}
            />
            <div>
                <Autocomplete
                    onChange={(_, country) => {
                        country && dispatch.payment.setRatesInfoTargetCountry(country);
                    }}
                    className={classes.toggle__section}
                    disablePortal
                    id='currency'
                    defaultValue={initialValue || UK}
                    options={options}
                    classes={{
                        paper: classes.listbox,
                        root: classes.autoCompleteRoot
                    }}
                    loading
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
