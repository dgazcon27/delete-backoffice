import gql from 'graphql-tag';

export const GET_USERS = gql`
	query users($paginationPage:Int!) {
		users(page:$paginationPage) {
			data{
				name
				lastName
				phone
				dni
				birthDate
				citizenship{
					id
					name
				}
				role{
					id
					name
				}
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

export const EDIT_USER = gql`
	mutation updateUser($id:Int!, $name:String!, $lastName:String!, $phone:String!, $dni:String!, $birthDate:String!, $role:Int!, $citizenship:Int!){
		updateUser(id:$id, name:$name, lastName:$lastName, phone:$phone, dni:$dni, birthDate:$birthDate, role:$role, citizenship:$citizenship) {
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

export const GET_COUNTRYS = gql`
	query{
		countrys{
			id
			value
			name
		}
	}
`;

export const SET_PASSWORD = gql`
	mutation resetPasswordIdUser($id:Int!, $password:String!, $confirmation:String!) {
		resetPasswordIdUser(id:$id, password:$password, confirmation:$confirmation) {
			id
		}
	}
`;


export const GET_CURRENT_USER = gql`
	query getCurrent($token:String!){
		getCurrent(token:$token) {
			id
			name
		}
	}
`;
