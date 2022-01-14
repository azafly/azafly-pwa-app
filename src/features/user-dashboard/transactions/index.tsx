import { Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import { CardSkeleton } from './card-skeleton';
import { formatFirstName } from 'libs';
import { GetUserTransactionsQuery } from 'api/generated/graphql';
import { NewTransactionContainer } from '../currency-conversion/new-transaction-container';
import { RootState } from 'app/store';

import { TransactionListContainer } from './transaction-list-container';
import WalletContainer from '../wallet/wallet-container';

import { useDashboardStyles } from '../classes';
import { TOUR_DASHBOARD_LOCAL } from '../product-tours';

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
    const { viewState } = useSelector(({ dashboard }: RootState) => dashboard);
    return (
        <Grid item md={10} className={classes.data__section}>
            <Typography color={'textSecondary'} className={classes.name} gutterBottom>
                <span className={`${TOUR_DASHBOARD_LOCAL.START_TOUR}`} /> Hey 👋🏾{' '}
                {!userData?.display_name ? <Skeleton width={'10ch'} /> : `${formatFirstName(userData?.display_name)}!`}{' '}
            </Typography>{' '}
            {viewState === 'local' ? <NewTransactionContainer /> : <WalletContainer />}
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
    );
};
