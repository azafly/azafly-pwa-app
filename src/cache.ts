import { InMemoryCache, makeVar } from '@apollo/client';
import { Country, NIGERIA } from './features/payments/hooks';

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('token'));
export const intendedAmountVar = makeVar<number>(100);
export const currentSourceCountryVar = makeVar<Country>(NIGERIA);
export const currentTargetCountryVar = makeVar<Country>(NIGERIA);
export const canMoveToNextStepVar = makeVar<boolean>(false);

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return isLoggedInVar();
                    }
                },
                currentSourceCountry: {
                    read() {
                        return currentSourceCountryVar();
                    }
                },
                currentTargetCountry: {
                    read() {
                        return currentTargetCountryVar();
                    }
                },
                canMoveToNextStep: {
                    read() {
                        return canMoveToNextStepVar();
                    }
                },
                intendedAmount: {
                    read() {
                        return intendedAmountVar();
                    }
                }
            }
        }
    }
});
