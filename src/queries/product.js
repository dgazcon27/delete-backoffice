import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
	query productPagination($paginationPage:Int!) {
		productPagination(page:$paginationPage) {
			data{
				id
                name
                description
			}
			total
		}
	}
`;

export const GET_PRODUCT_BY_ID = gql`
	query productById($id:Int!) {
		productById(id:$id) {
			id
			name
            description
			stockInicial
			stock
			provider{
				id
				name
			}
            createdBy{
				id
			}
            updatedBy{
				id
			}
		}
	}
`;

export const DELETE_PRODUCT = gql`
	mutation deleteProduct ($id:Int!){
		deleteProduct(id:$id) {
			id
		}
	}
`;

export const CREATE_PRODUCT = gql`
	mutation createProduct($name:String!, $description:String!, $stockInicial:Int!, $stock:String!, $provider:ID!, $createdBy:Int!, $updatedBy: Int!){
		createProduct(name:$name, description:$description, stockInicial:$stockInicial, stock:$stock, provider:$provider, createdBy: $createdBy, updatedBy: $updatedBy){
			id
		}
	}
`;

export const EDIT_PRODUCT = gql`
	mutation updateProduct($id:Int!, $name:String!, $description:String!, $stockInicial:Int!, $stock:Int!, $provider:ID!, $updatedBy: Int!){
		updateProduct(id:$id, name:$name, description:$description, stockInicial:$stockInicial, stock:$stock, provider:$provider, updatedBy: $updatedBy){
			id
		}
	}
`;

export const BLOCK_PRODUCT = gql`
	mutation blockedProduct($id:Int!, $status:Int!) {
		blockedProduct(id:$id,status:$status) {
			id
		}
	}
`;
