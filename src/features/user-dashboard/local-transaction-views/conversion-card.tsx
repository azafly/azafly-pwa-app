import { createStyles, Input, makeStyles, Theme, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';

import { CurrencyToggle, CurrencyListParams } from './currency-toggle';
import { RootState } from 'app/store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        new_transaction_container: {
            borderRadius: 4,
            margin: 'auto',
            flexGrow: 1,
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)',
            border: '1px solid #DCDCDC',
            [theme.breakpoints.up('md')]: {
                width: '120%'
            },
            [theme.breakpoints.down('sm')]: {
                width: '90vw'
            }
        },
        amountInfo: {
            padding: 16,
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
}

export const ConversionCard = ({ amount, info, handleAmountChange, disabled = false, options }: ConversionCardProps) => {
    const classes = useStyles();
    const {} = useSelector((state: RootState) => state.dashboard);

    return (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignContent={'center'}
            alignItems={'center'}
            className={classes.new_transaction_container}
        >
            <Stack className={classes.amountInfo}>
                <Typography className={classes.info}>{info}</Typography>

                <Input
                    type={'text'}
                    id='amount'
                    placeholder='0.00'
                    name={'amount'}
                    value={amount ?? 0}
                    className={classes.amount}
                    defaultValue={'100'}
                    disableUnderline
                    disabled={disabled}
                    onChange={handleAmountChange}
                />
            </Stack>
            <CurrencyToggle options={options} />
        </Stack>
    );
};
