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
