import { memo } from 'react';

import { CardContainer, CardSkeleton } from './card';

interface TransactionListContainerProps {
    transactions: readonly any[];
    classes?: Record<string, string>;
}

export const TransactionListContainer = memo(function TransactionListContainer({ transactions }: TransactionListContainerProps) {
    return (
        <div>
            {transactions?.map((transaction: any) => (
                <CardContainer transactionData={transaction} key={transaction.id} />
            ))}
        </div>
    );
});
