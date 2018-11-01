import gql from 'graphql-tag';

export const GET_RESERVATIONS = gql`
	query reservations($paginationPage:Int!) {
		reservations(page:$paginationPage) {
			data{
				id
				comment
				client{
					id
					name
					lastName
				}
				purchaseRequest{
					id
					event{
						id
						name
					}
				}
		    	room{
		    		id
		    		name
		    		hotel{
		    			id
		    			provider{
		    				id
		    				name
		    			}
		    		}
		    	}
		    	days
			    quantity
			}
			total
		}
	}
`;

export const DELETE_RESERVATION = gql`
	mutation deleteReservation ($id:Int!){
		deleteReservation(id:$id) {
			id
		}
	}
`;

export const CREATE_RESERVATION = gql`
	mutation createReservation(
		$comment:String!, 
		$clientId:ID!,
		$purchaseRequest:ID!,
    	$room:ID!,
    	$days:Int!,
	    $quantity:Int!,
		){
		createReservation(
			comment:$comment, 
			client:$clientId,
			purchaseRequest:$purchaseRequest,
	    	room:$room,
	    	days:$days,
		    quantity:$quantity,
		){
			id
		}
	}
`;

export const EDIT_RESERVATION = gql`
	mutation updateReservation(
		$id:Int!,
		$comment:String!, 
		$clientId:ID!,
		$purchaseRequest:ID!,
    	$room:ID!,
    	$days:Int!,
	    $quantity:Int!,
		){
		updateReservation(
			id:$id,
			comment:$comment, 
			client:$clientId,
			purchaseRequest:$purchaseRequest,
	    	room:$room,
	    	days:$days,
		    quantity:$quantity,
		){
			id
		}
	}
`;

export const GET_USER_BY_DNI = gql`
	query reservationAutocomplete(
		$dni:Int!,
		){
		reservationAutocomplete(dni:$dni){
			id
			name
			lastName
			purchaseRequest{
				id
				event{
					id
					name
				}
			}
		}
	}
`;

export const GET_ROOMS = gql`
	query roomByHotelQuery(
		$hotel:Int!,
		$event:Int!,
		){
		roomByHotelQuery(
			hotel:$hotel,
			event:$event
		){
			id
			name
		}
	}
`;

export const GET_HOTELS = gql`
	query providerByEvent(
		$event:Int!,
		){
		providerByEvent(event:$event){
			id
			provider{
				id
				name
			}
		}
	}
`;

export const CREATE_RESERVATION_PAY = gql`
	mutation createPaymentReservation(
		$reservation:Int!, 
		$amount:Int!,
		$reference:String!,
    	$comment:String!,
    	$type:String!,
	    $bankAccount:Int!,
	    $createdBy:Int!,
	    $updatedBy:Int!,
		){
		createPaymentReservation(
			reservation:$reservation, 
			amount:$amount,
			reference:$reference,
	    	comment:$comment,
	    	type:$type,
		    bankAccount:$bankAccount,
		    createdBy:$createdBy,
	    	updatedBy:$updatedBy,
		){
			id
		}
	}
`;
