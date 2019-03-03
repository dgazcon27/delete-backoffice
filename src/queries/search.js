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
					description
					active
				}
				total
			}
		}
	}
`;

export const SEARCH_USER_FILTERED = gql`
	query searchPagedUsersFilter($query:String!,$currentPageSearch:Int) {
		searchPagedUsersFilter(query:$query,page:$currentPageSearch) {
			data{
				email
				name
				lastName
				phone
				dni
				birthDate
				citizenship{
					id
					name
				}
				role{
					id
					name
				}
				id
				active
			}
			total
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
					active
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
					active
				}
				total
			}
		}
	}
`;

export const SEARCH_PROVIDER = gql`
	query search($query: String!, $currentPageSearch: Int) {
		search(query:$query, page:$currentPageSearch) {
			providers{
				data{
					id
					name
					rif
					email
					description
					phone
					address
					active
					state{
						id
						name
					}
					category{
						id
						name
					}
				}
				total
			}
		}
	}
`;

