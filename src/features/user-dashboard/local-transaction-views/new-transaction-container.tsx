import { Button } from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Stack, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { africa, otherCountries } from 'mocks/payment';
import { ConversionCard } from './conversion-card';
import { ConversionIcon } from './conversion-icon';
import { Dispatch, RootState } from 'app/store';
import { TOUR_DASHBOARD_LOCAL } from '../tours';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            maxWidth: 900,
            margin: 'auto',
            [theme.breakpoints.up('xl')]: { maxWidth: 1200 }
        },
        new_transaction_container: {
            maxWidth: 900,
            margin: 'auto',
            marginTop: '3vh',
            [theme.breakpoints.up('xl')]: { maxWidth: 1200 }
        },
        cta_button: {
            textTransform: 'capitalize',
            textAlign: 'center',
            minWidth: '25ch'
        }
    })
);

export const NewTransactionContainer = () => {
    const [amount, setAmount] = useState(0);
    const {
        payments: { buyAmount, buyCurrency, rates, sellCurrency, sellCurrencyTotalToPay },
        dashboard: { currentVirtualCard },
        VIRTUAL_CARDS: { userCards }
    } = useSelector(({ payments, dashboard, VIRTUAL_CARDS }: RootState) => ({ payments, dashboard, VIRTUAL_CARDS }));
    const dispatch = useDispatch<Dispatch>();
    const browserHistory = useHistory();
    const isDesktop = useMediaQuery('(min-width:800px)');
    const isMobile = useMediaQuery('(max-width:450px)');

    const handleBuyAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    const classes = useStyles();
    const direction = isDesktop ? 'row' : 'column';
    const buttonAlignment = isMobile ? 'column' : 'row';

    const handleCTAClick = (name: 'card' | 'direct') => {
        if (name === 'card') {
            dispatch.dashboard.setCurrentDashboardTab('cards');
            dispatch.dashboard.setCurrentCardIdentifier({ currency: currentVirtualCard?.currency ?? 'EUR', openTopUpModal: true });
            dispatch.VIRTUAL_CARDS.setCurrentCard(userCards[currentVirtualCard?.currency ?? 'EUR']);
            dispatch.VIRTUAL_CARDS.setCardTopUpReferer('dashboard');
        } else {
            dispatch.payments.setInitialOffer({ source_currency: buyCurrency, source_amount: buyAmount, target_currency: sellCurrency });
            browserHistory.push({
                pathname: '/payment',
                state: {
                    refer: 'local-DIRECT',
                    buyCurrency,
                    sellCurrency,
                    amount,
                    step: 1
                }
            });
        }
    };

    return (
        <>
            <Stack direction={direction} alignItems={'center'} className={classes.new_transaction_container}>
                {' '}
                <ConversionCard
                    amount={amount > 0 ? amount : buyAmount}
                    info={'I need to pay'}
                    handleAmountChange={handleBuyAmountChange}
                    options={otherCountries}
                    tourClassName={TOUR_DASHBOARD_LOCAL.SEND_FROM}
                    initialCurrency={buyCurrency}
                />
                <ConversionIcon />
                <ConversionCard
                    amount={sellCurrencyTotalToPay}
                    info={`Total amount in ${sellCurrency}`}
                    options={africa}
                    disabled={true}
                    tourClassName={TOUR_DASHBOARD_LOCAL.SEND_TO}
                    initialCurrency={sellCurrency}
                />
            </Stack>
            <Stack direction={buttonAlignment} justifyContent={'center'} m={2} spacing={2}>
                <Button
                    variant={'contained'}
                    color={'primary'}
                    className={`${classes.cta_button} ${TOUR_DASHBOARD_LOCAL.PAY_WITH_CARD}`}
                    onClick={() => handleCTAClick('card')}
                >
                    Fund &nbsp; <strong>{buyCurrency} </strong>&nbsp; Virtual Card
                </Button>
                <Button
                    variant={'outlined'}
                    color={'secondary'}
                    className={`${classes.cta_button} ${TOUR_DASHBOARD_LOCAL.PAY_DIRECT}`}
                    onClick={() => handleCTAClick('direct')}
                >
                    Pay Directly to Institution
                </Button>
            </Stack>
        </>
    );
};
