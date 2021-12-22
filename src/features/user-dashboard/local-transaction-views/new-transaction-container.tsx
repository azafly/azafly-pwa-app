import { Box, Button } from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Stack, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { africa, otherCountries } from 'mocks/payment';
import { ConversionCard } from './conversion-card';
import { ConversionIcon } from './conversion-icon';
import { Dispatch, RootState } from 'app/store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            maxWidth: 900,
            margin: 'auto'
        },
        new_transaction_container: {
            maxWidth: 900,
            margin: 'auto',
            marginTop: '3vh',
            [theme.breakpoints.up('xl')]: { maxWidth: 1200 }
        },
        convert: {
            [theme.breakpoints.up('md')]: {
                width: '120%'
            }
        },
        cta_button: {
            textTransform: 'capitalize',
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                fontSize: '0.8rem'
            }
        }
    })
);

export const NewTransactionContainer = () => {
    const [amount, setAmount] = useState(0);
    const { buyAmount, buyCurrency, rates, sellCurrencyTotalToPay } = useSelector((state: RootState) => state.localPayments);
    const dispatch = useDispatch<Dispatch>();

    const isDesktop = useMediaQuery('(min-width:800px)');
    const isMobile = useMediaQuery('(max-width:450px)');

    const handleBuyAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const amount = !e.target.value ? 0 : parseInt(e.target.value);
        // set limit from server imposed limit
        const LIMIT = 10000;
        const limitAmount = amount > LIMIT ? LIMIT : amount;
        setAmount(amount);
        dispatch.localPayments.setBuyAmount(limitAmount);
        if (rates && buyCurrency) {
        }
        dispatch.localPayments.setTotalToPayInSellCurrency(null);
    };

    const classes = useStyles();
    const direction = isDesktop ? 'row' : 'column';
    const buttonAlignment = isMobile ? 'column' : 'row';

    const handleCTAClick = (name: 'card' | 'direct') => {
        name === 'card' ? dispatch.dashboard.setCurrentDashboardTab('cards') : dispatch.dashboard.setCurrentDashboardTab('payment');
    };

    return (
        <Box className={classes.container}>
            <Stack direction={direction} alignItems={'center'} className={classes.new_transaction_container}>
                {' '}
                <ConversionCard
                    amount={amount > 0 ? amount : buyAmount}
                    info={'I need to pay'}
                    handleAmountChange={handleBuyAmountChange}
                    options={otherCountries}
                />
                <ConversionIcon />
                <ConversionCard amount={sellCurrencyTotalToPay} info={'Total amount in Naira'} options={africa} disabled={true} />
            </Stack>
            <Stack direction={buttonAlignment} justifyContent={'center'} m={3} spacing={2}>
                <Button variant={'contained'} color={'primary'} className={classes.cta_button} onClick={() => handleCTAClick('card')}>
                    Pay with Virtual Card
                </Button>
                <Button
                    component={Link}
                    variant={'outlined'}
                    color={'secondary'}
                    className={classes.cta_button}
                    to={'/payment'}
                    onClick={() => handleCTAClick('direct')}
                >
                    Pay Directly to Institution
                </Button>
            </Stack>
        </Box>
    );
};
