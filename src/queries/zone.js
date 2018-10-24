import gql from 'graphql-tag';

export const GET_ZONES = gql`
	query zoness($paginationPage:Int!) {
		zoness(page:$paginationPage) {
			data{
				name
				id
				capacity
				maxcapacity
				active
			}
			total
		}
	}
`;

export const CREATE_ZONE = gql`
	mutation createZone($name:String!, $capacity:Int!, $maxcapacity:Int!, $createdBy:Int!, $updatedBy:Int!) {
		createZone(name:$name, capacity:$capacity, maxcapacity:$maxcapacity, createdBy:$createdBy, updatedBy:$updatedBy) {
			name
			capacity
			maxcapacity
		}
	}
`;
export const EDIT_ZONE = gql`
	mutation updateZone($id:Int!, $name:String!, $capacity:Int!, $maxcapacity:Int!, $updatedBy:Int!) {
		updateZone(id:$id, name:$name, capacity:$capacity, maxcapacity:$maxcapacity, updatedBy:$updatedBy) {
			id
			name
			capacity
			maxcapacity	
		}
	}
`;

export const BLOCK_ZONE = gql`
	mutation blockZone($id:Int!, $status:Int!) {
		blockedZone(id:$id,status:$status) {
			id
			name
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

export const GET_CURRENT = gql`
	query getCurrent($token:String!){
		getCurrent(token:$token) {
			id
			name
		}
	}
`;

export const GET_ZONE_BY_ID = gql`
	query zone($id:Int!){
		zone(id:$id) {
			name
			id
			capacity
			maxcapacity
		}
	}
`;
