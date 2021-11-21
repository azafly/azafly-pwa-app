import { memo } from 'react';

import { CardContainer } from './card';

interface TransactionListContainerProps {
    transactions: readonly any[];
    classes?: Record<string, string>;
}

export const TransactionListContainer = memo(function TransactionListContainer({ transactions }: TransactionListContainerProps) {
    return (
        <div>
            <div> ALL</div>
            {transactions?.map((transaction: any) => (
                <CardContainer transactionData={transaction} key={transaction.id} />
            ))}
        </div>
    );
});
