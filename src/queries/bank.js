import gql from 'graphql-tag';

export const GET_BANKS = gql`
	query banks($paginationPage:Int!) {
		banks(page:$paginationPage) {
			data {
				id
				name
				currency {
					id
					description
				}
			}
			total
			}
	}
	
`;

export const GET_BANK_ACCOUNTS = gql`
	query bankAccounts($paginationPage:Int!) {
		bankAccounts(page:$paginationPage) {
			data{
				id
				accountNumber
				currency
				type
				comment
				bank {
					id
					name
				} 
				owner {
					id
					name 
					lastName
					fullName
				}
			}
			total
		}
	}
`;


export const GET_BANK_ACCOUNTS_STATE = gql`
	query bankAccountMovement($bankAccount_id:Int, $paginationPage:Int!) {
		bankAccountMovement(bankAccount_id:$bankAccount_id, page:$paginationPage) {
			data{
				id
				movementsType
				amount
				reference
				bankAccount{
					currentBalance
					owner{
						fullName
					}
					bank{
						name
					}

					accountNumber
					currency
				}
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

export const DELETE_BANK_ACCOUNT = gql`
	mutation deleteBankAccount ($id:Int!){
		deleteBankAccount(id:$id) {
			id
		}
	}
`;

export const CREATE_BANK = gql`
	mutation createBank($name:String!, $currency:ID!){
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
	mutation updateBank($id:Int!,$name:String, $currency:ID!){
		updateBank(id:$id, name:$name, currency:$currency){
			id
			name
		}
	}
`;
export const EDIT_BANK_ACCOUNT = gql`
	mutation updateBankAccount($id:Int!, $bank:ID!, $owner:ID!, $accountNumber:String, $type:String, $currency:String, $comment:String){
		updateBankAccount(id:$id, bank:$bank, owner:$owner, accountNumber:$accountNumber, type:$type, currency:$currency, comment:$comment){
			id
		}
	}
`;

export const GET_BANK_BY_ID = gql`
	query bank($id:Int!){
		bank(id:$id) {
			name
			id
			currency {
				id
				description
			}
		}
	}
`;

export const GET_ACCOUNT_BY_ID = gql`
	query bankAccount($id:Int!){
		bankAccount(id:$id) {
			id
			accountNumber
			currency
			type
			comment
			currentBalance
			bank {
				id
				name
			} 
			owner {
				fullName
				id
				name 
				lastName
			}
		}
	}
`;
