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
export const GET_CURRENCYS = gql`
	query currencys {
		currencys{
		id
  		description
  		active
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
	    $createdBy: Int!,
	    $updatedBy: Int!
		){
		createEvent(name:$name, description:$description, presaleStart:$presaleStart,
		presaleClosure:$presaleClosure, eventStart:$eventStart, eventClosure:$eventClosure, state:$state,
		createdBy:$createdBy,updatedBy:$updatedBy
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
	    $updatedBy: Int!
		){
		updateEvent(id:$id, name:$name, description:$description, presaleStart:$presaleStart,
		presaleClosure:$presaleClosure, eventStart:$eventStart, eventClosure:$eventClosure, state:$state,
		updatedBy:$updatedBy
		){
			id
		}
	}
`;

export const GET_EVENT_BY_ID = gql`
	query event($id:Int!){
		event(id:$id) {
			id
			name
			description
			presaleStart
			presaleClosure
			eventStart
			eventClosure
			state{
				name
				id
				country {
					name
					id
				}
			}
		}
	}
`;

export const GET_BUDGET_BY_ID = gql`
	query budgetById($id:Int!){
		budgetById(id:$id) {
		comment
	    totalPrice
	    pendingPayment
	    totalPaid
	    currency {
	    	description
	    }
	    products {
	      id
	      price
	      quantity
	      product {
	        name
	      }
		}
		}
	}
`;

export const GET_BUDGET = gql`
	query budgetByEvent($events:Int!, $paginationPage:Int!) {
		budgetByEvent(event:$events, page:$paginationPage) {
			data
			{ 
			      id
    pendingPayment
    totalPrice
    totalPaid
    comment
    event {
      name
    }
    status
    active
			 } total
		}
	}
`;

export const UPDATE_BUDGET = gql`
mutation addBudgetProducts($id:Int!, $products:[prods]!,  $updatedBy:Int!){
	addBudgetProducts(id:$id, products:$products,  updatedBy:$updatedBy){
		id
	}
}`;

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

export const GET_ACCESS_BY_ID = gql`
	query accessByEvents($id:Int!) {
		accessByEvents(id:$id) {
				id
				withRoom
				withTickets
				numberRooms
				numberTickets
				price
				stock
				days
				active
				hotel{
					id
				}
				status{
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
	}
`;

export const DELETE_ACCESS = gql`
	mutation deleteAccessesByEvent($id:Int!) {
		deleteAccessesByEvent(id:$id){
			id
		}
	}
`;
export const DELETE_BUDGET = gql`
	mutation deleteBudget($id:Int!) {
		deleteBudget(id:$id){
			id
		}
	}
`;

export const CREATE_BUDGET_EVENT = gql`	
mutation createBudget( 
	$products: [product]!, 
  	$comment:String!, 
    $currency:ID!,
    $event:ID!,
    $createdBy:Int!,
    $updatedBy:Int!,
	){
		createBudget(
	products:$products, 
  	comment :$comment, 
    currency:$currency,
    event:$event,
    createdBy:$createdBy,
    updatedBy:$updatedBy,
		){
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
		$days: Int!,
		$stock: Int!,
		$status: Int!,
		){
		createAccessesByEvent(withRoom:$withRoom, withTickets:$withTickets, numberRooms:$numberRooms,
		numberTickets:$numberTickets, price:$price, event:$event, access:$access, hotel:$hotelE, room:$roomE,
		days:$days, stock:$stock, status: $status
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
	    $room:ID,
	    $hotel:ID,
	    $days:Int!,
	    $stock: Int!,
	    $status: ID!,
		){
		updateAccessesByEvent(id:$id, withRoom:$withRoom, withTickets:$withTickets, numberRooms:$numberRooms,
		numberTickets:$numberTickets, price:$price, event:$event, access:$access, room:$room, hotel:$hotel,
		days: $days, stock:$stock, status: $status
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
export const BLOCK_BUDGET = gql`
	mutation blockedBudget(
		$id:Int!,
		$status: Int!
		){
		blockedBudget(id:$id, status:$status){
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
