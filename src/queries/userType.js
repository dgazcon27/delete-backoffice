import gql from 'graphql-tag';
 
const GET_ROLES = gql`
 	query { 
 			roles {
    		name
  		}
 	}
`;
export default GET_ROLES;
