import gql from 'graphql-tag';

export const GET_EXPENSE_PER_EVENT = gql`
    query expensesMovementPagination($paginationPage:Int!, $event:Int!) {
        expensesMovementPagination(page: $paginationPage, event: $event) {
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

export const BLOCK_EXPENSE_PER_EVENT = gql`
    mutation blockedMovement($id: Int!,$status: Int!){
        blockedMovement(id:$id,status:$status){
            active
        }
    }  
`;

export const DELETE_EXPENSE_PER_EVENT = gql`
    mutation deleteMutation($id:Int!){
        deleteMovement(id:$id) {
            id
        }
    }
`;

export const SEARCH_EXPENSES_PER_EVENT = gql`
    query searchExpenses($query: String!, $currentPageSearch:Int!) {
        searchExpenses(query:$query, page:$currentPageSearch) {
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
