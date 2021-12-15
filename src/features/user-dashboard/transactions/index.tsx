import { Grid, Hidden, Slide, Typography } from '@material-ui/core';
import { formatFirstName } from 'libs';
import Skeleton from 'react-loading-skeleton';

import { TransactionListContainer } from './transaction-list-container';
import WalletContainer from '../wallet/wallet-container';
import { CardSkeleton } from './card-skeleton';

import { useDashboardStyles } from '../classes';
import { GetUserTransactionsQuery } from 'api/generated/graphql';

interface TransactionsViewProps {
    transactions: any;
    userData: any;
    loading: boolean;
    handleSendVerificationEmail: () => void;
    emailLink: JSX.Element;
    transactionData: GetUserTransactionsQuery | undefined;
}

export const Transactions = ({ transactions, userData, loading, handleSendVerificationEmail, transactionData, emailLink }: TransactionsViewProps) => {
    const classes = useDashboardStyles();
    return (
        <Slide direction='up' in mountOnEnter unmountOnExit appear timeout={800}>
            <Grid item md={10} className={classes.data__section}>
                <Hidden xsDown>
                    <Typography color={'textSecondary'} className={classes.name}>
                        Hey 👋🏾 {!userData?.display_name ? <Skeleton width={'10ch'} /> : `${formatFirstName(userData?.display_name)}!`}
                    </Typography>{' '}
                </Hidden>
                <WalletContainer />
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
        </Slide>
    );
};
