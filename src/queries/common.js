import gql from 'graphql-tag';

export const GET_ROLESS = gql`
	query{ 
			roless{
				id
				name
			}
		}	
`;

export const GET_USERSS = gql`
	query{ 
			userss{
				id
				name
				lastName
			}
		}	
`;
export const GET_PROVIDERS = gql`
	query{ 
			providers{
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

export const GET_BANK_ACCOUNTS = gql`
	query{ 
			bankAccountss{
				id
				accountNumber
				owner{
					name 
					lastName
				}
			}
		}	
`;

export const GET_ACCESSS = gql`
	query{ 
			accesss{
				id
				name
			}
		}	
`;
export const GET_EVENTSS = gql`
	query{ 
			eventss{
				id
				name
			}
		}	
`;
export const GET_A_EVENTSS = gql`
	query{ 
			activeEvents{
				id
				name
			}
		}	
`;
export const GET_STATUSS = gql`
	query{ 
			statuss{
				id
				name
			}
		}	
`;

export const GET_COUNTRIES = gql`
	query {
		countrys {
			name
			value
			id
		}
	}
`;
export const GET_LOCATIONS = gql`
	query locationss{
		locationss{
			id
			name
		}
	}
`;
export const GET_ROLES = gql`
	query {
		roless{
			id
			name
		}
	}
`;
export const GET_ZONES = gql`
	query {
		zones{
			id
			name
		}
	}
`;
export const GET_TYPE_INVITED = gql`
	query {
		typeInvits{
			name
			id
		}
	}
`;
export const GET_STATUS = gql`
	query {
		statuss {
			name
			id
		}
	}
`;

export const GET_CATEGORIES = gql`
	query{ 
		categorys{
			id
			name
			description
  		}
	}
`;

export const GET_CURRENCYS = gql`
	query {
		currencys{
			id
			description
		}
	}
`;
