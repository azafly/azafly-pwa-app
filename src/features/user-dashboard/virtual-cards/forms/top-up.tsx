import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

import { Dispatch, RootState } from 'app/store';
import { formatCurrency } from 'libs';
import { ConversionCard } from 'features/user-dashboard/local-transaction-views/conversion-card';
import { otherCountries } from 'mocks/payment';
import { createPaymentIntent } from 'services/rest-clients/user-payment';
import { useUserContext } from 'hooks/use-user-context';

export const TopUpForm = () => {
    const {
        localPayments: { buyAmount: amount, buyCurrency, sellCurrency, sellCurrencyTotalToPay, rates },
        payment
    } = useSelector(({ dashboard, localPayments, VIRTUAL_CARDS, payment }: RootState) => ({ dashboard, localPayments, VIRTUAL_CARDS, payment }));
    const dispatch = useDispatch<Dispatch>();
    const handleAmountChange = (e: any) => {
        dispatch.localPayments.setBuyAmount(e.target.value);
        dispatch.localPayments.setSellCurrencyTotalToPay(e.target.value * rates[sellCurrency][buyCurrency]['rate']);
    };

    const { user } = useUserContext();
    const {
        paymentLink,
        verificationStatus: { result, loading: loadingPaymentLink }
    } = payment ?? { verificationStatus: {} };
    const handleContinueToPayment = async () => {
        dispatch.payment.setVerificationStatus({ result: 'error', loading: true });
        try {
            await dispatch.payment.setInitialOffer({
                source_currency: buyCurrency,
                source_amount: parseInt(`${amount}`),
                target_currency: sellCurrency
            });
            if (payment.offerBasedOnRate?.payment_offer_id) {
                const {
                    data: {
                        data: { payment_link }
                    }
                } = await createPaymentIntent({
                    payment_offer_id: payment.offerBasedOnRate?.payment_offer_id ?? '',
                    email: user?.email ?? '',
                    payment_title: `Top up ${buyCurrency} virtual card`,
                    currency: buyCurrency,
                    name: user?.display_name ?? '',
                    description: `${amount} ${buyCurrency} top_up_virtual_card`
                });
                dispatch.payment.setPaymentLink(payment_link);
            }
            dispatch.payment.setVerificationStatus({ result: 'success', loading: false });
        } catch (error) {
            dispatch.payment.setVerificationStatus({ result: 'error', loading: false });
        }
    };

    return (
        <div style={{ height: 400 }}>
            <ConversionCard
                amount={amount}
                info={'Add Fund'}
                handleAmountChange={handleAmountChange}
                options={otherCountries}
                initialCurrency={buyCurrency}
            />
            <span>
                You are about to add <strong>{formatCurrency({ countryCode: 'NG', amount, currency: buyCurrency })}</strong> to your{' '}
                <strong>{buyCurrency}</strong> virtual card. You will be charged a total of{' '}
                <strong>{formatCurrency({ currency: sellCurrency, amount: sellCurrencyTotalToPay, countryCode: 'NG' })}</strong>
            </span>
            <Button onClick={handleContinueToPayment}>Continue</Button>
            {!result && !loadingPaymentLink && (
                <Button role={'link'} href={paymentLink} onClick={handleContinueToPayment}>
                    pay
                </Button>
            )}
        </div>
    );
};
