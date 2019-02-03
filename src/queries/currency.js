import gql from 'graphql-tag';

export const GET_CURRENCY = gql`
	query currencyPagination($paginationPage: Int!) {
		currencyPagination(page: $paginationPage) {
			data {
				id
				description
			}
			total
		}
	}
`;

export const CREATE_CURRENCY = gql`
	mutation createCurrency($description:String!){
		createCurrency(description:$description){
			id
		}
	}
`;

export const DELETE_CURRENCY = gql`
	mutation deleteCurrency($id:Int!){
		deleteCurrency(id:$id) {
			id
		}
	}
`;
