import gql from 'graphql-tag';


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
		status{
			id
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
	mutation createPurchaseRequest($createdBy:Int!, $updatedBy:Int!, $user:ID!, $access:ID!, $event:ID!, $status:ID!, $comment:String!){
		createPurchaseRequest(createdBy:$createdBy, updatedBy:$updatedBy , user:$user, access:$access, event:$event, status:$status, comment:$comment){
			id
		}
	}
`;

export const EDIT_PURCHASE_REQ = gql`
mutation updatePurchaseRequest ($id:Int!, $user:Int!, $access:Int!, $event:Int!, $status:Int!, $comment:String!, $updatedBy:Int! ){
	updatePurchaseRequest(id:$id, user:$user, access:$access, event:$event, status:$status, comment:$comment, updatedBy:$updatedBy )
	{id}
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
}
`; 
