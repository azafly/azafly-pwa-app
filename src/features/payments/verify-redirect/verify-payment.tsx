import { Box } from '@mui/system';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { NavBar } from 'features/user-dashboard/nav-bar';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { useVerifyPaymentSuccess } from 'features/payments/hooks';

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
            <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center' }}>
                <Box sx={style} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    {loading ? (
                        <ThreeDots
                            styles={{
                                background: '#4990A4'
                            }}
                        />
                    ) : (
                        <>
                            <h3 style={{ textAlign: 'center' }} id='verify-modal'>
                                {heading}
                            </h3>
                            {status === 'success' && <CheckCircleOutlineIcon style={{ fontSize: 50 }} color={'success'} />}
                            {status === 'error' && <CancelIcon style={{ fontSize: 50 }} color={'error'} />}
                            <p style={{ textAlign: 'center' }} id='payment-verify'>
                                {text} <strong>{status === 'error' && 'support@azafly.com'}</strong>
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
            </Box>
        </>
    );
}
