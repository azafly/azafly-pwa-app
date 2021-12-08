import { Models } from '@rematch/core';
import { auth } from './auth';
import { onboarding } from './onboarding';

export interface RootModel extends Models<RootModel> {
    auth: typeof auth;
    onboarding: typeof onboarding;
}
export const models: RootModel = { auth, onboarding };
