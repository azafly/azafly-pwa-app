import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { axiosClient } from 'services/rest-clients';
import { Dispatch } from 'app/store';
import { useURLParams } from 'hooks/use-url-params';
import { useGetPendingOfferByIdLazyQuery } from 'api/generated/graphql';

interface Status {
    status: 'success' | 'error' | null;
    heading: string;
    text: string;
    cta: string | string[];
    referer: string;
}

export const useVerifyPaymentSuccess = () => {
    const [paymentIntentPayload, setOffer] = useState<any>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const TRANSFER_REF = 'tx_ref';
    const TRANSACTION_ID = 'transaction_id';
    const STATUS = 'status';

    const tx_ref = useURLParams(TRANSFER_REF);
    const transaction_id = useURLParams(TRANSACTION_ID);
    const status = useURLParams(STATUS);
    const path = `/verify?tx_ref=${tx_ref}&transaction_id=${transaction_id}&status=${status}`;

    const [handleGetOfferById] = useGetPendingOfferByIdLazyQuery({
        variables: {
            offer_id: tx_ref
        }
    });
    const dispatch = useDispatch<Dispatch>();
    useEffect(() => {
        setLoading(true);
        dispatch.payment.setVerificationStatus({ result: null, loading: true });
        handleGetOfferById()
            .then(({ data }) => {
                setOffer(data?.payment_offer[0].payment_intent_payload);
                setLoading(false);
                setError(false);
                dispatch.payment.setVerificationStatus({ result: 'success', loading: false });
            })

            .catch(() => {
                setError(true);
                setLoading(false);
                dispatch.payment.setVerificationStatus({ result: 'error', loading: false });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transaction_id, handleGetOfferById]);
    useEffect(() => {
        axiosClient()
            .get(path)
            .then(() => {
                dispatch.payment.setVerificationStatus({ result: 'success', loading: false });
                setError(true);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError(false);
                dispatch.payment.setVerificationStatus({ result: 'error', loading: false });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);

    const verificationStatus: Status = error
        ? {
              status: 'error',
              heading: `Oh no 😩 , we couldn't verify your payment`,
              text: `If you are sure your payment went through,
        Contact Support through the chat bubble below or email`,
              referer: paymentIntentPayload?.includes('top_up') ? 'cards' : 'payments',
              cta: paymentIntentPayload?.includes('top_up') ? 'Restart Top Up' : `Start Payment again`
          }
        : {
              status: 'success',
              heading: 'Payment was processed successfully',
              text: 'You can now track your payment',
              referer: paymentIntentPayload?.includes('top_up') ? 'cards' : 'payments',
              cta: paymentIntentPayload?.includes('top_up') ? 'Go to Virtual card' : 'Track Payment'
          };
    return {
        verificationStatus,
        loading
    };
};
