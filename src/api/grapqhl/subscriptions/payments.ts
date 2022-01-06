import { gql } from '@apollo/client';

export const GET_EXCHANGE_RATES = gql`
    subscription GetExchangeRates {
        exchange_rates {
            currency_source
            currency_target
            rate
            is_active
        }
    }
`;
