import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query getCurrentUser($id: uuid!) {
        users_by_pk(id: $id) {
            display_name
            email
            email_verified
            id
            image_url
            phone
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
        }
    }
`;
