import { Alert, AlertTitle } from '@material-ui/lab';
import { styled, Box } from '@mui/system';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import Button from '@mui/material/Button';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import Snackbar from '@mui/material/Snackbar';

import { createPaymentIntent } from 'services/rest-clients/user-payment';
import { Dispatch, RootState } from 'app/store';
import { formatCurrency } from 'libs';
import { isAllValueTruthy } from 'libs/index';
import { PAYMENT_STATES } from 'app/models/payments';
import { ThreeDots } from 'components/css-loaders/three-dots';
import { useURLParams } from 'hooks/use-url-params';

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

const FlexContainer = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px;
    padding: 8px 0;
    border-bottom: 1px solid black;
    width: 100%;
`;

const style = {
    width: 400,
    bgcolor: 'white',
    borderRadius: 2,
    margin: '10px',
    p: 2,
    px: 4,
    pb: 3
};

const StyledAlert = styled(Alert)`
        margin: 15;
        overflowWrap: 'break-word;
`;

const boldText = {
    fontWeight: 'bold'
};

export default function ReviewModal() {
    const [open, setOpen] = React.useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const { user } = useSelector((state: RootState) => state.auth);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseSnackBar = () => setOpenSnackBar(false);

    const urlParamOfferId = useURLParams('offer_id');

    const {
        payments: { apiFetchState, offerBasedOnRate, DIRECT_paymentIntentPayload }
    } = useSelector(({ payments }: RootState) => ({ payments }));

    const dispatch = useDispatch<Dispatch>();

    const goToPayment = async () => {
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
            }
            handleClose();
            dispatch.payments.setApiFetchState({ result: 'success', loading: false, message: PAYMENT_STATES.PAYMENT_LINK_SUCCESS });
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
            <button type='button' onClick={handleOpen}>
                Review your payment Data
            </button>

            <StyledModal
                aria-labelledby='review-modal'
                aria-describedby='payment-review'
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style} className='hh'>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '6px' }}>
                        <div>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ddd', marginRight: '6px' }}></div>
                        </div>
                        <div>
                            <h2 id='review-modal' style={{ margin: '0' }}>
                                Confirm Payment Details
                            </h2>
                            <p id='payment-review' style={{ margin: '0' }}>
                                Here is where you will be able to edit and confirm payment details
                            </p>
                        </div>
                    </div>

                    <div style={{ margin: '20px 0' }}>
                        <FlexContainer>
                            <Box sx={boldText}>Name</Box>
                            <div style={{ textTransform: 'uppercase', textAlign: 'right' }}>{DIRECT_paymentIntentPayload?.name}</div>
                        </FlexContainer>
                        <FlexContainer>
                            <Box sx={boldText}>Purpose</Box>
                            <div style={{ textTransform: 'uppercase', textAlign: 'right' }}>{DIRECT_paymentIntentPayload?.purpose}</div>
                        </FlexContainer>
                        <FlexContainer>
                            <Box sx={boldText}>Reference</Box>
                            <div style={{ textTransform: 'uppercase', textAlign: 'right' }}>{DIRECT_paymentIntentPayload?.references}</div>
                        </FlexContainer>
                        {DIRECT_paymentIntentPayload.fileUrl && (
                            <FlexContainer>
                                <Box sx={boldText}>Uploaded Document</Box>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <img
                                        style={{ objectFit: 'cover', maxWidth: '150px', maxHeight: '150px' }}
                                        src={DIRECT_paymentIntentPayload?.fileUrl}
                                    />
                                </div>
                            </FlexContainer>
                        )}
                    </div>

                    <div style={{ textAlign: 'center', fontSize: '150%', marginTop: '10px', fontWeight: 'bold' }}>Total: {totalPriceToPay}</div>

                    {apiFetchState?.loading && <ThreeDots variantColor={'base'} loadingText={'creating offer'} />}
                    <Button
                        style={{ width: '100%', backgroundColor: '#4990a4', color: '#fff', marginTop: '10px' }}
                        onClick={goToPayment}
                        color={'success'}
                    >
                        I agree
                    </Button>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Button onClick={handleClose} color={'error'}>
                            Cancel, and go back
                        </Button>
                    </div>
                </Box>
            </StyledModal>
        </Box>
    );
}
