import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query getCurrentUser($email: String!) {
        users(where: { email: { _eq: $email } }) {
            display_name
            email
            email_verified
            firebase_id
            id
            image_url
            phone
            image_url
            is_new_user
            address
            country
            document_url
        }
    }
`;

export const CHECK_PHONE_NUMBER = gql`
    query checkPhoneExists($phone: String!) {
        users(where: { phone: { _eq: $phone } }) {
            phone
        }
    }
`;
