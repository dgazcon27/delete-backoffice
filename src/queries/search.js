import gql from 'graphql-tag';

export const SEARCH_ROLES = gql`
	query search($query:String!, $currentPageSearch:Int) {
		search(query:$query, page:$currentPageSearch) {
			roles {
				data{
					name
					id
					description
					active
				}
				total
			}
		}
	}
`;

export const SEARCH_USER = gql`
	query search($query:String!,$page:Int) {
		search(query:$query,page:$page) {
			users {
				data{
					name
					id
					status{
						id
					}
					active
				}
				total
			}
		}
	}
`;

export const SEARCH_LOCATIONS = gql`
	query search($query:String!, $currentPageSearch:Int) {
		search(query:$query, page:$currentPageSearch) {
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


export const SEARCH_USERS = gql`
	query search($query: String!, $currentPageSearch: Int) {
		search(query: $query, page:$currentPageSearch) {
			users {
				data {
					name
					lastName
					phone
					dni
					birthDate
					citizenship {
						id
						name
					}
					role {
						id
						name
					}
					id
					status {
						name
						id
					}
				}
				total
			}
		}
	}
`;

export const SEARCH_ZONES = gql`
	query search($query: String!, $currentPageSearch: Int) {
		search(query:$query, page:$currentPageSearch) {
			zones{
				data{
					name
					id
					capacity
					maxcapacity
					status{
						id
					}
				}
				total
			}
		}
	}
`;
