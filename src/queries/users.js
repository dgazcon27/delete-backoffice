import gql from 'graphql-tag';
 
const GET_USERS = gql`
 	query { 
 			users {
    		name
  		}
 	}
`;
export default GET_USERS;
