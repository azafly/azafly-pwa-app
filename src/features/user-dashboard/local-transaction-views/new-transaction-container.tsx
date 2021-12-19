import { Button } from '@material-ui/core';
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
        new_transaction_container: {
            maxWidth: 900,
            margin: 'auto',
            marginTop: '3vh',
            [theme.breakpoints.up('xl')]: { maxWidth: 1200 },
            [theme.breakpoints.only('xs')]: { marginTop: '15vh' }
        },
        convert: {
            [theme.breakpoints.up('md')]: {
                width: '120%'
            }
        },
        cta_button: {
            textTransform: 'capitalize'
        }
    })
);

export const NewTransactionContainer = () => {
    const [amount, setAmount] = useState(0);
    const { buyAmount, buyCurrency, convertedAmount, rate } = useSelector((state: RootState) => state.dashboard);
    const dispatch = useDispatch<Dispatch>();

    const isDesktop = useMediaQuery('(min-width:800px)');
    const isMobile = useMediaQuery('(max-width:400px)');

    const handleBuyAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const amount = !e.target.value ? 0 : parseInt(e.target.value);
        const limitAmount = amount > 10000 && buyCurrency !== 'NGN' ? 10000 : amount;
        setAmount(limitAmount);
        dispatch.dashboard.setBuyAmount(limitAmount);
        dispatch.dashboard.setConvertedAmount(limitAmount * rate);
    };

    const classes = useStyles();
    const direction = isDesktop ? 'row' : 'column';
    const buttonAlignment = isMobile ? 'column' : 'row';
    // const formattedBuyAmount = useMemo(
    //     () => (amount > 0 ? formatCurrency({ amount, currency: buyCurrency, countryCode: 'DE' }) : `${buyAmount}`),
    //     [amount, buyAmount, buyCurrency]
    // );

    // const formattedSellAmount = useMemo(
    //     () => formatCurrency({ amount: convertedAmount, currency: sellCurrency, countryCode: 'NG' }),
    //     [convertedAmount, sellCurrency]
    // );

    return (
        <>
            <Stack direction={direction} alignItems={'center'} className={classes.new_transaction_container}>
                {' '}
                <ConversionCard
                    amount={amount > 0 ? amount : buyAmount}
                    info={'I need to pay'}
                    handleAmountChange={handleBuyAmountChange}
                    options={otherCountries}
                />
                <ConversionIcon />
                <ConversionCard amount={convertedAmount} info={'Total amount in Naira'} options={africa} disabled={true} />
            </Stack>
            <Stack direction={buttonAlignment} justifyContent={'center'} m={3} spacing={2}>
                <Button variant={'contained'} color={'primary'} className={classes.cta_button}>
                    Pay with Virtual Card
                </Button>
                <Button component={Link} variant={'outlined'} color={'secondary'} className={classes.cta_button} to={'/payment'}>
                    Pay Directly to Institution
                </Button>
            </Stack>
        </>
    );
};
