import gql from 'graphql-tag';

export const GET_PAYMENTS = gql`
	query payments($paginationPage:Int!) {
		payments(page:$paginationPage) {
			data{
				payment{
					id
					amount
					reference
					comment
					type
					created_at
					bankAccount{
						id
						bank{
							name
						}
					}
				}
				purchaseRequest{
					id
				}
			}
			total
		}
	}
`;

export const CREATE_PAYMENT = gql`
	mutation createPayment($purchaseRequest:Int!, $amount:Float!, $reference:String!, $comment:String!, $type:String!, $bankAccount:Int!, $createdBy:Int!, $updatedBy:Int!) {
		createPayment(purchaseRequest:$purchaseRequest, amount:$amount, reference:$reference, comment:$comment, type:$type, bankAccount:$bankAccount, createdBy:$createdBy, updatedBy:$updatedBy) {
			id
			purchaseRequest
			amount
			reference
			comment
			type
			bankAccount
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
