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
            used_free_consultation
            transactions {
                id
                amount
                id
                is_success_done
                service_type
                tasks(where: { user_id: { _eq: $id } }, order_by: { created_at: asc, isDone: asc }) {
                    created_at
                    info_text
                    isDone
                }
            }
        }
    }
`;
