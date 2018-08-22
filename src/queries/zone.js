import gql from 'graphql-tag';

export const GET_ZONES = gql`
	query zones($paginationPage:Int!) {
		zones(page:$paginationPage) {
			data{
				name
				id
				capacity
				fullcapacity
				status{
					id
				}
			}
			total
		}
	}
`;

export const GET_ZONESS = gql`
	query { 
		zones{
			name
			id
			status{
				id
			}
		}
	}
`;

export const CREATE_ZONE = gql`
	mutation createZone($name:String!, $capacity:Int!, $max_capacity:Int!) {
		createZone(name:$name,capacity:$capacity,max_capacity:$max_capacity) {
			name
			capacity
			max_capacity
		}
	}
`;
export const EDIT_ZONE = gql`
	mutation updateZone($id:Int!, $name:String!, $capacity:Int!, $max_capacity:Int!) {
		updateZone(id:$id, name:$name, capacity:$capacity, max_capacity:$max_capacity) {
			id
			name
			capacity
			max_capacity	
		}
	}
`;

export const BLOCK_ZONE = gql`
	mutation blockZone($id:Int!, $status:Int!) {
		blockedZone(id:$id,status:$status) {
			id
			name
			status{
				name
				id
			}
		}
	}
`;

export const DELETE_ZONE = gql`
	mutation deleteZone($id:Int!){
		deleteZone(id:$id) {
			id
			name
		}
	}
`;
