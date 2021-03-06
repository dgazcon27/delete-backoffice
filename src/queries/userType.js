import gql from 'graphql-tag';

export const GET_ROLES = gql`
	query roles($paginationPage:Int!) {
		roles(page:$paginationPage) {
			data{
				name
				id
				description
				active
			}
			total
		}
	}
`;

export const BLOCK_ROL = gql`
	mutation blockRol($id:Int!, $status:Int!) {
		blockedRole(id:$id,status:$status) {
			id
			active
		}
	}
`;

export const DELETE_ROL = gql`
	mutation deleteRole($id:Int!){
		deleteRole(id:$id) {
			id
			name
		}
	}
`;

export const CREATE_ROL = gql`
	mutation createRol($name:String!, $rolDescription:String!){
		createRole(name:$name, description:$rolDescription){
			id
			name
		}
	}
`;

export const EDIT_ROL = gql`
	mutation updateRoleRol($id:Int!,$name:String, $rolDescription:String){
		updateRole(id:$id, name:$name, description:$rolDescription){
			id
			name
		}
	}
`;

export const GET_ROL_BY_ID = gql`
	query role($id:Int!){
		role(id:$id) {
			name
			id
			description
		}
	}
`;

