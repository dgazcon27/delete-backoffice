import gql from 'graphql-tag';

export const GET_TOKENS = gql`
	query paidSalesList($paginationPage:Int!){
		paidSalesList(page:$paginationPage){
			data{
				id
				totalPrice
				pendingPayment
				totalPaid
				comment
				localize
				purchase_status
				purchaser{
					id
					name
					lastName
					phone
					dni
				}
				access {
					id
					name
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

export const GET_TOKENS_RESERVATION = gql`
	query paidReservationsList($paginationPage:Int!){
		paidReservationsList(page:$paginationPage){
			data{
				id
				comment
				pendingPayment
				client{
					id
					name
					dni
					lastName
				}
				purchaseRequest{
					id
					event{
						id
						name
					}
					access{
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

export const SEND_TOKENS = gql`
	query sendEmail{
		sendEmail{
			response
		}
	}
`;

export const SEND_TOKENS_RESERVATION = gql`
	query sendEmailReservation{
		sendEmailReservation{
			response
		}
	}
`;
