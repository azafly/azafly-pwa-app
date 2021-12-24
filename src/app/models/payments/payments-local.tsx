// import { createModel } from '@rematch/core';

// import { RootModel } from '../index';

// interface APIFetchState {
//     result?: 'error' | 'success';
//     type?: string;
//     message?: string;
//     loading?: boolean;
// }

// interface LocalPaymentState {
//     apiFetchState: APIFetchState;
//     buyAmount: number;
//     buyCurrency: CurrencyCode;
//     sellCurrencyTotalToPay: number;
//     rates: any;
//     sellCurrency: CurrencyCode;
//     upperBoundLimitExceeded: boolean;
//     loverBoundLimitNotReached: boolean;
// }

// const initialState: LocalPaymentState = {
//     apiFetchState: {},
//     buyAmount: 100,
//     buyCurrency: 'CAD' as CurrencyCode,
//     sellCurrencyTotalToPay: 0,
//     rates: null,
//     sellCurrency: 'NGN' as CurrencyCode,
//     upperBoundLimitExceeded: false,
//     loverBoundLimitNotReached: false
// };

// export const localPayments = createModel<RootModel>()({
//     state: initialState,
//     reducers: {},
//     effects: dispatch => {
//         return {};
//     }
// });

export {};
