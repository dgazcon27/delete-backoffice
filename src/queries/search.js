import gql from 'graphql-tag';

export const SEARCH_ROLES = gql`
	query search($query:String!,$currentPageSearch:Int) {
		search(query:$query,page:$currentPageSearch) {
			roles {
				data{
					name
					id
					description
					status{
						id
					}
				}
				total
			}
		}
	}
`;

export const SEARCH_USER = gql`
	query search($query:String!,$page:Int) {
		search(query:$query,page:$page) {
			user {
				data{
					name
					id
					description
					status{
						id
					}
				}
				total
			}
		}
	}
`;

export const SEARCH_LOCATIONS = gql`
	query search($query:String!,$page:Int) {
		search(query:$query,page:$page) {
			locations {
				data{
					name
					id
					description
					status{
						id
					}
				}
				total
			}
		}
	}
`;

