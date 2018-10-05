import gql from 'graphql-tag';

export const GET_EVENTS = gql`
	query events($paginationPage:Int!) {
		events(page:$paginationPage) {
			data{
				id
				name
				description
				presaleStart
				presaleClosure
				eventStart
				eventClosure
				status {
					id
				}
				state{
					name
					id
					country {
						name
						id
					}
				}
			}
			total
		}
	}
`;

export const DELETE_EVENT = gql`
	mutation deleteEvent ($id:Int!){
		deleteEvent(id:$id) {
			id
		}
	}
`;

export const CREATE_EVENT = gql`
	mutation createEvent(
		$name:String!, 
		$description:String!,
		$presaleStart:String!,
    	$presaleClosure:String!,
    	$eventStart:String!,
	    $eventClosure:String!,
	    $state:ID!,
	    $status: ID!,
	    $createdBy: Int!,
	    $updatedBy: Int!
		){
		createEvent(name:$name, description:$description, presaleStart:$presaleStart,
		presaleClosure:$presaleClosure, eventStart:$eventStart, eventClosure:$eventClosure, state:$state,
		status:$status,createdBy:$createdBy,updatedBy:$updatedBy
		){
			id
		}
	}
`;

export const EDIT_EVENT = gql`
	mutation updateEvent(
		$id:Int!,
		$name:String!, 
		$description:String!,
		$presaleStart:String!,
    	$presaleClosure:String!,
    	$eventStart:String!,
	    $eventClosure:String!,
	    $state:Int!,
	    $status: Int!,
	    $updatedBy: Int!
		){
		updateEvent(id:$id, name:$name, description:$description, presaleStart:$presaleStart,
		presaleClosure:$presaleClosure, eventStart:$eventStart, eventClosure:$eventClosure, state:$state,
		status:$status,updatedBy:$updatedBy
		){
			id
		}
	}
`;

export const GET_ACCESS = gql`
	query accessesByEvent($events:Int!, $paginationPage:Int!) {
		accessesByEvent(event:$events, page:$paginationPage) {
			data{
				id
				withRoom
				withTickets
				numberRooms
				numberTickets
				price
				active
				hotel{
					id
				}
				room{
					id
					name
				}
				access{
			      	id
			      	name
			     	description
			     	location{
			        	id
			        	name
			      	}
			    }
			}
			total
		}
	}
`;

export const DELETE_ACCESS = gql`
	mutation deleteAccessesByEvent($id:Int!) {
		deleteAccessesByEvent(id:$id){
			id
		}
	}
`;

export const CREATE_ACCESS_EVENT = gql`
	mutation createAccessesByEvent(
		$withRoom:Boolean!, 
		$withTickets:Boolean!,
		$numberRooms:Int!,
    	$numberTickets:Int!,
    	$price:Int!
	    $event:ID!,
	    $access:ID!,
	    $hotelE:ID,
	    $roomE:ID,
		){
		createAccessesByEvent(withRoom:$withRoom, withTickets:$withTickets, numberRooms:$numberRooms,
		numberTickets:$numberTickets, price:$price, event:$event, access:$access, hotel:$hotelE, room:$roomE,
		){
			id
		}
	}
`;

export const EDIT_ACCESS_EVENT = gql`
	mutation updateAccessesByEvent(
		$id:Int!,
		$withRoom:Boolean!, 
		$withTickets:Boolean!,
		$numberRooms:Int!,
    	$numberTickets:Int!,
    	$price:Int!,
	    $event:ID!,
	    $access:ID!,
	    $roomE:ID!,
	    $hotelE:ID!,
		){
		updateAccessesByEvent(id:$id, withRoom:$withRoom, withTickets:$withTickets, numberRooms:$numberRooms,
		numberTickets:$numberTickets, price:$price, event:$event, access:$access, room:$roomE, hotel:$hotelE,
		){
			id
		}
	}
`;

export const BLOCK_ACCESS = gql`
	mutation blockedAccessesByEvent(
		$id:Int!,
		$status: Int!
		){
		blockedAccessesByEvent(id:$id, status:$status){
			id
		}
	}
`;

export const GET_HOTELS = gql`
	query providerByEvent($event:Int!) {
		providerByEvent(event:$event) {
			id
			provider{
				id
				name
			}
		}
	}
`;

export const GET_ROOMS = gql`
	query roomByHotelQuery($hotel:Int!, $event:Int!) {
		roomByHotelQuery(hotel:$hotel, event:$event) {
			id
			name
		}
	}
`;
