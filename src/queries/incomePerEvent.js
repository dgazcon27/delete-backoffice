import gql from 'graphql-tag';

export const GET_INCOME_PER_EVENT = gql`
    query incomeMovementPagination($paginationPage:Int!, $event:Int!) {
        incomeMovementPagination(page: $paginationPage, event: $event) {
            data {
                id
                reference
                amount
                bankAccount{
                    id
                }
                active
                category{
                    name
                }
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

export const DELETE_INCOME_PER_EVENT = gql`
    mutation deleteMutation($id:Int!){
        deleteMovement(id:$id) {
            id
        }
    }
`;

export const SEARCH_INCOME_PER_EVENT = gql`
    query searchIncome($query:String!, $currentPageSearch:Int!){
        searchIncome(query:$query, page: $currentPageSearch) {
            data{
                id
                reference
                amount
                bankAccount{
                    id
                }
                active
                category{
                    name
                }
            }	
            total
        }
    }
`;
