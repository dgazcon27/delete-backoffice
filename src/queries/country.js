import gql from 'graphql-tag';

const GET_COUNTRIES = gql`
	query {
		countrys {
			name
			value
			id
		}
	}
`;

export default GET_COUNTRIES;
