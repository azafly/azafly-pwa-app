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
        payment_offer(where: { user_id: { _eq: $id }, payment_status: { _neq: "PAID" } }, order_by: { updated_at: desc }) {
            id
            created_at
            payment_status
            source_amount
            source_currency
            target_currency
            total_in_target_with_charges
            total_to_pay_in_source_currency
            metadata
            payment_intent_payload
        }
    }
`;

export const GetPendingOfferById = gql`
    query getPendingOfferById($offer_id: uuid!) {
        payment_offer(where: { id: { _eq: $offer_id } }) {
            id
            created_at
            payment_status
            source_amount
            source_currency
            target_currency
            total_in_target_with_charges
            total_to_pay_in_source_currency
            metadata
            payment_intent_payload
        }
    }
`;

export const FilterTransactionsByDateRange = gql`
    query filterTransactionsByDateRange($id: uuid!, $start_date: timestamptz!, $end_date: timestamptz!) {
        transaction(
            where: { user_id: { _eq: $id }, created_at: { _gte: $start_date, _lte: $end_date } }
            order_by: { is_success_done: asc, updated_at: desc }
        ) {
            amount
            created_at
            id
            is_success_done
            name
            updated_at
            payment_offer {
                payment_status
                source_amount
                source_currency
                target_currency
                total_in_target_with_charges
                total_to_pay_in_source_currency
            }
        }
    }
`;
