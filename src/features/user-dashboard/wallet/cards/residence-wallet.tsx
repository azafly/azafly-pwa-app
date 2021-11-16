import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';

import AddIcon from '@mui/icons-material/Add';
import PaymentsIcon from '@mui/icons-material/Payments';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card_container: {
            padding: 10,
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)',
            [theme.breakpoints.only('xs')]: {
                width: '90vw',
                margin: 'auto'
            }
        },
        action: {
            fontSize: '0.95em',
            fontWeight: 700,
            textTransform: 'capitalize',
            [theme.breakpoints.only('sm')]: {
                fontSize: '0.85em'
            }
        },
        typography: {
            fontSize: '1.1rem',
            fontWeight: 700,
            fontFamily: 'Nunito'
        }
    })
);

export default function ResidenceWalletCard() {
    const classes = useStyles();
    return (
        <Card className={classes.card_container}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography className={classes.typography} gutterBottom>
                        <span style={{ fontSize: '1.2rem' }}> 🇬🇧 </span> GBP
                    </Typography>
                    <Typography variant='body2' className={classes.typography}>
                        {'£1,340'}
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
