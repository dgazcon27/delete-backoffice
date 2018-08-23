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

export const GET_CURRENT_USER = gql`
	query getCurrent($token:String!){
		getCurrent(token:$token) {
			id
			name
		}
	}
`;
