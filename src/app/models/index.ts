import { Models } from '@rematch/core';

import { auth } from './auth/auth';
import { dashboard } from './dashboards/dashboard';
import { onboarding } from './auth/onboarding';
import { payments } from './payments/payments';
import { VIRTUAL_CARDS } from './cards';

export interface RootModel extends Models<RootModel> {
    auth: typeof auth;
    dashboard: typeof dashboard;
    onboarding: typeof onboarding;
    payments: typeof payments;
    VIRTUAL_CARDS: typeof VIRTUAL_CARDS;
}
export const models: RootModel = { auth, onboarding, dashboard, payments, VIRTUAL_CARDS };
