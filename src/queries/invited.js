import gql from 'graphql-tag';

// typeInvited is a role id
export const CREATE_INVITED = gql`
	mutation createInvited(
		$name: String!,
		$lastName: String!,
		$email: String!,
		$phone: String!,
		$dni: String!,
		$access: Int!,
		$status: Int!,
		$event: Int!,
		$typeInvited: Int!,
		$citizenship: Int!,
		$role: Int!,
		$createdBy: Int!,
		$updatedBy: Int!
	) {
		createInvited(
		name: $name,
		lastName: $lastName,
		email: $email,
		phone: $phone,
		dni: $dni,
		access: $access,
		status: $status,
		event: $event,
		typeInvited: $typeInvited,
		citizenship: $citizenship,
		role: $role,
		createdBy: $createdBy,
		updatedBy: $updatedBy
		) {
			id
		}
	}
`;

export const GET_GUESTS = gql`
	query inviteds($paginationPage:Int!) {
		inviteds(page:$paginationPage) {
			data {
				id
				user{
					name
					lastName
				}
			}
		}
	}
`;
