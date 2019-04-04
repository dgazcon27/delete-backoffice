import gql from 'graphql-tag';

export const CREATE_MOVEMENT = gql`
	mutation createMovement($movementsType: String!, $amount: Int!, $reference: String!
		$comment: String!, $type: String!, $bankAccount: Int!, $event: Int!,
		$createdBy: Int!, $updatedBy: Int!, $category: Int!) {
		createMovement(movementsType:$movementsType, amount: $amount, reference: $reference,
		comment: $comment, type: $type, bankAccount: $bankAccount, event: $event, createdBy: $createdBy,
		updatedBy: $updatedBy, category: $category) {
			id
		}
	}
`;

export const UPDATE_MOVEMENT = gql`
	mutation updateMovement($id: Int!, $purchaseRequest: Int, $amount: Float, $reference: String, 
		$comment: String, $type: String, $bankAccount: Int, $updatedBy: Int, $category: Int!) {
			updateMovement(id: $id, purchaseRequest: $purchaseRequest, amount: $amount, reference: $reference, 
				comment: $comment, type: $type, bankAccount: $bankAccount, updatedBy: $updatedBy, 
				category: $category) {
					id
			}
		}
`;

export const GET_MOVEMENT_BY_ID = gql`
	query movementId($id: Int!){
		movementId(id:$id){
			id
			amount
			bankAccount{
				id
				accountNumber
				owner{
					id
					name
					lastName
				}
			}
			event{
				name
				id
			}
			category{
				id
				name
			}
			type
			reference
			comment
			movementsType
		}
	}
`;


export const GET_EXPENSE_PER_EVENT = gql`
    query expensesMovementPagination($paginationPage:Int!, $event:Int!) {
        expensesMovementPagination(page: $paginationPage, event: $event) {
            data {
                id
                reference
                amount
                bankAccount{
                    id
                    accountNumber
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
                    accountNumber
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

export const GET_INCOME_PER_EVENT = gql`
    query incomeMovementPagination($paginationPage:Int!, $event:Int!) {
        incomeMovementPagination(page: $paginationPage, event: $event) {
            data {
                id
                reference
                amount
                bankAccount{
                    id
                    accountNumber
                }
                active
                category{
                    id
                    name
                }
            }
            total
        }
    }
`;
export const GET_ALL_INCOME_PER_EVENT = gql`
    query incomeMovementQuery( $event:Int!) {
        incomeMovementQuery(event: $event) {
        id 
        amount
        reference
        type
        category {
        name
        }
        movementsType
          bankAccount {
            id
            accountNumber
          }
        }
    }
`;
export const GET_ALL_EXPENSE_PER_EVENT = gql`
    query expensesMovementQuery( $event:Int!) {
        expensesMovementQuery(event: $event) {
                id
                reference
                amount
                bankAccount{
                    id
                    accountNumber
                }
                active
                category{
                    name
                }
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
                    accountNumber
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
