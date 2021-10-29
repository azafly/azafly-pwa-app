import { memo } from 'react';

import { CardContainer } from './card-container';

interface TransactionListContainerProps {
    transactions: readonly any[];
}

export const TransactionListContainer = memo(function TransactionListContainer({ transactions }: TransactionListContainerProps) {
    return (
        <>
            {!!transactions.length && (
                <>
                    {transactions?.map((transaction: any) => (
                        <CardContainer transactionData={transaction} key={transaction.id} />
                    ))}
                </>
            )}
        </>
    );
});
