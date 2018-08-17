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

export const GET_USERSS = gql`
	query{ 
			userss{
				id
				name
			}
		}	
`;

export const GET_BANKSS = gql`
	query{ 
			bankss{
				id
				name
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

export const CREATE_BANK_ACCOUNT = gql`
	mutation createBankAccount($bank:ID!, $owner:ID!, $type:String!, $accountNumber:String!, $currency:String!, $comment:String!, ){
		createBankAccount(bank:$bank, owner:$owner, type:$type, accountNumber:$accountNumber,  currency:$currency, comment:$comment, ){
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

