import gql from 'graphql-tag';

export const GET_PROVIDERS = gql`
	query providersPagination($paginationPage:Int!) {
		providersPagination(page:$paginationPage) {
			data {
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
`;

export const CREATE_PROVIDER = gql`
	mutation createProvider($name:String!, $description:String!, $rif:String!, $phone:String!, $address:String!, $email:String!, $state:ID!, $category:ID!, $createdBy:Int!, $updatedBy:Int!) {
		createProvider(name:$name, description:$description, rif:$rif, phone:$phone, address:$address, email:$email, state:$state, category:$category, createdBy:$createdBy, updatedBy:$updatedBy) {
	        id
		}
	}
`;

export const EDIT_PROVIDER = gql`
	mutation updateProvider($id:Int!, $name:String!, $description:String!, $rif:String!, $phone:String!, $address:String!, $email:String!, $state:ID!, $category:ID!, $updatedBy:Int!) {
		updateProvider(id:$id, name:$name, description:$description, rif:$rif, phone:$phone, address:$address, email:$email, state:$state, category:$category, updatedBy:$updatedBy) {
			id
		}
	}
`;

export const BLOCK_PROVIDER = gql`
	mutation blockedProvider($id:Int!, $status:Int!) {
		blockedProvider(id:$id, status:$status) {
			id
		}
	}
`;

export const DELETE_PROVIDER = gql`
	mutation deleteProvider($id:Int!){
		deleteProvider(id:$id) {
			id
		}
	}
`;

export const GET_STATE_BY_COUNTRYS = gql`
	query countryStates($country:Int!){
		countryStates(country:$country){
			id
            name
            country{
                id
                name
            }
		}
	}
`;

export const GET_PROVIDER_BY_ID = gql`
	query providerId($id:Int!){
		providerId(id:$id) {
			id
			name
			description
			rif
			phone
			address
			email
			state{
				id
				name
				country{
					id
					name
				}
			}
			category{
				id
				name
			}
		}
	}
`;
