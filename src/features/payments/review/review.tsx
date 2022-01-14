import { Alert, AlertTitle } from '@material-ui/lab';
import { styled, Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import ModalUnstyled from '@mui/core/ModalUnstyled';

import { createPaymentIntent } from 'services/rest-clients/user-payment';
import { Dispatch, RootState } from 'app/store';
import { formatCurrency, isAllValueTruthy } from 'libs/index';
import { PAYMENT_STATES } from 'app/models/payments';
import { useURLParams } from 'hooks/use-url-params';
import Snackbar from '@mui/material/Snackbar';
import { ReviewContent } from './content';

const StyledModal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Backdrop = styled('div')`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
`;

const StyledAlert = styled(Alert)`
        margin: 15;
        overflowWrap: 'break-word;
`;

export default function ReviewModal() {
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const {
        auth: { user },
        payments: { DIRECT_openReviewModal, paymentLink }
    } = useSelector(({ auth, payments }: RootState) => ({ auth, payments }));

    const handleCloseSnackBar = () => setOpenSnackBar(false);

    const urlParamOfferId = useURLParams('offer_id');

    const {
        payments: { apiFetchState, offerBasedOnRate, DIRECT_paymentIntentPayload }
    } = useSelector(({ payments }: RootState) => ({ payments }));

    const dispatch = useDispatch<Dispatch>();

    const getPaymentLink = async () => {
        const { references, purpose, fileUrl, name } = DIRECT_paymentIntentPayload;
        const { payment_offer_id, source_currency } = offerBasedOnRate || {};

        try {
            dispatch.payments.setApiFetchState({ result: null, loading: true, message: PAYMENT_STATES.FETCHING_PAYMENT_LINK });
            if (isAllValueTruthy(payment_offer_id, source_currency, payment_offer_id, source_currency, name)) {
                const {
                    data: {
                        data: { payment_link }
                    }
                } = await createPaymentIntent({
                    payment_offer_id: urlParamOfferId ?? payment_offer_id!,
                    payment_title: purpose,
                    description: references,
                    email: user?.email ?? '',
                    name,
                    currency: source_currency ?? 'NGN',
                    document_url: fileUrl ?? null
                });
                dispatch.payments.setPaymentLink(payment_link);
                payment_link && location.replace(payment_link);
                dispatch.payments.setApiFetchState({ result: 'success', loading: false, message: PAYMENT_STATES.PAYMENT_LINK_SUCCESS });
                dispatch.payments.DIRECT_setOpenReviewModal(false);
            }
        } catch (error) {
            dispatch.payments.setApiFetchState({ result: 'error', loading: false, message: PAYMENT_STATES.ERROR });
        }
    };

    const { destination_currency, total_in_target_with_charges } = offerBasedOnRate || {};
    const getFormattedCurrency = () => {
        if (offerBasedOnRate && isAllValueTruthy(destination_currency, total_in_target_with_charges)) {
            const totalPriceToPay = formatCurrency({
                currency: offerBasedOnRate.destination_currency ?? 'NGN',
                amount: offerBasedOnRate.total_in_target_with_charges ?? 0,
                countryCode: 'NG'
            });

            return {
                totalPriceToPay
            };
        }
        return {};
    };

    const { totalPriceToPay } = getFormattedCurrency();

    return (
        <Box>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <StyledAlert onClose={handleCloseSnackBar} severity={'success'}>
                    <AlertTitle>
                        {' '}
                        <strong>{'Success'}</strong>{' '}
                    </AlertTitle>
                    {'You have confirmed payment information. Proceed to Payments'}
                </StyledAlert>
            </Snackbar>
            {DIRECT_openReviewModal && (
                <StyledModal
                    aria-labelledby='review-modal'
                    aria-describedby='payment-review'
                    open={DIRECT_openReviewModal}
                    onClose={() => dispatch.payments.DIRECT_setOpenReviewModal(false)}
                    BackdropComponent={Backdrop}
                >
                    <ReviewContent
                        open={DIRECT_openReviewModal}
                        apiFetchState={apiFetchState}
                        timeOut={DIRECT_openReviewModal ? 800 : 500}
                        paymentIntentPayload={DIRECT_paymentIntentPayload}
                        getPaymentLink={getPaymentLink}
                        totalPriceToPay={totalPriceToPay}
                        handleCloseDispatcher={() => dispatch.payments.DIRECT_setOpenReviewModal(false)}
                    />
                </StyledModal>
            )}
            {!DIRECT_openReviewModal && (
                <ReviewContent
                    styles={{ width: '100%', maxWidth: 800, margin: 10 }}
                    open={true}
                    apiFetchState={apiFetchState}
                    timeOut={500}
                    paymentIntentPayload={DIRECT_paymentIntentPayload}
                    getPaymentLink={getPaymentLink}
                    totalPriceToPay={totalPriceToPay}
                    handleCloseDispatcher={() => dispatch.payments.DIRECT_setOpenReviewModal(false)}
                />
            )}
        </Box>
    );
}
