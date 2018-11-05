import gql from 'graphql-tag';

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

export const CREATE_HOTEL = gql`
	mutation createHotel($provider:ID!, $event:ID!, $createdBy:Int!, $updatedBy:Int!){
		createHotel(provider:$provider, event:$event, createdBy:$createdBy, updatedBy:$updatedBy){
			id
		}
	}
`;

export const UPDATE_HOTEL = gql`
	mutation updateHotel($id:Int!, $provider:Int!, $event:Int!, $createdBy:Int!, $updatedBy:Int!){
		updateHotel(id:$id, provider:$provider, event:$event, createdBy:$createdBy, updatedBy:$updatedBy){
			id
		}
	}

`;

export const GET_HOTEL_BY_ID = gql`
	query hotelById($id: Int!){
		hotelById(id:$id){
			id
			provider{
				id
			}
			event{
				id
			}
		}
	}
`;
