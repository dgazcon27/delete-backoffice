import gql from 'graphql-tag';

const GET_STATUS = gql`
	query {
		statuss {
			name
			id
		}
	}
`;

export default GET_STATUS;
