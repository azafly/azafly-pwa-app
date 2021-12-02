import { Models } from '@rematch/core';
import { onboarding } from './onboarding';

export interface RootModel extends Models<RootModel> {
    onboarding: typeof onboarding;
}
export const models: RootModel = { onboarding };
