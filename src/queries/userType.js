import gql from 'graphql-tag';

const GET_ROLES = gql`
 	query { 
 		roles {
    		name
    		id
    		status{
    			id
    		}
  		}
 	}
`;
export default GET_ROLES;
