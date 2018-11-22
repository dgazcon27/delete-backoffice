import gql from 'graphql-tag';

export const GET_INCOME_PER_EVENT = gql`
    query incomeMovementPagination($page:Int!, $event:Int!) {
        incomeMovementPagination(page: $page, event: $event) {
            data {
                id
                reference
                amount
                bankAccount{
                    id
                }
                active
            }
            total
        }
    }
`;

export const BLOCK_INCOME_PER_EVENT = gql`
    mutation blockedMovement($id: Int!,$status: Int!){
        blockedMovement(id:$id,status:$status){
            active
        }
    }  
`;
