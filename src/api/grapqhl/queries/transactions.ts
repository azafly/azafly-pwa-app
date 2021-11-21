import { gql } from '@apollo/client';

export const GetUserTransactions = gql`
    query getUserTransactions($id: uuid!) {
        transaction(where: { user_id: { _eq: $id } }, order_by: { is_success_done: asc, updated_at: desc }) {
            amount
            created_at
            id
            is_success_done
            name
            payment_offer {
                payment_status
                source_amount
                source_currency
                target_currency
                total_in_target_with_charges
                total_to_pay_in_source_currency
            }
            updated_at
        }
    }
`;

export const GetUsersPendingOffers = gql`
    query getUserPendingOffers($id: uuid!) {
        payment_offer(where: { user_id: { _eq: $id }, payment_status: { _eq: "PENDING" } }, order_by: { updated_at: desc }) {
            id
            created_at
            payment_status
            source_amount
            source_currency
            target_currency
            total_in_target_with_charges
            total_to_pay_in_source_currency
        }
    }
`;
