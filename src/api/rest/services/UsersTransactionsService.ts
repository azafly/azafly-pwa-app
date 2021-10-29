/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class UsersTransactionsService {
    /**
     * Fetches estimate of payment based on currency and rate
     * user passes target and source currency as well as amount to be paid and expects estimates and fees breakdown based on current rates and payment methods
     *
     * @param clientApiToken
     * @param requestBody
     * @returns any Total extimation breakdown in both target and source currencies
     * @throws ApiError
     */
    public static postUsersTransactionsService(
        clientApiToken: string = '{{client-api-token}}',
        requestBody?: {
            /**
             * sources currency | restricted to certain currencies e.g NGN
             */
            source_currency?: string;
            /**
             * target currency
             */
            target_currency?: string;
            /**
             * amount that needs to be sent
             */
            target_amount?: number;
            transaction_id?: string;
        }
    ): CancelablePromise<{
        payment_offer_id?: string;
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
    }> {
        return __request({
            method: 'POST',
            path: `/api/v1/payments/offers`,
            headers: {
                'client-api-token': clientApiToken
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `bad input parameter`,
                401: `Unauthorized`
            }
        });
    }
}
