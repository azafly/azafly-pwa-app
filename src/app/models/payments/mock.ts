import { delay } from 'libs';
import { mockCards } from '../cards';

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

interface TopUpMockArgs {
    currency: CurrencyCode;
    amount: number;
}
export function topUpCard({ currency, amount }: TopUpMockArgs) {
    const updatedCards = mockCards.map(card => {
        if (card.currency === currency) {
            return {
                ...card,
                amount: card.balance + amount
            };
        }
        return card;
    });
    return mockAPIRequest(updatedCards, 10000);
}
