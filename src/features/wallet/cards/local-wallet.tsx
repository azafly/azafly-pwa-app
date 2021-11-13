import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import AddIcon from '@mui/icons-material/Add';
import PaymentsIcon from '@mui/icons-material/Payments';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

const useStyles = makeStyles(() =>
    createStyles({
        credit_card__container: {
            padding: 10,
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)'
        },
        action: {
            fontSize: 14,
            fontWeight: 700,
            textTransform: 'capitalize'
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

export default function LocalWalletCard() {
    const classes = useStyles();
    return (
        <Card className={classes.credit_card__container}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography className={classes.typography} gutterBottom>
                        <span style={{ fontSize: '1.2rem' }}> 🇳🇬 </span> NGN
                    </Typography>
                    <Typography variant='body2' className={classes.typography}>
                        {'₦750,789'}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button endIcon={<AddIcon />} size='small' className={classes.action}>
                        Add money
                    </Button>
                    <Button endIcon={<FlipCameraAndroidIcon />} size='small' className={classes.action}>
                        convert
                    </Button>
                    <Button endIcon={<PaymentsIcon />} size='small' className={classes.action}>
                        Spend
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
}
