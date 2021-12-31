import { createStyles, Input, makeStyles, Theme, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';

import { CurrencyToggle, CurrencyListParams } from '../currency-toggle';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        new_transaction_container: {
            borderRadius: 8,
            margin: 'auto',
            flexGrow: 1,
            border: '1px solid #DCDCDC',
            boxShadow: '0 2px 20px rgb(212 216 232 / 52%)',
            [theme.breakpoints.down('sm')]: {
                width: '98%'
            }
        },
        amountInfo: {
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            padding: 16,
            background: 'white',
            [theme.breakpoints.down('sm')]: {
                padding: 10
            }
        },
        info: {
            fontFamily: 'Nunito',
            fontSize: '0.9rem',
            fontWeight: 200
        },
        amount: {
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: '1.5em',
            [theme.breakpoints.down('sm')]: {
                lineHeight: 0,
                fontSize: '1.2rem'
            }
        }
    })
);

interface ConversionCardProps {
    info: string;
    amount: number;
    handleAmountChange?: (e: any) => void;
    disabled?: boolean;
    options: CurrencyListParams[];
    tourClassName?: string;
    initialCurrency: string;
}

export const ConversionCard = ({
    amount,
    info,
    handleAmountChange,
    disabled = false,
    options,
    tourClassName = '',
    initialCurrency
}: ConversionCardProps) => {
    const classes = useStyles();

    const initialCurrencyValue = options.filter(option => option.currencyCode === initialCurrency)[0];
    return (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignContent={'center'}
            alignItems={'center'}
            className={`${classes.new_transaction_container} ${tourClassName}`}
        >
            <Stack className={classes.amountInfo}>
                <Typography className={classes.info}>{info}</Typography>

                <Input
                    type={'text'}
                    id='amount'
                    placeholder='0.00'
                    name={'amount'}
                    className={classes.amount}
                    defaultValue={amount ?? 0}
                    disableUnderline
                    disabled={disabled}
                    onChange={handleAmountChange}
                />
            </Stack>
            <CurrencyToggle options={options} initialValue={initialCurrencyValue} />
        </Stack>
    );
};
