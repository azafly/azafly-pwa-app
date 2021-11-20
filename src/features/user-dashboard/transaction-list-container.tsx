import { memo } from 'react';

import { CardContainer } from './card-container';

interface TransactionListContainerProps {
    transactions: readonly any[];
    classes: Record<string, string>;
}

export const TransactionListContainer = memo(function TransactionListContainer({ classes, transactions }: TransactionListContainerProps) {
    return (
        <div>
            {transactions?.map((transaction: any) => (
                <CardContainer transactionData={transaction} key={transaction.id} />
            ))}
        </div>
    );
});
