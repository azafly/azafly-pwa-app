import { createStyles, Grid, Input, makeStyles, Theme, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';

import { CurrencyToggle, CurrencyListParams } from './currency-toggle';
import { RootState } from 'app/store';
import { ThreeDots } from 'components/css-loaders/three-dots';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        new_transaction_container: {
            background: '#fafafa',
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)',
            border: '1px solid #DCDCDC',
            padding: 20,
            borderRadius: 8,
            margin: 'auto',
            flexGrow: 1,
            maxWidth: 600
        },
        info: {
            fontFamily: 'Nunito',
            fontSize: '0.9rem',
            fontWeight: 200
        },
        amount: {
            fontFamily: 'Nunito',
            fontWeight: 900,
            fontSize: '2em'
        }
    })
);

interface ConversionCardProps {
    info: string;
    amount: number;
    handleAmountChange?: (e: any) => void;
    disabled?: boolean;
    options: CurrencyListParams[];
    disableLoading?: boolean;
}

export const ConversionCard = ({ amount, info, handleAmountChange, disabled = false, options, disableLoading = true }: ConversionCardProps) => {
    const classes = useStyles();
    const {
        apiFetchState: { loading }
    } = useSelector((state: RootState) => state.dashboard);

    return (
        <Grid xs={12} md={5} className={classes.new_transaction_container}>
            <Typography gutterBottom className={classes.info}>
                {info}
            </Typography>
            <Stack direction={'row'}>
                {disableLoading ? (
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
                ) : loading ? (
                    <ThreeDots variantColor={'base'} />
                ) : (
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
                )}

                <CurrencyToggle options={options} />
            </Stack>
        </Grid>
    );
};
