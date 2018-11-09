import gql from 'graphql-tag';

export const GET_USER_BY_DNI = gql`query purchaseRequestAutocomplete($dni:Int!){
	purchaseRequestAutocomplete(dni:$dni){
		id
		name 
		lastName
		email
		phone
	}
}
`;

export const GET_ACCESS_BY_EVENT = gql`query accessByEvent($event:Int!){
	accessByEvent(event:$event){
		id
		access{
				id
				name
			}
	}
}
`;

export const GET_PURCHASE_REQ = gql`
	query purchaseRequests($paginationPage:Int!){
		purchaseRequests(page:$paginationPage){
		data{
			id
			totalPrice
			pendingPayment
			totalPaid
			user{
				id name lastName dni
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

export const GET_USERSS = gql`
	query{ 
			userss{
				id
				name
			}
		}	
`;

export const GET_BANKSS = gql`
	query{ 
			bankss{
				id
				name
			}
		}	
`;


export const DELETE_PURCHASE_REQ = gql`
	mutation deletePurchaseRequest ($id:Int!){
		 deletePurchaseRequest (id:$id) {
			id
		}
	}
`;

export const CREATE_PURCHASE_REQ = gql`
	mutation createPurchaseRequest($createdBy:Int!, $updatedBy:Int!, $user:ID!, $access:ID!, $event:ID!, $comment:String!){
		createPurchaseRequest(createdBy:$createdBy, updatedBy:$updatedBy , user:$user, access:$access, event:$event, comment:$comment){
			id
		}
	}
`;

export const EDIT_PURCHASE_REQ = gql`
mutation updatePurchaseRequest ($id:Int!, $user:Int!, $access:Int!, $event:Int!, $comment:String!, $updatedBy:Int! ){
	updatePurchaseRequest(id:$id, user:$user, access:$access, event:$event, comment:$comment, updatedBy:$updatedBy )
	id
}
`;

export const GET_PURCHASE_BY_ID = gql`
	query purchaseRequest($id:Int!){
		purchaseRequest(id:$id) {
			id
			totalPrice
			pendingPayment
			totalPaid
			user{
				id name lastName dni phone email
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
	}
`;

export const PURCHASE_REQUEST_PAY = gql`
	query purchaseRequestPayment($id:Int!){
		purchaseRequestPayment(id:$id){
			payment{
				id
				amount
				reference
				comment
				type
				created_at
				bankAccount{
					id
					type
					currency
					bank{
						id
						name
					}
				}
			}
			id
	}
}`;

export const SEARCH_PURCHASE_REQUEST = gql`
	query search($query: String!,$page: Int!){
		search(query: $query, page:$page) {
			purchases {
				data{
				id
				totalPrice
				pendingPayment
				totalPaid
				user{
					id name lastName dni
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
	}
`;
