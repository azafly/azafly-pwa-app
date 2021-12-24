export type CurrencyCode = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'CAD';
export interface VirtualCardObject {
    currency: CurrencyCode;
    countryCode: string;
    amount: number;
    cardNumber: string;
    last4digits: string;
    expiry: string;
    key: string;
    cvv: string;
}

export const mockCards: VirtualCardObject[] = [
    {
        currency: 'EUR',
        key: 'EUR',
        countryCode: 'EU',
        amount: 100,
        cardNumber: '5346 5464 6474',
        last4digits: '7895',
        expiry: '08/24',
        cvv: '123'
    },
    {
        currency: 'GBP',
        key: 'GBP',
        countryCode: 'GB',
        amount: 100,
        cardNumber: '5344 5464 4474',
        last4digits: '5895',
        expiry: '02/27',
        cvv: '890'
    },
    {
        currency: 'NGN',
        key: 'NGN',
        countryCode: 'NG',
        amount: 780000,
        cardNumber: '5344 5464 0474',
        last4digits: '5805',
        expiry: '02/24',
        cvv: '576'
    },
    {
        currency: 'USD',
        key: 'USD',
        countryCode: 'US',
        amount: 1100,
        cardNumber: '5344 5464 4474',
        last4digits: '4895',
        expiry: '02/24',
        cvv: '492'
    },
    {
        currency: 'CAD',
        key: 'CAD',
        countryCode: 'CA',
        amount: 100,
        cardNumber: '5344 5464 3474',
        last4digits: '7896',
        expiry: '02/27',
        cvv: '090'
    }
];
export type CardObject = Record<string, VirtualCardObject>;

export const formatCardArrayToObject = (cards = mockCards) => {
    const cardObjects: CardObject = {};
    cards.forEach(card => {
        cardObjects[card.currency] = card;
    });
    return cardObjects;
};
