import { Models } from '@rematch/core';

import { auth } from './auth';
import { dashboard } from './dashboard';
import { localPayments } from './payments/payments-local';
import { onboarding } from './onboarding';
import { payment } from './payment';

export interface RootModel extends Models<RootModel> {
    auth: typeof auth;
    dashboard: typeof dashboard;
    localPayments: typeof localPayments;
    onboarding: typeof onboarding;
    payment: typeof payment;
}
export const models: RootModel = { auth, onboarding, dashboard, payment, localPayments };
