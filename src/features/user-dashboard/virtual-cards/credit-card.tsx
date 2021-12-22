import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme, lighten } from '@material-ui/core/styles';
import { Stack } from '@mui/material';
import { memo, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { formatCurrency } from 'libs';
import { Logo2SvgComponent } from 'components/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        credit_card__container: {
            padding: 10,
            width: 350,
            maxWidth: 450,
            position: 'relative',
            [theme.breakpoints.only('xs')]: {
                width: '100%',
                margin: 'auto'
            }
        },
        action: {
            fontSize: 14,
            fontWeight: 700,
            textTransform: 'capitalize',
            color: 'white'
        },
        typography: {
            fontSize: '1.1rem',
            fontWeight: 700,
            fontFamily: 'Nunito',
            color: 'white'
        },
        cardNumber: {
            fontSize: '1.1rem',
            paddingTop: 15,
            color: 'white'
        },
        card: {
            borderRadius: 12,
            backgroundColor: lighten(theme.colors.base, 0.3)
        },
        visible: {
            position: 'absolute',
            top: 0,
            left: 0,
            cursor: 'pointer'
        }
    })
);

interface VirtualCardProps {
    amount: number;
    currency: string;
    cardNumber: string;
    last4digits: string;
    expiry: string;
    cvv: string;
    countryCode: string;
}

export const CreditCard = memo(function CreditCard({ amount, currency, cardNumber, countryCode, last4digits, expiry, cvv }: VirtualCardProps) {
    const classes = useStyles();
    const [show, setShow] = useState(false);

    const balance = formatCurrency({
        currency,
        amount,
        countryCode
    });
    return (
        <div className={classes.credit_card__container}>
            <Card elevation={3} className={classes.card}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='body2' className={classes.typography}>
                            {balance}
                        </Typography>
                        <Box sx={{ marginTop: -5 }}>
                            <Logo2SvgComponent height={30} />
                        </Box>
                    </Box>
                    <Typography variant='h5' className={classes.cardNumber} align={'center'}>
                        {show ? cardNumber : '**** **** ****'} {last4digits}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Stack>
                            <Typography className={classes.action} align={'center'}>
                                {'Valid Thru'}
                            </Typography>
                            <Button size='small' className={classes.action}>
                                {show ? expiry : '**/**'}
                            </Button>
                        </Stack>
                        <Stack>
                            <Typography className={classes.action} align={'center'}>
                                {'CVV'}
                            </Typography>
                            <Button size='small' className={classes.action}>
                                {show ? cvv : '***'}
                            </Button>
                        </Stack>
                    </Box>
                </CardActions>
            </Card>
            <VisibilityIcon className={classes.visible} onClick={() => setShow(!show)} />
        </div>
    );
});
