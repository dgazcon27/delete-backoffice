import gql from 'graphql-tag';

// typeInvited is a role id
export const CREATE_GUEST = gql`
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

export const UPDATE_GUEST = gql`
	mutation updateInvited(
		$id: Int!,
		$name: String!,
		$lastName: String!,
		$phone: String!,
		$dni: String!,
		$access: Int!,
		$status: Int!,
		$event: Int!,
		$typeInvited: Int!,
		$citizenship: Int!,
		$role: Int!,
		$updatedBy: Int!
	) {
		updateInvited(
		id: $id,
		name: $name,
		lastName: $lastName,
		phone: $phone,
		dni: $dni,
		access: $access,
		status: $status,
		event: $event,
		typeInvited: $typeInvited,
		citizenship: $citizenship,
		role: $role,
		updatedBy: $updatedBy
		) {
			id
			user{
				name
				lastName
				phone
				dni
				birthDate
				role{
					id
				}
				citizenship{
					id
				}
			}
			access{
				id
			}
			event{
				id
			}
			typeInvited{
				id
			}
			status{
				id
			}
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
			total
		}
	}
`;

export const SEARCH_INVITED = gql`
	query search($query: String!,$currentPageSearch: Int!){
		search(query: $query, page:$currentPageSearch) {
			inviteds {
				data {
					id
					user {
						name
						lastName
					}
				}
				total
			}
		}
	}
`;

export const GET_GUEST_BY_ID = gql`
	query invited($id: Int!){
		invited(id: $id){
			id
			user{
				name
				lastName
				phone
				dni
				birthDate
				role{
					id
				}
				citizenship{
					id
				}
			}
			access{
				id
			}
			event{
				id
			}
			typeInvited{
				id
			}
			status{
				id
			}
		}
	}
`;

export const DELETE_GUEST = gql`
	mutation deleteInvited($id: Int!){
		deleteInvited(id:$id) {
			id
		}
	}
`;
