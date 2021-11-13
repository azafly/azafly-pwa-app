import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';

const useStyles = makeStyles(() =>
    createStyles({
        credit_card__container: {
            padding: 10,
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)'
        },
        action: {
            fontSize: 14,
            fontWeight: 700,
            textTransform: 'capitalize',
            color: '#4990A4'
        },
        typography: {
            fontSize: '1.1rem',
            fontWeight: 700,
            fontFamily: 'Nunito'
        },
        cardNumber: {
            fontSize: '1.3rem'
        },
        cvv: {},
        expiryDate: {}
    })
);

interface CreditCardProps {
    handleOpen: () => void;
}

export const CreditCard = ({ handleOpen }: CreditCardProps) => {
    const classes = useStyles();
    return (
        <Box className={classes.credit_card__container}>
            <Card>
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
                            <Typography align={'center'}>{'Valid Thru'}</Typography>
                            <Button size='small' className={classes.action}>
                                08/25
                            </Button>
                        </Stack>
                        <Stack>
                            <Typography align={'center'}>{'CVV'}</Typography>
                            <Button size='small' className={classes.action}>
                                857
                            </Button>
                        </Stack>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
};
