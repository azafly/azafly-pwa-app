import { Box } from '@mui/system';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
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

    const { verificationStatus, loading } = useVerifyPaymentSuccess();

    const goToNext = async () => {
        if (verificationStatus?.referer === 'cards') {
            dispatch.dashboard.setCurrentDashboardTab('cards');
            dispatch.dashboard.setCurrentCardIdentifier({ currency: currentVirtualCard?.currency ?? 'USD', openTopUpModal: false });
        }
        history.replace('/dashboard');
    };

    const goToPayments = async () => {
        if (verificationStatus?.referer === 'cards') {
            dispatch.dashboard.setCurrentDashboardTab('cards');
            dispatch.dashboard.setCurrentCardIdentifier({ currency: currentVirtualCard?.currency ?? 'USD', openTopUpModal: true });
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
                            {verificationStatus?.heading}
                        </h3>
                        {verificationStatus?.status === 'success' && <CheckCircleOutlineIcon style={{ fontSize: 50 }} color={'success'} />}
                        {verificationStatus?.status === 'error' && <CancelIcon style={{ fontSize: 50 }} color={'error'} />}
                        <p style={{ textAlign: 'center' }} id='payment-verify'>
                            {verificationStatus?.text} <strong>{verificationStatus?.status === 'error' && 'support@azafly.com'}</strong>
                        </p>
                        <Box sx={{ margin: 1 }}>
                            {verificationStatus?.status && verificationStatus?.status === 'success' && (
                                <Button
                                    variant={'contained'}
                                    onClick={goToNext}
                                    style={{ margin: 1, background: '#4990a4', width: '25ch', textTransform: 'capitalize', color: 'white' }}
                                >
                                    {verificationStatus.cta}
                                </Button>
                            )}
                            {verificationStatus?.status && verificationStatus?.status === 'error' && (
                                <>
                                    <h4 style={{ textAlign: 'center' }}> Or</h4>
                                    <Button
                                        variant={'contained'}
                                        style={{ margin: 1, background: 'rgba(248,81,73,0.4)', textTransform: 'capitalize', width: '25ch' }}
                                        onClick={goToPayments}
                                    >
                                        {verificationStatus.cta}
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
