import { Box, Button, Chip, Collapse, Typography } from '@mui/material';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useState } from 'react';

import { GuaranteeTag } from './guarantee-tag';
import InfoIcon from '@mui/icons-material/Info';
import PaymentIcon from '@mui/icons-material/Payment';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 675,
            '& .MuiButton-containedPrimary': {
                backgroundColor: theme.colors.base,
                textTransform: 'capitalize',
                fontWeight: 900,
                fontFamily: `Nunito`,
                height: 40,
                margin: 'auto',
                '&:hover': {
                    opacity: 0.8,
                    backgroundColor: theme.colors.base
                }
            }
        },
        card: {
            marginLeft: '2rem',
            boxShadow: '0 0 7px 0 #bac4cf',
            padding: '0px 50px',
            borderRadius: 7,
            marginBottom: 20,
            marginTop: 10
        },
        price: {
            color: theme.colors.textPrimary,
            fontWeight: 900,
            fontSize: '1.5rem',
            borderBottom: 'none',
            flexGrow: 1
        },
        title: {
            marginTop: 10,
            fontSize: '0.9rem',
            fontWeight: 400,
            textAlign: 'center',
            padding: '40px 30px'
        },
        moreInfo__button: {
            marginTop: -10,
            textTransform: 'none'
        },
        moreInfo: {
            margin: 10,
            '& .paragraph': {
                fontSize: '0.7rem'
            }
        }
    })
);

export function PriceCard() {
    const classes = useStyles();
    const [showMoreInfo, setShowInfo] = useState(false);

    const toggleShowMoreInfo = () => {
        setShowInfo(!showMoreInfo);
    };

    return (
        <div className={classes.root}>
            <GuaranteeTag />
            <div className={classes.card}>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        alignContent: 'center',
                        marginTop: '10'
                    }}
                >
                    <h5 className={classes.price}>₦ 5000000</h5>
                    <Button size='large' variant={'contained'} color={'primary'} disableElevation startIcon={<PaymentIcon />}>
                        Pay Now
                    </Button>
                </Box>

                <Chip
                    icon={<InfoIcon />}
                    color={'info'}
                    variant={'outlined'}
                    size={'medium'}
                    sx={{ marginBottom: '20px' }}
                    onClick={toggleShowMoreInfo}
                    label={showMoreInfo ? 'show less' : ' show more info'}
                />
                <Collapse in={showMoreInfo} timeout='auto' unmountOnExit className={classes.moreInfo}>
                    <Typography paragraph className={'paragraph'}>
                        {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                                book
                                `}
                    </Typography>
                </Collapse>
            </div>
        </div>
    );
}
