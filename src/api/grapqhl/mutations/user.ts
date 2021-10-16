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

export const UPDATE_USER = gql`
    mutation updateUser($email: String!, $displayName: String!, $photoURL: String, $phone: String) {
        update_user(where: { email: { _eq: $email } }, _set: { display_name: $displayName, image_url: $photoURL, phone: $phone }) {
            affected_rows
        }
    }
`;
