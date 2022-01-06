import { Box } from '@mui/system';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { Dispatch, RootState } from 'app/store';
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
    const dispatch = useDispatch<Dispatch>();
    const {
        dashboard: { currentVirtualCard }
    } = useSelector(({ dashboard, payments }: RootState) => ({ dashboard, payments }));

    const {
        verificationStatus: { status, heading, text, cta, referer },
        loading
    } = useVerifyPaymentSuccess();

    const goToNext = async () => {
        if (referer === 'cards') {
            new Promise(() => dispatch.dashboard.setCurrentDashboardTab('cards')).then(() => history.replace('/dashboard'));
            dispatch.dashboard.setCurrentCardIdentifier({ currency: currentVirtualCard?.currency ?? 'USD', openTopUpModal: false });
        }
        history.replace('/dashboard');
    };

    const goToPayments = async () => {
        if (referer === 'card') {
            dispatch.dashboard.setCurrentDashboardTab('cards');
        }
        history.replace('/dashboard');
    };

    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Box sx={style} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {loading ? (
                    <>
                        <h4 style={{ textAlign: 'center' }}> Verifying your payment</h4>
                        <ThreeDots variantColor={'base'} />
                    </>
                ) : (
                    <>
                        <h3 style={{ textAlign: 'center' }} id='verify-modal'>
                            {heading}
                        </h3>
                        {status && status === 'success' && <CheckCircleOutlineIcon style={{ fontSize: 50 }} color={'success'} />}
                        {status && status === 'error' && <CancelIcon style={{ fontSize: 50 }} color={'error'} />}
                        <p style={{ textAlign: 'center' }} id='payment-verify'>
                            {text} <strong>{status === 'error' && 'support@azafly.com'}</strong>
                        </p>
                        <Box sx={{ margin: 1 }}>
                            {status && status === 'success' && (
                                <Button variant={'contained'} onClick={goToNext} color={'success'}>
                                    {cta}
                                </Button>
                            )}
                            {status && status === 'error' && (
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
    );
}
