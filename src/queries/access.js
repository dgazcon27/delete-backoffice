import gql from 'graphql-tag';

export const GET_ACCESS = gql`
	query access($paginationPage:Int!) {
		access(page:$paginationPage) {
			data{
				id
				name
				description
				currency
				location{
					id
					name
				}
				zone{
					id
					name
				}
			}
			total
		}

	}
`;

export const CREATE_ACCESS = gql`
	mutation createAccess($name:String!, $description:String!, $currency:String!, $location:ID!, $zone:ID!, $status:Int!) {
		createAccess(name:$name, description:$description, currency:$currency, location:$location, zone:$zone, status:$status) {
			name
			description
		}
	}
`;
export const EDIT_ACCESS = gql`
	mutation updateAccess($id:Int!, $name:String!, $description:String!, $currency:String!, $location:ID!, $zone:ID!, $status:ID!) {
		updateAccess(id:$id, name:$name, description:$description, currency:$currency, location:$location, zone:$zone, status:$status) {
			name
			description
		}
	}
`;

export const BLOCK_ACCESS = gql`
	mutation blockAccess($id:Int!, $status:Int!) {
		blockedAccess(id:$id,status:$status) {
			name
			id
			status{
				name
				id
			}
		}
	}
`;

export const DELETE_ACCESS = gql`
	mutation deleteAccess($id:Int!){
		deleteAccess(id:$id) {
			id
			name
		}
	}
`;

export const GET_LOCATIONS = gql`
	query locationss{
		locationss{
			id
			name
		}
	}
`;

export const GET_ZONES = gql`
	query zones{
		zones{
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

export const GET_ACCESS_BY_ID = gql`
	query acces($id:Int!){
		acces(id:$id) {
			id
			name
			description
			currency
			location{
				id
				name
			}
			zone{
				id
				name
			}
			status{
				id
			}
		}
	}
`;

