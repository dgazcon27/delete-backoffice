import gql from 'graphql-tag';

const GET_STATES = gql`
	query countryStates($country:Int!){
		countryStates(country:$country) {
			id
			name
		}
	}
`;

export default GET_STATES;
