import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';

import AddIcon from '@mui/icons-material/Add';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

const useStyles = makeStyles(() =>
    createStyles({
        card_container: {
            padding: 10
        },
        action: {
            fontSize: '0.85em',
            fontWeight: 700,
            textTransform: 'capitalize'
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
        <Card elevation={1} className={classes.card_container}>
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
                        Fund Account
                    </Button>
                    <Button endIcon={<FlipCameraAndroidIcon />} size='small' className={classes.action}>
                        convert
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
}
