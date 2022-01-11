import { Button, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Fade, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

import { PAYMENT_STATES } from 'app/models/payments';
import { ConversionCard } from 'features/user-dashboard/currency-conversion/conversion-card';
import { createPaymentIntent, getInitialOffer } from 'services/rest-clients/user-payment';
import { Dispatch, RootState } from 'app/store';
import { formatCurrency } from 'libs';
import { otherCountries } from 'mocks/payment';
import { ThreeDots } from 'components/css-loaders/three-dots';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            '& .payment-action': {
                textTransform: 'capitalize',
                marginTop: 10
            }
        },
        topUpInfo: {
            paddingLeft: 10,
            paddingTop: 10,
            width: '100%',
            fontSize: '0.9rem',
            marginBottom: 8,
            '& .more_info': {
                fontSize: '0.7em',
                color: theme.colors.base
            }
        },
        additional_rate_info: {
            color: theme.colors.base,
            fontFamily: 'Nunito',
            fontSize: '0.85rem',
            paddingLeft: 10,
            fontWeight: 400,
            '& .amounts': {
                fontWeight: 700
            }
        }
    })
);

export const TopUpForm = () => {
    const [showRateInfo, setShowInfo] = useState(false);
    const {
        auth: { hasuraUser },
        payments
    } = useSelector(({ auth, payments }: RootState) => ({ auth, payments }));
    const dispatch = useDispatch<Dispatch>();
    const { buyAmount: amount, buyCurrency, sellCurrency, rates, paymentLink, apiFetchState, offerBasedOnRate } = payments || {};

    const handleAmountChange = (e: any) => {
        dispatch.payments.setBuyAmount(e.target.value);
        dispatch.payments.setSellCurrencyTotalToPay(e.target.value * rates[sellCurrency][buyCurrency]['rate']);
        // force confirm now button to show, so we can fetch new offer
        setShowInfo(false);
        dispatch.payments.setApiFetchState({
            ...payments?.apiFetchState,
            message: PAYMENT_STATES.GROUND_ZERO
        });
    };

    const user = hasuraUser;

    const handleConfirmToPayment = async () => {
        try {
            dispatch.payments.setApiFetchState({ result: 'error', loading: true, message: PAYMENT_STATES.CREATING_OFFER });
            const { data } = await getInitialOffer({
                source_currency: buyCurrency,
                source_amount: parseInt(`${amount}`),
                target_currency: sellCurrency
            });
            dispatch.payments.setApiFetchState({ result: 'success', loading: false, message: PAYMENT_STATES.OFFER_CREATED });
            dispatch.payments.setOfferBasedOnRate(data.data);
            setShowInfo(true);
            dispatch.payments.setApiFetchState({ result: 'success', loading: true, message: PAYMENT_STATES.FETCHING_PAYMENT_LINK });
            const {
                data: {
                    data: { payment_link }
                }
            } = await createPaymentIntent({
                payment_offer_id: data.data.payment_offer_id,
                email: user?.email ?? '',
                payment_title: `Top up ${buyCurrency} virtual card`,
                currency: buyCurrency,
                name: user?.display_name ?? '',
                description: `${amount} ${buyCurrency} top_up_virtual_card`,
                load_on_card: true
            });
            dispatch.payments.setPaymentLink(payment_link);
            dispatch.payments.setApiFetchState({ result: 'success', loading: false, message: PAYMENT_STATES.PAYMENT_LINK_SUCCESS });
        } catch (error) {
            dispatch.payments.setApiFetchState({ ...apiFetchState, result: 'error', loading: false, message: PAYMENT_STATES.ERROR });
        }
    };

    // todo set close modal when pay now clicked
    const classes = useStyles();

    useEffect(() => {
        dispatch.payments.setApiFetchState({
            ...payments?.apiFetchState,
            message: PAYMENT_STATES.GROUND_ZERO
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // TODO: if the current card is same as base currency. Top up shouldn't involve conversion.
    // No rates, Just go straight to checkout
    const message = payments?.apiFetchState?.message === PAYMENT_STATES.CREATING_OFFER ? 'confirming rate and charges' : 'preparing payment offer';
    const currentRate = useMemo(
        () => offerBasedOnRate?.exchange_rate_info?.base_rate?.toFixed(2) ?? rates?.[sellCurrency]?.[buyCurrency]?.['rate'].toFixed(2),
        [buyCurrency, offerBasedOnRate?.exchange_rate_info?.base_rate, rates, sellCurrency]
    );
    return (
        <Fade in mountOnEnter unmountOnExit appear timeout={300}>
            <div className={classes.container}>
                <ConversionCard
                    amount={amount}
                    info={'Add Fund'}
                    handleAmountChange={handleAmountChange}
                    options={otherCountries}
                    initialCurrency={buyCurrency}
                    handleCurrencyChangeExtraAction={dispatch.payments.setApiFetchState}
                />

                <Typography className={classes.topUpInfo} paragraph>
                    <span>
                        {' '}
                        1 {buyCurrency} = {sellCurrency} {currentRate}
                    </span>
                    <span className={'more_info'}> *Exchange rate and fee is subject to change while transaction is in progress. </span>
                </Typography>

                {payments?.apiFetchState?.message !== PAYMENT_STATES.GROUND_ZERO && showRateInfo && offerBasedOnRate && (
                    <>
                        <Stack>
                            <Typography className={classes.topUpInfo} paragraph>
                                You will be charged a total of{' '}
                                {offerBasedOnRate.total_in_target_with_charges && (
                                    <strong>
                                        {formatCurrency({
                                            currency: sellCurrency,
                                            amount: offerBasedOnRate.total_in_target_with_charges,
                                            countryCode: 'NG'
                                        })}
                                    </strong>
                                )}
                            </Typography>
                            <Typography className={classes.additional_rate_info}>
                                Our fees:&nbsp;
                                {offerBasedOnRate.fees_info?.total && (
                                    <span className={'amounts'}>
                                        {formatCurrency({ currency: sellCurrency, amount: offerBasedOnRate.fees_info?.total, countryCode: 'NG' })}
                                    </span>
                                )}
                            </Typography>
                        </Stack>
                    </>
                )}

                {payments?.apiFetchState?.loading && <ThreeDots variantColor={'base'} loadingText={message} />}

                {!payments?.apiFetchState?.loading && payments?.apiFetchState?.message === PAYMENT_STATES.GROUND_ZERO && (
                    <Button onClick={handleConfirmToPayment} variant={'outlined'} color={'primary'} className={'payment-action'} fullWidth>
                        {'Confirm'}{' '}
                    </Button>
                )}

                {payments?.apiFetchState?.result &&
                    !payments?.apiFetchState?.loading &&
                    payments?.apiFetchState?.message !== PAYMENT_STATES.GROUND_ZERO &&
                    payments?.apiFetchState?.message === PAYMENT_STATES.PAYMENT_LINK_SUCCESS && (
                        <Fade in={true} mountOnEnter unmountOnExit appear timeout={800}>
                            <Button role={'link'} href={paymentLink} variant={'contained'} color={'primary'} className={'payment-action'} fullWidth>
                                Pay Now
                            </Button>
                        </Fade>
                    )}
            </div>
        </Fade>
    );
};
