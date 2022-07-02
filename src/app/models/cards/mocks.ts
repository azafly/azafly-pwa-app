export type CurrencyCode = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'CAD';
export interface VirtualCardObject {
    currency: CurrencyCode | string;
    cardNumber: string;
    last4digits: string;
    isActive?: boolean;
}

export type CardObject = Record<string, VirtualCardObject>;

export const formatCardArrayToObject = (cards = []) => {
    const cardObjects: CardObject = {};
    cards.forEach((card: any) => {
        card.currency = card.currency.toUpperCase();
        cardObjects[card.currency.toUpperCase()] = card;
    });
    return cardObjects;
};
