import gql from 'graphql-tag';

export const GET_PAYMENTS = gql`
	query payments($paginationPage:Int!) {
		payments(page:$paginationPage) {
			data {
				id
				amount
				reference
				comment
				type
				created_at
				bankAccount {
					id
					bank {
						id
						name
					}
					currency
				}

			}
			total
		}
	}
`;


export const SEARCH_PAYMENT_LIST = gql`
	query searchPaymentList($query:String!,$currentPageSearch: Int!) {
		searchPaymentList(query:$query, page:$currentPageSearch) {
			  data {
      amount
      type
      reference
      id
      created_at
      bankAccount{
        bank {
        id
        name
      }}
    }
    total
  }
}
`;


export const CREATE_PAYMENT = gql`
	mutation createPayment($purchaseRequest:Int!, $amount:Int!, $reference:String!, $comment:String!, $type:String!, $bankAccount:Int!, $createdBy:Int!, $updatedBy:Int!) {
		createPayment(purchaseRequest:$purchaseRequest, amount:$amount, reference:$reference, comment:$comment, type:$type, bankAccount:$bankAccount, createdBy:$createdBy, updatedBy:$updatedBy) {
	id
		}
	}
`;
export const EDIT_PAYMENT = gql`
	mutation updatePayment($id:Int!, $purchaseRequest:Int!, $amount:Float!, $reference:String!, $comment:String!, $type:String!, $bankAccount:Int!, $updatedBy:Int!) {
		updatePayment(id:$id, purchaseRequest:$purchaseRequest, amount:$amount, reference:$reference, comment:$comment, type:$type, bankAccount:$bankAccount, updatedBy:$updatedBy) {
			id
			amount
			reference
			comment
			type
		}
	}
`;

export const BLOCK_PAYMENT = gql`
	mutation blockLocation($id:Int!, $status:Int!) {
		blockedLocation(id:$id,status:$status) {
			name
			id
			status{
				name
				id
			}
		}
	}
`;

export const DELETE_PAYMENT = gql`
	mutation deletePayment($id:Int!){
		deletePayment(id:$id) {
			id
		}
	}
`;

export const GET_BANK_ACCOUNTS = gql`
	query bankAccountss{
		bankAccountss{
			id
			accountNumber
		}
	}
`;

export const GET_PAYMENT_BY_ID = gql`
	query payment($id:Int!){
		payment(id:$id) {
			id
			amount
			reference
			comment
			type
			bankAccount{
				id
				owner {
					id
					name
					lastName
				}
			}
		}
	}
`;

export const GET_CURRENCYS = gql`
	query { 
		currencys {
			id
			description
		}
	}
`;

export const GET_ACCOUNTS_BY_CURRENCY = gql`
	query accountsByCurrency($currency: ID!) {
		accountsByCurrency(currency: $currency) {
			id
			accountNumber
			owner{
				fullName
			}
		}
	}
`;
export const GET_EVENTS_BY_CURRENCY = gql`
	query eventsByCurrency($currency: Int!) {
		eventsByCurrency(currency: $currency) {
			event {
		    id
		    name
		  }
			
		}
	}
`;
