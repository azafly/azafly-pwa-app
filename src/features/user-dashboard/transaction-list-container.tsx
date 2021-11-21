import { memo } from 'react';

import { CardContainer } from './card';
import { TransactionFilterTab } from './filter/tab';
import { Typography } from '@material-ui/core';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useGetUserPendingOffersQuery, useGetCurrentUserByEmailQuery } from 'api/generated/graphql';

import { PendingOfferCardContainer } from './pending-offer/index';

interface TransactionListContainerProps {
    transactions: readonly any[];
    classes?: Record<string, string>;
}

export const TransactionListContainer = memo(function TransactionListContainer({ transactions }: TransactionListContainerProps) {
    const {
        authState: { user }
    } = useFirebaseAuthContext();

    const { data: userData } = useGetCurrentUserByEmailQuery({
        variables: {
            email: user?.email ?? ''
        }
    });

    const id = userData?.users[0]?.id;
    const { data: offerData } = useGetUserPendingOffersQuery({ variables: { id } });

    const all = transactions?.map((transaction: any) => <CardContainer transactionData={transaction} key={transaction.id} />);
    const pending = offerData?.payment_offer?.map((transaction: any) => (
        <PendingOfferCardContainer transactionData={transaction} key={transaction.id} />
    ));
    const pendingTransactions = pending?.length ? (
        pending
    ) : (
        <Typography align={'center'} style={{ maxWidth: 900, margin: 'auto' }}>
            {' '}
            You have no pending transactions
        </Typography>
    );

    return <TransactionFilterTab tabViews={[all, pendingTransactions]} />;
});
