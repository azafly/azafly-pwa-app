import { Box, Hidden, Modal, Typography } from '@material-ui/core';
import { useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';

import { CreditCard } from 'features/user-dashboard/wallet/cards/credit-card';
import { EmptyCardContainer } from './empty-transaction/card';
import { DefaultSnackbar, SpeedDialTooltip } from 'components';
import { SideBar } from './side-bar';
import { TransactionListContainer } from './transaction-list-container';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { useDashboardStyles, StyledBadge } from './classes';
import WalletContainer from './wallet/wallet-container';

import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useGetUserTransactionsQuery, useGetCurrentUserByEmailQuery } from 'api/generated/graphql';

export default function Dashboard() {
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [isSendingLink, setLoading] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [verificationEmailSent, setSent] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openCreditCardModal, setOpenCreditCardModal] = useState(false);
    const handleOpenCreditCardModal = () => setOpenCreditCardModal(true);
    const handleCloseCreditCardModal = () => setOpenCreditCardModal(false);

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
        <ThreeDots styles={{ background: 'green' }} />
    ) : (
        <div>
            <ErrorIcon className={ripples.badge} style={{ width: 20, height: 20 }} />
            <span style={{ fontWeight: 500 }}> {' You need to verify your email to make payments. Click here to get a new Verification Email'} </span>
        </div>
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
            <Modal
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                open={openCreditCardModal}
                onClose={handleCloseCreditCardModal}
                aria-labelledby='credit-card'
                aria-describedby='credit-card-payment'
            >
                <CreditCard />
            </Modal>
            <div className={classes.main}>
                <Hidden mdDown>
                    <SideBar />
                </Hidden>
                <div className={classes.dashboard_container}>
                    <WalletContainer handleOpen={handleOpenCreditCardModal} />
                    {!transactionData && (
                        <Box sx={{ width: '100%', display: 'flex' }}>
                            <ThreeDots styles={{ backgroundColor: '#4990A4' }} />
                        </Box>
                    )}
                    {transactionData && Boolean(transactions?.length) && (
                        <>
                            <Typography className={classes.heading}>Your Transactions</Typography>
                            <TransactionListContainer classes={classes} transactions={transactions ?? []} />
                        </>
                    )}
                    {transactionData && !Boolean(transactions?.length) ? (
                        <EmptyCardContainer emailLink={emailLink} loading={loading} handleSendVerificationEmail={handleSendVerificationEmail} />
                    ) : null}
                </div>
            </div>

            <SpeedDialTooltip
                handleOpenSpeedDial={handleOpenSpeedDial}
                handleSpeedDialClose={handleSpeedDialClose}
                openSpeedDial={openSpeedDial}
                hidden={hidden}
                handleSpeedDialVisibility={handleSpeedDialVisibility}
            />
        </>
    );
}
