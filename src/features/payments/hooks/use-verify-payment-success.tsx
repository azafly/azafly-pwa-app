import { useEffect, useState } from 'react';

import { axiosClient } from 'services/rest-client/user-payment';
import { useURLParams } from 'hooks/use-url-params';

interface Status {
    status: 'success' | 'error' | null;
    heading: string;
    text: string;
    cta: string | string[];
}

const defaultStatus: Status = {
    status: null,
    heading: '',
    text: '',
    cta: ''
};
export const useVerifyPaymentSuccess = () => {
    const [verificationStatus, setStatus] = useState<Status>(defaultStatus);
    const [loading, setLoading] = useState(true);
    const TRANSFER_REF = 'tx_ref';
    const TRANSACTION_ID = 'transaction_id';
    const STATUS = 'status';

    const tx_ref = useURLParams(TRANSFER_REF);
    const transaction_id = useURLParams(TRANSACTION_ID);
    const status = useURLParams(STATUS);
    const path = `/verify?tx_ref=${tx_ref}&transaction_id=${transaction_id}&status=${status}`;

    useEffect(() => {
        axiosClient()
            .get(path)
            .then(() =>
                setStatus({
                    status: 'success',
                    heading: 'Payment was processed successfully',
                    text: 'You can now track your payment',
                    cta: 'Track Payment'
                })
            )
            .catch(() =>
                setStatus({
                    status: 'error',
                    heading: `Oh no 😩 , we couldn't verify your payment`,
                    text: `If you are sure your payment went through,
                    Contact Support through the chat bubble below or email`,
                    cta: `Start Payment again`
                })
            )
            .finally(() => setLoading(false));
    }, [path]);

    return {
        verificationStatus,
        loading
    };
};
