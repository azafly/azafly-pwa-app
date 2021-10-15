import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query getCurrentUser($email: String!, $id: String!) {
        user_by_pk(id: $id) {
            display_name
            email
            email_verified
            id
            image_url
            phone
        }
    }
`;
