import { Box, Grid } from '@material-ui/core';
import { Chip, Zoom } from '@mui/material';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';

import { africa, otherCountries } from 'mocks/payment';
import { ChangeEvent } from 'react';
import { CurrencyAmount } from './currency-amount';
import { Dispatch, RootState } from 'app/store';
import { useURLParams } from 'hooks/use-url-params';
import { CurrencyCode } from 'app/models/payments';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            padding: 50,
            borderRadius: 8,
            maxWidth: 675,
            [theme.breakpoints.only('xs')]: {
                width: '100%',
                margin: '40px 0px 10px',
                backgroundColor: 'transparent',
                padding: 0
            }
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
                fontSize: '0.75rem'
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
    const [amount, setAmount] = useState(0);

    const { apiFetchState, buyAmount, buyCurrency, rates, sellCurrency, sellCurrencyTotalToPay, offerBasedOnRate } = useSelector(
        (state: RootState) => state.payments
    );

    const dispatch = useDispatch<Dispatch>();

    const handleSellAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const amountValue = !e.target.value ? 0 : parseInt(e.target.value);
        // set limit from server imposed limit
        const LIMIT = 10000;
        const limitAmount = amount > LIMIT ? LIMIT : amountValue;
        setAmount(amountValue);
        dispatch.payments.setBuyAmount(limitAmount);
        if (rates && buyCurrency) {
            dispatch.payments.setTotalToPayInSellCurrencyAsync(null);
        }
    };

    useEffect(() => {
        if (rates && rates[sellCurrency] && rates[sellCurrency][buyCurrency]) {
            dispatch.payments.setSellCurrencyTotalToPay(rates[sellCurrency][buyCurrency]['rate'] * buyAmount);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const urlParamBuyCurrency = useURLParams('buy') as CurrencyCode;
    const urlParamSellCurrency = useURLParams('sell') as CurrencyCode;
    const urlParamAmount = useURLParams('amount');

    useEffect(() => {
        if (urlParamBuyCurrency && urlParamSellCurrency && urlParamAmount) {
            const initialAmount = Number(urlParamAmount) || buyAmount || 100;
            setAmount(initialAmount);
            dispatch.payments.setBuyCurrency(urlParamBuyCurrency);
            dispatch.payments.setSellCurrency(urlParamSellCurrency);
            dispatch.payments.setSellCurrencyTotalToPay(
                offerBasedOnRate?.total_in_target_with_charges ?? rates[urlParamSellCurrency][urlParamBuyCurrency]['rate'] * Number(urlParamAmount)
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (buyAmount <= 0 || !buyCurrency || (!sellCurrency && offerBasedOnRate)) {
            dispatch.payments.DIRECT_setCanGoNext(false);
        } else {
            dispatch.payments.DIRECT_setCanGoNext(true);
        }
    }, [buyAmount, buyCurrency, dispatch.payments, sellCurrency, offerBasedOnRate]);

    const handleResetError = () => dispatch.payments.setApiFetchState({ loading: false });
    const initialBuyCurrency = useMemo(() => urlParamBuyCurrency || buyCurrency || 'GBP', [buyCurrency, urlParamBuyCurrency]);
    const initialSellCurrency = useMemo(() => urlParamSellCurrency || sellCurrency || 'NGN', [sellCurrency, urlParamSellCurrency]);

    return (
        <form className={classes.root} noValidate autoComplete='on'>
            <div>
                <Grid container spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        {apiFetchState?.result === 'error' && (
                            <Zoom in={true} mountOnEnter unmountOnExit appear timeout={500}>
                                <Chip
                                    color={'error'}
                                    label={`Sorry 😢 . We couldn't get offer this time.`}
                                    size={'medium'}
                                    sx={{ marginBottom: 3 }}
                                    variant={'outlined'}
                                    onDelete={handleResetError}
                                />
                            </Zoom>
                        )}
                    </Box>
                    <Grid item xs={12}>
                        <CurrencyAmount
                            amount={amount > 0 ? amount : buyAmount}
                            info={`I need to pay`}
                            handleAmountChange={handleSellAmountChange}
                            options={otherCountries}
                            initialCurrency={initialBuyCurrency}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CurrencyAmount
                            amount={Number(offerBasedOnRate?.total_in_target_with_charges?.toFixed(2)) ?? sellCurrencyTotalToPay}
                            info={`Total amount in ${sellCurrency}`}
                            options={africa}
                            initialCurrency={initialSellCurrency}
                        />
                    </Grid>
                </Grid>
            </div>
        </form>
    );
}
