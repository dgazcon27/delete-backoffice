import gql from 'graphql-tag';

export const GET_LOCATIONS = gql`
	query locations($paginationPage:Int!) {
		locations(page:$paginationPage) {
			data{
				name
				id
				capacity
				fullcapacity
				description
			}
			total
		}
	}
`;

export const CREATE_LOCATION = gql`
	mutation createLocation($name:String!, $description:String!, $fullcapacity:Int!, $capacity:Int!, $createdBy:Int!, $updatedBy:Int!) {
		createLocation(name:$name,description:$description,fullcapacity:$fullcapacity,capacity:$capacity, createdBy:$createdBy, updatedBy:$updatedBy) {
			name
			description
			fullcapacity
			capacity
		}
	}
`;
export const EDIT_LOCATION = gql`
	mutation updateLocation($id:Int!, $name:String!, $description:String!, $fullcapacity:Int!, $capacity:Int!, $updatedBy:Int!) {
		updateLocation(id:$id, name:$name, description:$description, fullcapacity:$fullcapacity, capacity:$capacity, updatedBy:$updatedBy) {
			name
			description
			fullcapacity
			capacity	
		}
	}
`;

export const BLOCK_LOCATION = gql`
	mutation blockLocation($id:Int!, $status:Int!) {
		blockedLocation(id:$id,status:$status) {
			name
			id
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

export const GET_STATUS = gql`
	query statuss{
		statuss{
			id
			name
		}
	}
`;

export const GET_LOCATION_BY_ID = gql`
	query location($id:Int!){
		location(id:$id) {
			name
			id
			capacity
			fullcapacity
			description
		}
	}
`;
