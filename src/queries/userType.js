import gql from 'graphql-tag';

export const GET_ROLES = gql`
	query roles($paginationPage:Int!) {
		roles(page:$paginationPage) {
			name
			id
			description
			status{
				id
			}
		}
	}
`;

export const BLOCK_ROL = gql`
	mutation blockRol($id:Int!, $status:Int!) {
		blockedRole(id:$id,status:$status) {
			name
			id
			status {
				name
				id
			}
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
	mutation createRol($name:String!, $descripcion:String!){
		createRole(name:$name, description:$descripcion){
			id
			name
		}
	}
`;
