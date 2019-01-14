import gql from 'graphql-tag';

export const GET_ROOMS = gql`
	query rooms($paginationPage:Int!) {
		rooms(page:$paginationPage) {
			data{
				id
				name
				type
				capacity
				quantityAvailableSell
				stockReserve
				costPurchaseNight
				costNight
				startNumbering
				endNumbering
				active
				hotel{
					id
					provider{
						id
						name
					}
				}
				event{
					id
					name
				}
			}
			total
		}
	}
`;

export const GET_ROOM_BY_ID = gql`
	query roomsById($id:Int!) {
		roomsById(id:$id) {
			id
			name
			type
			capacity
			quantityAvailableSell
			stockReserve
			costPurchaseNight
			costNight
			startNumbering
			endNumbering
			active
			hotel{
				id
				provider{
					id
					name
				}
			}
			event{
				id
				name
			}
		}
	}
`;

export const DELETE_ROOM = gql`
	mutation deleteRoom ($id:Int!){
		deleteRoom(id:$id) {
			id
		}
	}
`;

export const CREATE_ROOM = gql`
	mutation createRoom($name:String!, $type:String!, $capacity:Int!, $quantityAvailableSell:Int!, $stockReserve:Int!, $costPurchaseNight:Int!, $costNight:Int!, $startNumbering:String!, $endNumbering:String!, $hotel:ID!, $event:ID!){
		createRoom(name:$name, type:$type, capacity:$capacity, quantityAvailableSell:$quantityAvailableSell, stockReserve:$stockReserve, costPurchaseNight:$costPurchaseNight, costNight:$costNight, startNumbering:$startNumbering, endNumbering:$endNumbering, hotel:$hotel, event:$event){
			id
		}
	}
`;

export const EDIT_ROOM = gql`
	mutation updateRoom($id:Int!, $name:String!, $type:String!, $capacity:Int!, $quantityAvailableSell:Int!, $stockReserve:Int!, $costPurchaseNight:Int!, $costNight:Int!, $startNumbering:String!, $endNumbering:String!, $hotel:Int!, $event:Int!){
		updateRoom(id:$id, name:$name, type:$type, capacity:$capacity, quantityAvailableSell:$quantityAvailableSell, stockReserve:$stockReserve, costPurchaseNight:$costPurchaseNight, costNight:$costNight, startNumbering:$startNumbering, endNumbering:$endNumbering, hotel:$hotel, event:$event){
			id
		}
	}
`;

export const BLOCK_ROOM = gql`
	mutation blockedRoom($id:Int!, $status:Int!) {
		blockedRoom(id:$id,status:$status) {
			id
		}
	}
`;
