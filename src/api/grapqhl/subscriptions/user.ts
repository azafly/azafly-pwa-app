import { gql } from '@apollo/client';

export const GET_USER_CARD = gql`
    subscription GetUserCards($userId: uuid!) {
        virtual_cards(where: { user_id: { _eq: $userId } }) {
            balance
            card_last_4digits
            currency
            id
            is_active
            issuer_virtual_card_id
        }
    }
`;
