

import { gql } from '@apollo/client'

export const INSERT_FREE_CONSULTATION = gql
    `
mutation insertNewFreeConsulationTransaction($user_id: String!, $email:String!) {
  insert_transaction_one(object: {user_id: $user_id}) {
    id
  }
  update_user_by_pk(_set: {used_free_consultation: true}, pk_columns: {email: $email, id: $user_id}) {
    used_free_consultation
  }
}
`