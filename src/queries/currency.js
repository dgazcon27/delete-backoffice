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
export const EDIT_CURRENCY = gql`
	mutation updateCurrency($id: Int! $description:String!){
		updateCurrency(id: $id description:$description){
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
export const GET_CURRENCY_BY_ID = gql`
	query currencyById($id:Int!){
		currencyById(id:$id) {			
			id
			description
		}
	}	
`;

export const CREATE_CURRENCY_HAS_CREATE = gql`
	mutation createCurrencyHasEvent(
		$currency: ID!,
		$event: ID!,
		$createdBy: Int!,
		$updatedBy: Int!){
			createCurrencyHasEvent(
				currency: $currency,
				event: $event,
				createdBy: $createdBy,
				updatedBy: $updatedBy,
			) {
				id
			}
		}
`;
