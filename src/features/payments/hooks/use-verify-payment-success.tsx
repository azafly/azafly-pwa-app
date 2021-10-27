import { useEffect, useState } from 'react';

import { axiosClient } from 'services/rest-client/user-payment';
import { useURLParams } from 'hooks/use-url-params';

export const useVerifyPaymentSuccess = () => {
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
            .then(data => alert(JSON.stringify(data)))
            .catch(error => alert(JSON.stringify(error)));
    }, [path]);

    return <div></div>;
};
