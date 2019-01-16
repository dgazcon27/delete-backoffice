import gql from 'graphql-tag';

const GET_TICKET = gql`
	query boxOfficeSalesPagination($paginationPage: Int!) {
		boxOfficeSalesPagination(page: $paginationPage) {
			data {
				id
				totalPrice
				pendingPayment
				totalPaid
				user{
					id
					name
					lastName
					dni
				}
				access{
					id
					name
				}
				event{
					id
					name
					eventStart
				}
				comment
			}
			total
		}
	}
`;

export default GET_TICKET;
