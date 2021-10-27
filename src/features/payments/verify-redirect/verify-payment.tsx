import { useVerifyPaymentSuccess } from 'features/payments/hooks';

const RedirectCallback = () => {
    useVerifyPaymentSuccess();

    return <div>Hey</div>;
};

export default RedirectCallback;
