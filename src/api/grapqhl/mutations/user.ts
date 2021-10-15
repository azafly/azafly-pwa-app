import { gql } from '@apollo/client';

export const INSERT_NEW_USER = gql`
    mutation insertNewUser(
        $id: String!
        $email: String!
        $email_verified: Boolean
        $image_url: String
        $display_name: String
        $phone: String
        $firebase_id: String!
    ) {
        insert_user_one(
            object: {
                id: $id
                email: $email
                email_verified: $email_verified
                image_url: $image_url
                display_name: $display_name
                phone: $phone
                firebase_id: $firebase_id
            }
            on_conflict: { constraint: users_pkey }
        ) {
            created_at
            email
            email_verified
            id
            image_url
            phone
            firebase_id
        }
    }
`;

export const USER_ON_SIGN_UP = gql`
    mutation updateUserOnSignUp($displayName: String!, $email: String!) {
        update_user(_set: { display_name: $displayName }, where: { email: { _eq: $email } }) {
            affected_rows
        }
    }
`;
