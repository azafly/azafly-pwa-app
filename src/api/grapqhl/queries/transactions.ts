import { gql } from '@apollo/client';

export const GetUserTransactions = gql`
    query getUserTransactions($id: uuid!) {
        transaction(where: { user_id: { _eq: $id } }, order_by: { is_success_done: asc, updated_at: desc }) {
            amount
            created_at
            id
            is_success_done
            name
        }
    }
`;
