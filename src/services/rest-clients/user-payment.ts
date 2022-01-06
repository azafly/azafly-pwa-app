import { v4 as uuidv4 } from 'uuid';

import { axiosClient, RATES_URL } from './index';
import { PURPOSE } from 'features/payments/forms/payment-info/form-fields';

export type ApiRequestMethods = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';

const OFFERS_ENDPOINT = '/offers';
const CREATE_INTENT_ENDPOINT = '/create-intent';
export type CurrencyCode = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'CAD';
export interface ExchangeRatesResponse {
    target_currency: CurrencyCode;
    rates: {
        currency: CurrencyCode;
        rate: number;
    }[];
}

export interface GetOffersRequestBody {
    source_currency: string;
    target_currency: string;
    source_amount?: number;
}

export interface GetOffersResponseData {
    target_currency: string;
    source_amount: number;
    payment_offer_id: string;
    source_currency?: string;
    destination_currency?: string;
    amount?: number;
    estimated_rate?: number;
    total_in_target_with_charges?: number;
    total_to_pay_in_source_currency?: number;
    fees_with_promo?: number;
    fees_info?: {
        our_charges?: number;
        processing_fee?: number;
        total?: number;
    };
    exchange_rate_info?: {
        base_rate?: number;
        buffer?: number;
        promotional_rate?: number;
    };
}

export interface GetOffersResponse {
    data: GetOffersResponseData;
    status: string;
}
const payment_options = 'account,card,banktransfer,mpesa,paga,barter';

export interface CreatePaymentIntentBody {
    payment_offer_id: string;
    email: string;
    payment_title: string;
    currency: string;
    description: string;
    telephone?: string;
    name: string;
    document_url?: string;
    load_on_card?: boolean;
}

export interface CreatePaymentIntentResponse {
    status: string;
    data: {
        payment_link: string;
    };
}

export interface PaymentInfo {
    fullname: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    references: string;
    by: string;
    terms: boolean;
    purpose: PURPOSE;
}

export const getInitialOffer = async ({ source_currency, source_amount, target_currency }: GetOffersRequestBody) => {
    return axiosClient().post<GetOffersResponse>(OFFERS_ENDPOINT, {
        source_currency,
        target_currency,
        source_amount,
        transaction_id: uuidv4()
    });
};

export const getOfferById = async (offerId: string) => axiosClient().get<GetOffersResponse>(`${OFFERS_ENDPOINT}/${offerId}`);

export const createPaymentIntent = async ({
    payment_offer_id,
    email,
    payment_title,
    currency,
    description,
    telephone,
    name,
    document_url,
    load_on_card = false
}: CreatePaymentIntentBody) => {
    return axiosClient().post<CreatePaymentIntentResponse>(CREATE_INTENT_ENDPOINT, {
        payment_offer_id,
        email,
        payment_title,
        currency,
        description,
        telephone,
        name,
        payment_options,
        document_url,
        load_on_card,
        logo: 'https://image.gif'
    });
};

export const getCurrentExchangeRates = () =>
    axiosClient()
        .get<{ data: ExchangeRatesResponse }>(`${RATES_URL}`)
        .then(({ data }) => {
            const rates: Record<string, number> = {};
            data.data.rates.forEach(({ currency, rate }) => (rates[currency] = rate));
            return {
                [data.data.target_currency]: rates
            };
        })
        .catch(() => null);

export interface LocalStorageInitialOffer {
    source_currency: string;
    source_amount: number;
    target_currency: string;
    total_in_target_with_charges: number;
    total_to_pay_in_source_currency: number;
    fees_with_promo: number;
    fees_info: {
        our_charges: number;
        total: number;
    };
    exchange_rate_info: {
        base_rate: number;
        promotional_rate: number;
    };
    payment_offer_id: string;
}
