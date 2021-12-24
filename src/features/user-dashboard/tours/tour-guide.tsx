import { store } from 'app/store';

export enum TOUR_DASHBOARD_LOCAL {
    PAY_WITH_CARD = 'tour-pay-with-virtual-card',
    PAY_DIRECT = 'tour-pay-direct',
    SEND_FROM = 'tour-send-from',
    SEND_TO = 'tour-send-to',
    START_TOUR = 'start_tour'
}

const {
    payments: { sellCurrency }
} = store.getState();

export const TOUR_DASHBOARD_LOCAL_STEPS = [
    {
        target: `.${TOUR_DASHBOARD_LOCAL.SEND_FROM}`,
        content: <span>Enter the total amount you need to pay Abroad</span>
    },
    {
        target: `.${TOUR_DASHBOARD_LOCAL.SEND_TO}`,
        content: (
            <span>
                {`This is the total you will pay in`} <strong> {sellCurrency}</strong>
            </span>
        )
    },
    {
        target: `.${TOUR_DASHBOARD_LOCAL.PAY_WITH_CARD}`,
        content: (
            <span>
                {`You can top your Virtual card in the desired currency.
                 We will create a new one if you don't already have one`}
            </span>
        )
    },
    {
        target: `.${TOUR_DASHBOARD_LOCAL.PAY_DIRECT}`,
        content: <span> {'We can also help you pay directly. You just need to provide a few additional information'}</span>
    }
];
