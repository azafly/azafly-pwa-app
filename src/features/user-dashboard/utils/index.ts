import { currencies } from 'app/models/payments/mock';

export type ExchangeRates = {
    readonly __typename: string;
    readonly created_at: string;
    readonly currency_source: string;
    readonly currency_target: string;
    readonly id: string;
    readonly is_active: boolean;
    readonly rate: string;
    readonly updated_at: string;
};

export const formatHasuraExchangeRates = (base: string, rates: ExchangeRates[]) => {
    const ratesObject: Record<string, any> = {};
    rates.forEach(rate => {
        if (rate.currency_target === base) {
            if (rate.currency_source) {
                ratesObject[rate.currency_source] = {
                    rate: rate.rate
                };
            }
        }
    });
    return {
        [base]: ratesObject
    } as typeof currencies;
};
