import gql from 'graphql-tag';

export const GET_TICKET = gql`
	query boxOfficeSalesPagination($paginationPage: Int!) {
		boxOfficeSalesPagination(page: $paginationPage) {
			data {
				id
				totalPrice
				pendingPayment
				totalPaid
				user{
					id
					name
					lastName
					dni
				}
				access{
					id
					name
				}
				event{
					id
					name
					eventStart
				}
				comment
			}
			total
		}
	}
`;

export const ASSIGN_TICKET = gql`
	mutation updateUserPurchaseRequest ($id:Int!, $user:Int, $updatedBy:Int){
		 updateUserPurchaseRequest (id:$id, user:$user, updatedBy:$updatedBy) {
			id
		}
	}
`;
