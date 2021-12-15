import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query getCurrentUser($id: uuid!) {
        users_by_pk(id: $id) {
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
