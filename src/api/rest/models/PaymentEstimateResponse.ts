/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExchangeRateInfo } from './ExchangeRateInfo';
import type { FeesBreakDown } from './FeesBreakDown';

export type PaymentEstimateResponse = {
    payment_offer_id?: string;
    source_currency?: string;
    destination_currency?: string;
    amount?: number;
    estimated_rate?: number;
    total_in_target_with_charges?: number;
    total_to_pay_in_source_currency?: number;
    fees_with_promo?: number;
    fees_info?: FeesBreakDown;
    exchange_rate_info?: ExchangeRateInfo;
}
