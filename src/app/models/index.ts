import { Models } from '@rematch/core';

import { auth } from './auth';
import { dashboard } from './dashboard';
import { localPayments } from './payments/payments-local';
import { onboarding } from './onboarding';
import { payment } from './payment';
import { VIRTUAL_CARDS } from './cards';

export interface RootModel extends Models<RootModel> {
    auth: typeof auth;
    dashboard: typeof dashboard;
    localPayments: typeof localPayments;
    onboarding: typeof onboarding;
    payment: typeof payment;
    VIRTUAL_CARDS: typeof VIRTUAL_CARDS;
}
export const models: RootModel = { auth, onboarding, dashboard, payment, localPayments, VIRTUAL_CARDS };
