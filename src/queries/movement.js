import gql from 'graphql-tag';

export const CREATE_MOVEMENT = gql`
	mutation createMovement($movementsType: String!, $amount: Int!, $reference: String!
		$comment: String!, $type: String!, $bankAccount: Int!, $event: Int!,
		$createdBy: Int!, $updatedBy: Int!) {
		createMovement(movementsType:$movementsType, amount: $amount, reference: $reference,
		comment: $comment, type: $type, bankAccount: $bankAccount, event: $event, createdBy: $createdBy,
		updatedBy: $updatedBy) {
			id
		}
	}
`;

export const UPDATE_MOVEMENT = gql`
	mutation updateMovement($id: Int!, $purchaseRequest: Int, $amount: Float, $reference: String, 
		$comment: String, $type: String, $bankAccount: Int, $updatedBy: Int) {
			updateMovement(id: $id, purchaseRequest: $purchaseRequest, amount: $amount, reference: $reference, 
				comment: $comment, type: $type, bankAccount: $bankAccount, updatedBy: $updatedBy) {
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
			type
			reference
			comment
			movementsType
		}
	}
`;
