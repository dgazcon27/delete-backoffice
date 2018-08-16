import gql from 'graphql-tag';

export const GET_LOCATIONS = gql`
	query locations($paginationPage:Int!) {
		locations(page:$paginationPage) {
			data{
				name
				id
				status{
					id
				}
			}
			total
		}
	}
`;

export const CREATE_LOCATION = gql`
	mutation createLocation($id:Int!, $status:Int!) {
		createLocation(id:$id,status:$status) {
			name
			id
			status {
				name
				id
			}
		}
	}
`;

export const BLOCK_LOCATION = gql`
	mutation blockLocation($id:Int!, $status:Int!) {
		blockedLocation(id:$id,status:$status) {
			name
			id
			status {
				name
				id
			}
		}
	}
`;

export const DELETE_LOCATION = gql`
	mutation deleteLocation($id:Int!){
		deleteLocation(id:$id) {
			id
			name
		}
	}
`;
