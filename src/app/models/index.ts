import { Models } from '@rematch/core';

import { auth } from './auth';
import { dashboard } from './dashboard';
import { onboarding } from './onboarding';
import { payment } from './payment';

export interface RootModel extends Models<RootModel> {
    auth: typeof auth;
    onboarding: typeof onboarding;
    dashboard: typeof dashboard;
    payment: typeof payment;
}
export const models: RootModel = { auth, onboarding, dashboard, payment };
