import { Alert, AlertTitle } from '@material-ui/lab';
import { styled, Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import Button from '@mui/material/Button';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import Snackbar from '@mui/material/Snackbar';

import { Dispatch, RootState } from 'app/store';
import { isAllValueTruthy } from 'libs/index';
import { usePaymentContext } from 'features/payments/context';
import { useURLParams } from 'hooks/use-url-params';
import { PAYMENT_STATES } from 'app/models/payments';

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

export default function ReviewModal() {
    const [open, setOpen] = React.useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const { user } = useSelector((state: RootState) => state.auth);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseSnackBar = () => setOpenSnackBar(false);

    const { handleCreatePaymentIntent } = usePaymentContext();
    const urlParamOfferId = useURLParams('offer_id');

    const {
        payments: { offerBasedOnRate, DIRECT_paymentIntentPayload }
    } = useSelector(({ payments }: RootState) => ({ payments }));

    const dispatch = useDispatch<Dispatch>();

    const goToPayment = async () => {
        const { references, purpose, fileUrl, name } = DIRECT_paymentIntentPayload;
        const { payment_offer_id, source_currency } = offerBasedOnRate || {};
        dispatch.payments.setApiFetchState({ result: null, loading: true, message: PAYMENT_STATES.FETCHING_PAYMENT_LINK });
        try {
            if (isAllValueTruthy(payment_offer_id, source_currency, payment_offer_id, source_currency, name)) {
                handleCreatePaymentIntent({
                    payment_offer_id: urlParamOfferId ?? payment_offer_id!,
                    payment_title: purpose,
                    description: references,
                    email: user?.email ?? '',
                    name,
                    currency: source_currency ?? 'NGN',
                    document_url: fileUrl ?? null
                });
            }
            dispatch.payments.setApiFetchState({ result: 'success', loading: false, message: PAYMENT_STATES.PAYMENT_LINK_SUCCESS });
        } catch (error) {
            dispatch.payments.setApiFetchState({ result: 'error', loading: false, message: PAYMENT_STATES.ERROR });
        }

        handleClose();
    };

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
                <Box sx={style}>
                    <h2 id='review-modal'>Confirm Payment Details</h2>
                    <p id='payment-review'>Here is where you will be able to edit and confirm payment details</p>
                    <Button onClick={goToPayment} color={'success'}>
                        I agree
                    </Button>
                    <Button onClick={handleClose} color={'error'}>
                        I disagree
                    </Button>
                </Box>
            </StyledModal>
        </Box>
    );
}
