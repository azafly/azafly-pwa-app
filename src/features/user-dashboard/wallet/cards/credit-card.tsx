import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Stack } from '@mui/material';

const useStyles = makeStyles(() =>
    createStyles({
        credit_card__container: {
            padding: 10,
            width: 350,
            border: '.01px solid grey'
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
            fontSize: '1.3rem',
            paddingTop: 15,
            color: 'white'
        },
        card: {
            background:
                'radial-gradient(circle, rgba(73,149,164,0.6880953064819677) 0%, rgba(13,50,77,1) 94%, rgba(255,255,255,1) 100%, rgba(73,149,164,0.6880953064819677) 100%);'
        },
        expiryDate: {}
    })
);

export const CreditCard = () => {
    const classes = useStyles();
    return (
        <div className={classes.credit_card__container}>
            <Card elevation={0} className={classes.card}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography className={classes.typography} gutterBottom>
                            {'Olasunkanmi Ajiboye'}
                        </Typography>
                        <Typography variant='body2' className={classes.typography}>
                            {'₦750,789'}
                        </Typography>
                    </Box>
                    <Typography variant='body2' className={classes.cardNumber} align={'center'}>
                        {'5335 6677 8989 7373'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Stack>
                            <Typography className={classes.action} align={'center'}>
                                {'Valid Thru'}
                            </Typography>
                            <Button size='small' className={classes.action}>
                                08/25
                            </Button>
                        </Stack>
                        <Stack>
                            <Typography className={classes.action} align={'center'}>
                                {'CVV'}
                            </Typography>
                            <Button size='small' className={classes.action}>
                                857
                            </Button>
                        </Stack>
                    </Box>
                </CardActions>
            </Card>
        </div>
    );
};
