import { gql } from '@apollo/client';

export const INSERT_NEW_USER = gql`
    mutation insertNewUser(
        $id: uuid!
        $email: String!
        $email_verified: Boolean
        $image_url: String
        $display_name: String
        $phone: String
        $firebase_id: String!
    ) {
        insert_users_one(
            object: {
                id: $id
                email: $email
                email_verified: $email_verified
                image_url: $image_url
                display_name: $display_name
                phone: $phone
                firebase_id: $firebase_id
            }
            on_conflict: { constraint: users_email_key }
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
    mutation updateUser($email: String, $displayName: String, $photoURL: String, $phone: String, $document_url: String) {
        update_users(
            where: { email: { _eq: $email } }
            _set: { display_name: $displayName, image_url: $photoURL, phone: $phone, document_url: $document_url }
        ) {
            affected_rows
        }
    }
`;

export const UPDATE_USER_IMAGE_URL = gql`
    mutation updateProfileImageUrl($id: uuid!, $photoURL: String!) {
        update_users_by_pk(pk_columns: { id: $id }, _set: { image_url: $photoURL }) {
            id
            document_url
            image_url
        }
    }
`;

export const UPDATE_USER_KYC_URL = gql`
    mutation updateKYCDocUrl($id: uuid!, $document_url: String!) {
        update_users_by_pk(pk_columns: { id: $id }, _set: { document_url: $document_url }) {
            id
            document_url
            image_url
        }
    }
`;

export const UPDATE_IS_NEW_USER = gql`
    mutation updateNewUser($email: String!, $address: String!, $country: String!, $document_url: String, $phone: String!) {
        update_users(
            where: { email: { _eq: $email } }
            _set: { is_new_user: false, address: $address, country: $country, document_url: $document_url, phone: $phone }
        ) {
            affected_rows
        }
    }
`;
