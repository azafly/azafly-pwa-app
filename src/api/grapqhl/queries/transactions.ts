import { gql } from '@apollo/client'

export const GetUserTransactions = gql`
query getUserTransactions($id: String!) {
  transaction(where: {user_id: {_eq: $id}}, order_by: {created_at: desc})  {
    amount
    created_at
    id
    is_success_done
    name
    tasks(where: {}, order_by: {created_at: asc, isDone: asc}) {
      created_at
      id
      info_text
      isDone
      updated_at
      transaction_id
      user_id
    }
  }
}
`
