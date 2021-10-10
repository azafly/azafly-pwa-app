import { Box, Chip, Typography } from '@material-ui/core';
import { useState } from 'react';
import { styled } from '@mui/system';
import ErrorIcon from '@mui/icons-material/Error';

import { CardContainer } from './card-container';
import { DashboardLoaderSkeleton } from './loader-skeleton';
import { EmptyCardContainer } from './empty-service';
import { NavBar } from './nav-bar';
import { SpeedDialTooltip } from 'components/speed-dial';
import { useDashboardStyles } from './classes';
import UserNavBar from './bottom-navbar';
import { Alert, AlertTitle } from '@material-ui/lab';

import Snackbar from '@mui/material/Snackbar';

// queries and co
import { useGetUserTransactionsQuery } from 'api/generated/graphql';
import { useFirebaseAuthContext } from 'providers/auth/firebase';

const StyledAlert = styled(Alert)`
        margin: 15;
        overflowWrap: 'break-word;
`;

export default function Dashboard() {
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [verificationEmailSent, setSent] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const {
        authState: { user }
    } = useFirebaseAuthContext();

    const id = user?.uid ?? '';

    const emailVerified = user?.emailVerified;

    const { data: transactionData, error, loading } = useGetUserTransactionsQuery({ variables: { id } });
    const transactions = transactionData?.transaction;

    const handleSpeedDialVisibility = () => {
        setHidden(prevHidden => !prevHidden);
    };

    const handleOpenSpeedDial = () => {
        setOpenSpeedDial(true);
    };

    const handleSpeedDialClose = () => {
        setOpenSpeedDial(false);
    };

    const classes = useDashboardStyles();

    if (loading) {
        return (
            <div>
                <NavBar />
                <Typography className={classes.heading}>Your Transactions</Typography>
                <DashboardLoaderSkeleton />
            </div>
        );
    }

    const handleSendVerificationEmail = () => {
        if (localStorage.getItem('verification_email_sent')) {
            setOpenSnackBar(true);
            setSent('Verification Email already sent to your email');
            return;
        }
        user?.sendEmailVerification()
            .then(() => {
                setOpenSnackBar(true);
                setSent('Verification Link sent successful');
                localStorage.setItem('verification_email_sent', 'true');
            })
            .catch(() => {
                setOpenSnackBar(true);
                setSent('Error sending Verification Link');
            });
    };

    return (
        <>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackBar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <StyledAlert onClose={() => setOpenSnackBar(false)} severity={verificationEmailSent.includes('Error') ? 'error' : 'success'}>
                    <AlertTitle>
                        {' '}
                        <strong>{verificationEmailSent.includes('Error') ? 'Error' : 'Success'}</strong>{' '}
                    </AlertTitle>
                    {verificationEmailSent}
                </StyledAlert>
            </Snackbar>
            <NavBar />
            <Box sx={{ mt: 15 }}>
                {!transactions?.length ? (
                    <>
                        {!emailVerified && (
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginRight: 10,
                                    marginLeft: 10,
                                    maxWidth: '80vw',
                                    margin: 'auto',
                                    borderRadius: 3,
                                    flexWrap: 'wrap',
                                    padding: 10,
                                    border: '1px solid ',
                                    cursor: 'pointer',
                                    background: '#FFEBE9'
                                }}
                                onClick={handleSendVerificationEmail}
                            >
                                <Box fontWeight={500}>
                                    {' '}
                                    <ErrorIcon />
                                    {'You need to verify your email to make payments. Click here to get a new Verification Email'}
                                </Box>
                            </Box>
                        )}
                        <EmptyCardContainer />
                        <UserNavBar />
                    </>
                ) : (
                    <div>
                        <Typography className={classes.heading}>Your Transactions</Typography>
                        <div className={classes.dashboard_container}>
                            {!error &&
                                transactions?.length &&
                                transactions?.map((transaction: any) => <CardContainer transactionData={transaction} key={transaction.id} />)}
                            <SpeedDialTooltip
                                handleOpenSpeedDial={handleOpenSpeedDial}
                                handleSpeedDialClose={handleSpeedDialClose}
                                openSpeedDial={openSpeedDial}
                                hidden={hidden}
                                handleSpeedDialVisibility={handleSpeedDialVisibility}
                            />
                        </div>
                        <UserNavBar />
                    </div>
                )}
            </Box>
        </>
    );
}
