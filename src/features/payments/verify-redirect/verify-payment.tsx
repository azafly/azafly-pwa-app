import { styled, Box } from '@mui/system';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ModalUnstyled from '@mui/core/ModalUnstyled';

import { NavBar } from 'components';
import { useVerifyPaymentSuccess } from 'features/payments/hooks';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';

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
    margin: 'auto',
    p: 2,
    px: 4,
    pb: 3
};

export default function RedirectCallback() {
    const [open, setOpen] = useState(true);
    const history = useHistory();

    const {
        verificationStatus: { status, heading, text, cta },
        loading
    } = useVerifyPaymentSuccess();

    const goTDashboard = async () => {
        history.replace('/dashboard');
    };

    const goToPayments = async () => {
        history.replace('/payment');
    };

    return (
        <>
            <NavBar />
            <Box>
                <StyledModal
                    aria-labelledby='verify-modal'
                    aria-describedby='payment-verify'
                    open={open}
                    onClose={() => setOpen(false)}
                    BackdropComponent={Backdrop}
                >
                    <Box sx={style} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        {loading ? (
                            <ThreeDots />
                        ) : (
                            <>
                                <h3 style={{ textAlign: 'center' }} id='verify-modal'>
                                    {heading}
                                </h3>
                                {status === 'success' && <CheckCircleOutlineIcon style={{ fontSize: 50 }} color={'success'} />}
                                {status === 'error' && <CancelIcon style={{ fontSize: 50 }} color={'error'} />}
                                <p style={{ textAlign: 'center' }} id='payment-verify'>
                                    {text} <strong>{' support@azafly.com'}</strong>
                                </p>
                                <Box sx={{ margin: 1 }}>
                                    {status === 'success' && (
                                        <Button variant={'contained'} onClick={goTDashboard} color={'success'}>
                                            {cta}
                                        </Button>
                                    )}
                                    {status === 'error' && (
                                        <>
                                            <h4 style={{ textAlign: 'center' }}> Or</h4>
                                            <Button variant={'contained'} sx={{ margin: 1 }} onClick={goToPayments} color={'error'}>
                                                {cta}
                                            </Button>
                                        </>
                                    )}
                                </Box>
                            </>
                        )}
                    </Box>
                </StyledModal>
            </Box>
        </>
    );
}
