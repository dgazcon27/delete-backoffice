import gql from 'graphql-tag';

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
export const GET_STATUSS = gql`
	query{ 
			statuss{
				id
				name
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
export const GET_ZONES = gql`
	query zones{
		zones{
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
export const GET_STATUS = gql`
	query {
		statuss {
			name
			id
		}
	}
`;
