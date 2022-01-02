import { Button, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Fade, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { CARD_PAYMENT_STATES } from 'app/models/payments';
import { ConversionCard } from 'features/user-dashboard/local-transaction-views/conversion-card';
import { createPaymentIntent, getInitialOffer } from 'services/rest-clients/user-payment';
import { Dispatch, RootState } from 'app/store';
import { formatCurrency } from 'libs';
import { otherCountries } from 'mocks/payment';
import { ThreeDots } from 'components/css-loaders/three-dots';
import { useUserContext } from 'hooks/use-user-context';

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
    const { payments } = useSelector(({ payments }: RootState) => ({ payments }));
    const dispatch = useDispatch<Dispatch>();
    const { buyAmount: amount, buyCurrency, sellCurrency, rates, paymentLink, apiFetchState, offerBasedOnRate } = payments || {};

    const handleAmountChange = (e: any) => {
        dispatch.payments.setBuyAmount(e.target.value);
        dispatch.payments.setSellCurrencyTotalToPay(e.target.value * rates[sellCurrency][buyCurrency]['rate']);
        // force conform now button to show, so we can fetch new offer
        setShowInfo(false);
        dispatch.payments.setApiFetchState({
            ...payments?.apiFetchState,
            message: CARD_PAYMENT_STATES.GROUND_ZERO
        });
    };

    const { user } = useUserContext();

    const handleContinueToPayment = async () => {
        try {
            dispatch.payments.setApiFetchState({ result: 'success', loading: true, message: CARD_PAYMENT_STATES.FETCHING_PAYMENT_LINK });
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
                description: `${amount} ${buyCurrency} top_up_virtual_card`,
                load_on_card: true
            });
            dispatch.payments.setPaymentLink(payment_link);
            dispatch.payments.setApiFetchState({ result: 'success', loading: false, message: CARD_PAYMENT_STATES.PAYMENT_LINK_SUCCESS });
        } catch (error) {
            dispatch.payments.setApiFetchState({ result: 'error', loading: false });
            dispatch.payments.setApiFetchState({
                result: payments?.apiFetchState?.result ?? null,
                loading: false,
                message: CARD_PAYMENT_STATES.ERROR
            });
        }
    };

    const handleConfirmToPayment = async () => {
        try {
            dispatch.payments.setApiFetchState({ result: 'error', loading: true, message: CARD_PAYMENT_STATES.CREATING_OFFER });
            const { data } = await getInitialOffer({
                source_currency: buyCurrency,
                source_amount: parseInt(`${amount}`),
                target_currency: sellCurrency
            });
            dispatch.payments.setApiFetchState({ result: 'success', loading: false, message: CARD_PAYMENT_STATES.OFFER_CREATED });
            dispatch.payments.setOfferBasedOnRate(data.data);
            setShowInfo(true);
            handleContinueToPayment();
        } catch (error) {
            dispatch.payments.setApiFetchState({ ...apiFetchState, result: 'error', loading: false, message: CARD_PAYMENT_STATES.ERROR });
        }
    };

    // todo set close modal when pay now clicked
    const classes = useStyles();

    useEffect(() => {
        dispatch.payments.setApiFetchState({
            ...payments?.apiFetchState,
            message: CARD_PAYMENT_STATES.GROUND_ZERO
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    <strong>{buyCurrency}</strong> virtual card. <span className={'more_info'}> *Rate and fee subject to change until payment. </span>
                </Typography>

                {showRateInfo && offerBasedOnRate && (
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
                                Rate:&nbsp;
                                {offerBasedOnRate.exchange_rate_info?.base_rate && (
                                    <span className={'amounts'}>
                                        {formatCurrency({
                                            currency: sellCurrency,
                                            amount: offerBasedOnRate.exchange_rate_info?.base_rate,
                                            countryCode: 'NG'
                                        })}
                                    </span>
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

                {payments?.apiFetchState?.loading && <ThreeDots variantColor={'base'} />}
                {!payments?.apiFetchState?.loading &&
                    (payments?.apiFetchState?.message === CARD_PAYMENT_STATES.GROUND_ZERO ||
                        payments?.apiFetchState?.message !== CARD_PAYMENT_STATES.PAYMENT_LINK_SUCCESS) && (
                        <Button onClick={handleConfirmToPayment} variant={'outlined'} color={'primary'} className={'payment-action'} fullWidth>
                            {'Confirm'}{' '}
                        </Button>
                    )}

                {payments?.apiFetchState?.result &&
                    payments?.apiFetchState?.message === CARD_PAYMENT_STATES.PAYMENT_LINK_SUCCESS &&
                    !payments?.apiFetchState?.loading && (
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
