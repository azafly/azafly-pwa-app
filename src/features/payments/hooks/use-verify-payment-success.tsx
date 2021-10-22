import React, { useEffect } from 'react';

import { axiosClient } from 'services/rest-api/user-payment';
import { useURLParams } from 'hooks/use-url-params';

export const useVerifyPaymentSuccess = () => {
    const TRANSFER_REF = 'tx_ref';
    const TRANSACTION_ID = 'transaction_id';

    const tx_ref = useURLParams(TRANSFER_REF);
    const transaction_id = useURLParams(TRANSACTION_ID);
    const path = `/verify?tx_ref=${tx_ref}&transaction_id=${transaction_id}`;

    useEffect(() => {
        axiosClient()
            .get(path)
            .then(data => console.log(data));
    }, [path]);

    return <div></div>;
};
