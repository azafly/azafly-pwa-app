import { gql } from '@apollo/client';

export const GetCountriesPhones = gql`
    query getCountriesPhones {
        countries {
            code
            name
            phone_code
        }
    }
`;
