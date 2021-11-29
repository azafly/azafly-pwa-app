import { lazy, Suspense } from 'react';

import { ThreeDots } from 'components/css-loaders/three-dots';

const LazyOnboardingMobileStepper = lazy(() => import('./mobile-stepper'));

export const OnboardingPreferences = () => {
    return (
        <Suspense fallback={<ThreeDots variantColor={'base'} />}>
            <LazyOnboardingMobileStepper />
        </Suspense>
    );
};
