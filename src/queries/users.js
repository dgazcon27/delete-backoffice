import gql from 'graphql-tag';

export const GET_USERS = gql`
	query users($paginationPage:Int!) {
		users(page:$paginationPage) {
			data{
				name
				lastName
				id
				status {
				name
				id
				}
			}
			total
		}
	}
`;

export const BLOCK_USER = gql`
	mutation blockUser($id:Int!, $status:Int!) {
		blockedUser(id:$id,status:$status) {
			name
			id
			status {
				name
				id
			}
		}
	}
`;

export const DELETE_USER = gql`
	mutation deleteUser($id:Int!){
		deleteUser(id:$id) {
			id
			name
		}
	}
`;

export const CREATE_USER = gql`
	mutation createUser($name:String!, $email:String!, $password:String!, $lastName:String!, $phone:String!, $dni:String!, $birthDate:String!, $role:Int!, $citizenship:Int!){
		createUser(name:$name, email:$email, password:$password, lastName:$lastName, phone:$phone, dni:$dni, birthDate:$birthDate, role:$role, citizenship:$citizenship) {
			name
		}
	}
`;

export const GET_ROLES = gql`
	query{
		roless{
			id
			name
			description
		}
	}
`;
