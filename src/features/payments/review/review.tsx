import * as React from 'react';
import { styled, Box } from '@mui/system';
import { Alert, AlertTitle } from '@material-ui/lab';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import Snackbar from '@mui/material/Snackbar';

import { PaymentInfo, GetOffersResponseData } from 'services/rest-api/user-payment';
import { usePaymentContext } from 'features/payments/context';
import { useHistory } from 'react-router-dom';

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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseSnackBar = () => setOpenSnackBar(false);

    const { handleCreatePaymentIntent } = usePaymentContext();

    const goToPayment = async () => {
        const { fullname, references, purpose } = JSON.parse(localStorage.getItem('payment_info') as string) as PaymentInfo;
        const { payment_offer_id, source_currency } = JSON.parse(localStorage.getItem('initialOffer') as string) as GetOffersResponseData;
        handleCreatePaymentIntent({
            payment_offer_id,
            payment_title: purpose,
            description: references,
            email: 'user@email.com',
            name: fullname,
            currency: source_currency ?? 'NGN'
        });
        handleClose();
    };

    return (
        <div>
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
                    <h2 id='review-modal'>Text in a modal</h2>
                    <p id='payment-review'>Aliquid amet deserunt earum!</p>
                    <button onClick={goToPayment}>Complete Payment</button>
                    <button onClick={handleClose}>Close</button>
                </Box>
            </StyledModal>
        </div>
    );
}
