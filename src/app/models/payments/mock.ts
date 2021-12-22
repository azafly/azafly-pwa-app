import { delay } from 'libs';

export type CurrencyCode = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'CAD';

export const currencies = {
    NGN: {
        USD: {
            rate: 581
        },
        EUR: {
            rate: 620
        },
        GBP: {
            rate: 679
        },
        CAD: {
            rate: 500
        }
    }
};
export function mockAPIRequest<T>(data: T, delayTime = 1500): Promise<{ data: T }> {
    return new Promise(resolve => {
        delay(delayTime);
        resolve({ data: data });
    });
}

export function getCurrencyRates() {
    return mockAPIRequest(currencies);
}