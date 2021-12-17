import { ChangeEvent, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@mui/material';
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
            [theme.breakpoints.only('xs')]: { marginTop: '12vh' }
        },
        convert: {
            [theme.breakpoints.up('md')]: {
                width: '120%'
            }
        }
    })
);

export const NewTransactionContainer = () => {
    const [amount, setAmount] = useState(0);
    const { buyCurrency, convertedAmount, rate } = useSelector((state: RootState) => state.dashboard);
    const dispatch = useDispatch<Dispatch>();

    const handleBuyAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const amount = !e.target.value ? 0.0 : parseInt(e.target.value);
        const limitAmount = amount >= 10000 || buyCurrency !== 'NGN' ? 10000 : amount;
        setAmount(amount);
        dispatch.dashboard.setBuyAmount(limitAmount);
        dispatch.dashboard.setConvertedAmount(amount * rate);
    };

    const classes = useStyles();
    return (
        <Grid container className={classes.new_transaction_container} alignItems={'center'}>
            {' '}
            <ConversionCard
                amount={amount}
                info={'I need to pay'}
                handleAmountChange={handleBuyAmountChange}
                options={otherCountries}
                disableLoading={true}
            />
            <ConversionIcon />
            <ConversionCard amount={convertedAmount} info={'Total amount in Naira'} options={africa} disabled={true} />
        </Grid>
    );
};
