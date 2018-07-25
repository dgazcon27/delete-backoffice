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
