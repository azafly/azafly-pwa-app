import { gql } from '@apollo/client'

export const GET_CURRENT_USER = gql`
 query getCurrentUser($email: String!, $id: String!) {
  user_by_pk(email: $email, id: $id) {
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
      tasks(where: {user_id: {_eq: $id}},  order_by: {created_at: asc, isDone: asc}) {
        created_at
        info_text
        isDone
      }
    }
  }
}

`

export const GET_USER_EMAIL = gql`
   query getUserEmail($email: String! $id: String!) {
  user_by_pk(email: $email, id: $id) {
    email
    email_verified
    display_name
    image_url
    id
    phone
  }
}
`


export const INSERT_NEW_USER = gql`
mutation insertNeUser($email: String! $email_verified: Boolean $image_url: String $display_name: String $phone: String) {
  insert_user_one(object: {email: $email, email_verified: $email_verified, image_url: $image_url, display_name: $display_name, phone: $phone}) {
    created_at
    email
    email_verified
    id
    image_url
    phone
  }
}
`

