import gql from 'graphql-tag';

const GET_PRESALE = gql`
	query presaleTypeSalesPagination($paginationPage: Int!) {
		presaleTypeSalesPagination(page: $paginationPage) {
			data {
				id
				totalPrice
				pendingPayment
				totalPaid
				user{
					fullName
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

export default GET_PRESALE;
