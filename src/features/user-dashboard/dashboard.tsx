import { Box, Hidden, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import { useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';

import { DashboardLoaderSkeleton } from 'features/user-dashboard/loader-skeleton';
import { DefaultSnackbar, SpeedDialTooltip } from 'components';
import { EmptyCardContainer } from './empty-service';
import { SideBar } from './side-bar';
import { TransactionListContainer } from './transaction-list-container';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useGetUserTransactionsQuery, useGetCurrentUserByEmailQuery } from 'api/generated/graphql';

import { useDashboardStyles, StyledBadge } from './classes';
import WalletContainer from '../wallet/wallet-container';

export default function Dashboard() {
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [isSendingLink, setLoading] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [verificationEmailSent, setSent] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const {
        authState: { user }
    } = useFirebaseAuthContext();

    const { data: userData } = useGetCurrentUserByEmailQuery({
        variables: {
            email: user?.email ?? ''
        }
    });

    const id = userData?.users[0]?.id;
    const { data: transactionData, loading } = useGetUserTransactionsQuery({ variables: { id } });
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
    const ripples = StyledBadge();

    const handleSendVerificationEmail = () => {
        if (localStorage.getItem('verification_email_sent')) {
            setOpenSnackBar(true);
            setSent('Verification Email already sent to your email. Kindly check your email to verify');
            return;
        }
        setLoading(true);
        user?.sendEmailVerification()
            .then(() => {
                setOpenSnackBar(true);
                setSent('Verification Link sent successfully. Check your email to verify');
                localStorage.setItem('verification_email_sent', 'true');
                setLoading(false);
            })
            .catch(() => {
                setOpenSnackBar(true);
                setSent('Error sending Verification Link');
                setLoading(false);
            });
    };

    const emailLink = isSendingLink ? (
        <DashboardLoaderSkeleton />
    ) : (
        <>
            <ErrorIcon className={ripples.badge} />
            {' You need to verify your email to make payments. Click here to get a new Verification Email'}
        </>
    );

    const alertSeverity = verificationEmailSent.includes('Error') ? 'error' : 'success';
    const alertTitle = verificationEmailSent.includes('Error') ? 'Error' : 'Success';

    return (
        <>
            <DefaultSnackbar
                severity={alertSeverity}
                open={openSnackBar}
                handleClose={() => setOpenSnackBar(false)}
                title={alertTitle}
                info={verificationEmailSent}
            />
            <Stack direction={'row'}>
                <Hidden mdDown>
                    <SideBar />
                </Hidden>
                <Box className={classes.main}>
                    <WalletContainer />
                    <Box>
                        <div className={classes.dashboard_container}>
                            {transactionData && !transactions?.length && !loading && (
                                <EmptyCardContainer
                                    emailLink={emailLink}
                                    loading={loading}
                                    handleSendVerificationEmail={handleSendVerificationEmail}
                                />
                            )}
                            {!!transactions?.length && <Typography className={classes.heading}>Your Transactions</Typography>}
                            {loading || !transactionData ? (
                                <DashboardLoaderSkeleton />
                            ) : (
                                <TransactionListContainer transactions={transactions ?? []} />
                            )}
                            <SpeedDialTooltip
                                handleOpenSpeedDial={handleOpenSpeedDial}
                                handleSpeedDialClose={handleSpeedDialClose}
                                openSpeedDial={openSpeedDial}
                                hidden={hidden}
                                handleSpeedDialVisibility={handleSpeedDialVisibility}
                            />
                        </div>
                    </Box>
                </Box>
            </Stack>
        </>
    );
}
