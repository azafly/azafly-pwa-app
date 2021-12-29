import { Button, Slide, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Fade from '@mui/material/Fade';

import { CARD_PAYMENT_STATES } from 'app/models/payments';
import { ConversionCard } from 'features/user-dashboard/local-transaction-views/conversion-card';
import { createPaymentIntent } from 'services/rest-clients/user-payment';
import { Dispatch, RootState } from 'app/store';
import { formatCurrency, delay } from 'libs';
import { otherCountries } from 'mocks/payment';
import { ThreeDots } from 'components/css-loaders/three-dots';
import { useUserContext } from 'hooks/use-user-context';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            '& .payment-action': {
                textTransform: 'capitalize',
                margin: 10
            }
        },
        topUpInfo: {
            padding: 10,
            width: '100%',
            fontSize: '0.9rem'
        }
    })
);

export const TopUpForm = () => {
    const { payments } = useSelector(({ payments }: RootState) => ({ payments }));
    const dispatch = useDispatch<Dispatch>();
    const { buyAmount: amount, buyCurrency, sellCurrency, sellCurrencyTotalToPay, rates, paymentLink } = payments;

    const handleAmountChange = (e: any) => {
        dispatch.payments.setBuyAmount(e.target.value);
        dispatch.payments.setSellCurrencyTotalToPay(e.target.value * rates[sellCurrency][buyCurrency]['rate']);
    };

    const { user } = useUserContext();

    const handleConfirmToPayment = async () => {
        await dispatch.payments.setInitialOffer({
            source_currency: buyCurrency,
            source_amount: parseInt(`${amount}`),
            target_currency: sellCurrency
        });
    };

    const handleContinueToPayment = async () => {
        try {
            if (payments.offerBasedOnRate?.payment_offer_id) {
                dispatch.payments.setApiFetchState({ result: 'success', loading: false, message: CARD_PAYMENT_STATES.FETCHING_PAYMENT_LINK });
                const {
                    data: {
                        data: { payment_link }
                    }
                } = await createPaymentIntent({
                    payment_offer_id: payments.offerBasedOnRate?.payment_offer_id ?? '',
                    email: user?.email ?? '',
                    payment_title: `Top up ${buyCurrency} virtual card`,
                    currency: buyCurrency,
                    name: user?.display_name ?? '',
                    description: `${amount} ${buyCurrency} top_up_virtual_card`
                });
                dispatch.payments.setPaymentLink(payment_link);
                dispatch.payments.setApiFetchState({ result: 'success', loading: false, message: CARD_PAYMENT_STATES.PAYMENT_LINK_SUCCESS });
            }
        } catch (error) {
            dispatch.payments.setApiFetchState({ result: 'error', loading: false });
            delay(5500);
            dispatch.payments.setApiFetchState({
                result: payments?.apiFetchState?.result ?? null,
                loading: false,
                message: CARD_PAYMENT_STATES.GROUND_ZERO
            });
        }
    };
    // todo set close modal when pay now clicked
    const classes = useStyles();

    return (
        <Fade in mountOnEnter unmountOnExit appear timeout={300}>
            <div className={classes.container}>
                <ConversionCard
                    amount={amount}
                    info={'Add Fund'}
                    handleAmountChange={handleAmountChange}
                    options={otherCountries}
                    initialCurrency={buyCurrency}
                />
                <Typography className={classes.topUpInfo} paragraph>
                    You are about to add <strong>{formatCurrency({ countryCode: 'NG', amount, currency: buyCurrency })}</strong> to your{' '}
                    <strong>{buyCurrency}</strong> virtual card. You will be charged a total of{' '}
                    <strong> {formatCurrency({ currency: sellCurrency, amount: sellCurrencyTotalToPay, countryCode: 'NG' })}</strong>
                </Typography>

                {payments?.apiFetchState?.loading && <ThreeDots variantColor={'base'} />}
                {!payments?.apiFetchState?.loading &&
                    (payments?.apiFetchState?.message === CARD_PAYMENT_STATES.GROUND_ZERO ||
                        payments?.apiFetchState?.message !== CARD_PAYMENT_STATES.OFFER_CREATED) && (
                        <Button onClick={handleConfirmToPayment} variant={'contained'} color={'primary'} className={'payment-action'} fullWidth>
                            {'Confirm'}{' '}
                        </Button>
                    )}

                {payments?.apiFetchState?.result &&
                    payments?.apiFetchState?.message === CARD_PAYMENT_STATES.OFFER_CREATED &&
                    CARD_PAYMENT_STATES.PAYMENT_LINK_SUCCESS &&
                    !payments?.apiFetchState?.loading && (
                        <Slide direction='left' in={true} mountOnEnter unmountOnExit appear timeout={800}>
                            <Button
                                role={'link'}
                                href={paymentLink}
                                variant={'contained'}
                                onClick={handleContinueToPayment}
                                color={'primary'}
                                className={'payment-action'}
                                fullWidth
                            >
                                Pay Now
                            </Button>
                        </Slide>
                    )}
            </div>
        </Fade>
    );
};
