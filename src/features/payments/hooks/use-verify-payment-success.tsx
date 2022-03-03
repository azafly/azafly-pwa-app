import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { axiosClient } from 'services/rest-clients';
import { Dispatch, RootState } from 'app/store';
import { useGetPendingOfferByIdLazyQuery } from 'api/generated/graphql';
import { useURLParams } from 'hooks/use-url-params';

interface Status {
    status: 'success' | 'error' | null;
    heading: string;
    text: string;
    cta: string | string[];
    referer: string;
}

const TRANSFER_REF = 'tx_ref';
const TRANSACTION_ID = 'transaction_id';
const STATUS = 'status';

export const useVerifyPaymentSuccess = () => {
    const [offer, setOffer] = useState<any>();
    const [paymentIntentPayload, setPaymentIntentPayload] = useState<string | undefined>();

    const tx_ref = useURLParams(TRANSFER_REF);
    const transaction_id = useURLParams(TRANSACTION_ID);
    const status = useURLParams(STATUS);
    const path = `payments/verify?tx_ref=${tx_ref}&transaction_id=${transaction_id}&status=${status}`;

    const {
        payments: {
            verificationStatus: { result, loading: verifying, message }
        }
    } = useSelector(({ payments }: RootState) => ({ payments }));

    const [handleGetOfferById] = useGetPendingOfferByIdLazyQuery({
        variables: {
            offer_id: tx_ref
        }
    });

    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        dispatch.payments.setVerificationStatus({ loading: true, result: null });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const verifyOrder = async () => {
            return axiosClient().get(path);
        };
        const handleGetPaymentOffer = () => {
            if (status === 'cancelled') {
                setOffer({});
                dispatch.payments.setCurrentlyVerifiedOffer({});
                dispatch.payments.setVerificationStatus({ result: 'error', loading: false, message: 'cancelled' });
                return;
            }
            handleGetOfferById()
                .then(async ({ data }) => {
                    setPaymentIntentPayload(data?.payment_offer[0].payment_intent_payload ?? '');
                    setOffer(data?.payment_offer[0]);
                    dispatch.payments.setCurrentlyVerifiedOffer(data?.payment_offer[0]);
                    const { data: verificationData } = await verifyOrder();
                    dispatch.payments.setVerificationStatus({ result: verificationData?.data?.status?.result, loading: false });
                    dispatch.dashboard.setCurrentCardIdentifier({ currency: offer?.source_currency });
                })
                .catch(error => {
                    console.log(error?.message);
                    dispatch.payments.setVerificationStatus({ result: 'error', loading: false, message: error?.message });
                });
        };
        handleGetPaymentOffer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const referer = useMemo(() => (paymentIntentPayload?.includes('top_up') ? 'cards' : 'payments'), [paymentIntentPayload]);

    const verificationStatus: Status =
        result === 'error'
            ? {
                  status: 'error',
                  heading: message === 'cancelled' ? `Oh no 😩 , You cancelled the other` : `Oh no 😩 , we couldn't verify your payment`,
                  text: `If you are sure your payment went through,
        Contact Support through the chat bubble below or email`,
                  referer,
                  cta: paymentIntentPayload?.includes('top_up') ? 'Restart Top Up' : `Start Payment again`
              }
            : {
                  status: 'success',
                  heading: 'Payment was processed successfully',
                  text: 'You can now track your payment',
                  referer,
                  cta: paymentIntentPayload?.includes('top_up') ? 'Go to Virtual card' : 'Track Payment'
              };

    return {
        verificationStatus,
        loading: message === 'cancelled' ? false : verifying
    };
};
