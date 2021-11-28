import { useState, useEffect } from 'react';

import { Grid, Hidden, Modal, Typography } from '@material-ui/core';
import ErrorIcon from '@mui/icons-material/Error';

import { CardSkeleton } from './transaction-card';
import { CreditCard } from 'features/user-dashboard/wallet/cards/credit-card';
import { DefaultSnackbar, SpeedDialTooltip } from 'components';
import { SideBar } from './side-bar';
import { TransactionListContainer } from './transaction-list-container';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import WalletContainer from './wallet/wallet-container';

import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useGetUserTransactionsQuery, useGetCurrentUserByEmailQuery } from 'api/generated/graphql';
import { fetchWallet } from './mock';
import { formatFirstName } from 'libs';

import { useDashboardStyles, StyledBadge } from './classes';

export default function Dashboard() {
    const [hidden, setHidden] = useState(false);
    const [isSendingLink, setLoading] = useState(false);
    const [openCreditCardModal, setOpenCreditCardModal] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [verificationEmailSent, setSent] = useState('');
    const handleCloseCreditCardModal = () => setOpenCreditCardModal(false);
    const handleOpenCreditCardModal = () => setOpenCreditCardModal(true);

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

    useEffect(() => {
        fetchWallet();
    }, []);

    return (
        <div className={classes.dashboard_container}>
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
            <Grid container>
                <Hidden mdDown>
                    <Grid item md={2}>
                        <SideBar />
                    </Grid>
                </Hidden>
                <Grid item md={10} className={classes.data__section}>
                    <Hidden xsDown>
                        <Typography color={'textSecondary'} className={classes.name}>
                            Hey 👋🏾 {formatFirstName(userData?.users[0]?.display_name ?? '')}!
                        </Typography>{' '}
                    </Hidden>
                    <WalletContainer handleOpen={handleOpenCreditCardModal} />
                    <Typography className={'heading'}>Recent Activities</Typography>{' '}
                    {loading || !transactionData ? (
                        <>
                            {Array(5)
                                .fill('')
                                .map((_, index) => (
                                    <CardSkeleton key={index} />
                                ))}
                        </>
                    ) : (
                        <>
                            <TransactionListContainer
                                transactions={transactions ?? []}
                                emailLink={emailLink}
                                loading={loading}
                                handleSendVerificationEmail={handleSendVerificationEmail}
                            />
                        </>
                    )}
                </Grid>
            </Grid>

            <SpeedDialTooltip
                handleOpenSpeedDial={handleOpenSpeedDial}
                handleSpeedDialClose={handleSpeedDialClose}
                openSpeedDial={openSpeedDial}
                hidden={hidden}
                handleSpeedDialVisibility={handleSpeedDialVisibility}
            />
        </div>
    );
}
