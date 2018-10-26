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
export const GET_HOTELS = gql`
	query hotelss($paginationPage:Int!) {
		hotelss(page:$paginationPage) {
			data{id
  	provider{
   		 name
  		}
   	
  	event{
   		 name
  		}
   		 active
  		}
			total
		}
	}
`;


export const BLOCK_HOTEL = gql`
	mutation blockedHotel($id:Int!, $status:Int!) {
		blockedHotel(id:$id,status:$status) {
			id
		}
	}
`;


export const DELETE_HOTEL = gql`
	mutation deleteHotel($id:Int!){
		deleteHotel(id:$id) {
			id
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
