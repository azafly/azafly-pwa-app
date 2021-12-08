import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query getCurrentUser($id: String!) {
        users(where: { firebase_id: { _eq: $id } }) {
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
        }
    }
`;

export const GET_CURRENT_USER_BY_EMAIL = gql`
    query getCurrentUserByEmail($email: String!) {
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
        }
    }
`;
