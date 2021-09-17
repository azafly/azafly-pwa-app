
import { gql } from '@apollo/client'

export const UPDATE_TASK = gql
    `
mutation updateTask($id: uuid! $transaction_id: uuid! $user_id: String! $is_done:Boolean!) {
  update_task(where: {id: {_eq: $id}, transaction_id: {_eq: $transaction_id}, user_id: {_eq:$user_id}}, _set: {isDone: $is_done}) {
    returning {
      id
      info_text
      isDone
    }
  }
}

`