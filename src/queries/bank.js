import gql from 'graphql-tag';

export const GET_BANKS = gql`
	query banks($paginationPage:Int!) {
		banks(page:$paginationPage) {
			data{
				id
				name
				currency
			}
			total
		}
	}
`;

export const DELETE_BANK = gql`
	mutation deleteBank ($id:Int!){
		deleteBank(id:$id) {
			id
		}
	}
`;

export const CREATE_BANK = gql`
	mutation createBank($name:String!, $currency:String!){
		createBank(name:$name, currency:$currency){
			id
		}
	}
`;

export const EDIT_BANK = gql`
	mutation updateBank($id:Int!,$name:String, $currency:String){
		updateBank(id:$id, name:$name, currency:$currency){
			id
			name
		}
	}
`;

