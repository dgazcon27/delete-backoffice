import gql from 'graphql-tag';

const GET_TABLE = gql`
	query salesTypeTablesPagination($paginationPage: Int!) {
		salesTypeTablesPagination(page: $paginationPage) {
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

export default GET_TABLE;
