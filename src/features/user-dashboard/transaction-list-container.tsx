import { Typography } from '@material-ui/core';
import { memo } from 'react';

import { CardContainer } from './card-container';

interface TransactionListContainerProps {
    transactions: readonly any[];
    classes: Record<string, string>;
}

export const TransactionListContainer = memo(function TransactionListContainer({ classes, transactions }: TransactionListContainerProps) {
    return (
        <>
            <Typography className={classes.heading}>Your Transactions</Typography>
            {transactions?.map((transaction: any) => (
                <CardContainer transactionData={transaction} key={transaction.id} />
            ))}
        </>
    );
});
