import gql from 'graphql-tag';

export const GET_ROLES = gql`
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
export const BLOCK_ROL = gql`
mutation blockRol($id:Int!, $status:Int!){
blockedRole(id:$id,status:$status) {
    name
    id
    status {
      name
      id
    }
	}
}
`;
