import { Box, Button, Card, CardActions, CardMedia, Chip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { useEmptyCardStyles } from './classes';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { EmptyServiceSvgComponent } from 'components/illustrations';

const services = ['WES', 'IELTS', 'School Fees', 'Medical Bills', 'Others'];
export const EmptyCardContainer = () => {
    const classes = useEmptyCardStyles();
    const {
        authState: { user }
    } = useFirebaseAuthContext();

    const emailVerified = user?.emailVerified;

    return (
        <>
            <Card className={classes.empty_card_root}>
                <h1 className={classes.nothing}>{`You do not have any transactions yet`} </h1>
                <CardMedia>
                    <EmptyServiceSvgComponent />
                </CardMedia>
                <CardActions>
                    <Link
                        to='/payment'
                        className={clsx(classes.button, {
                            [classes.disabled]: !emailVerified
                        })}
                        style={{ textDecoration: 'none' }}
                    >
                        <Button
                            className={clsx(classes.button, {
                                [classes.disabled]: !emailVerified
                            })}
                            title={emailVerified ? 'Go to payments' : 'Verify your  email to proceed'}
                            color={'primary'}
                            variant={'contained'}
                            size={'medium'}
                        >
                            {'Start a new payment'}
                        </Button>
                    </Link>
                </CardActions>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        flexWrap: 'wrap',
                        margin: '0px 10px 30px 10px'
                    }}
                >
                    {services.map(service => (
                        <Link
                            to='/payment'
                            key={service}
                            style={{ textDecoration: 'none' }}
                            className={clsx({
                                [classes.disabled]: !emailVerified
                            })}
                        >
                            {' '}
                            <Chip size={'medium'} label={service} className={classes.chip} color={'secondary'} clickable={true} />
                        </Link>
                    ))}
                </Box>
            </Card>
        </>
    );
};
