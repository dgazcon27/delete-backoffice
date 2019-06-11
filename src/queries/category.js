import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
	query categoryPagination($paginationPage:Int!) {
		categoryPagination(page:$paginationPage) {
			data{
				id
				name
				description
			}
			total
		}
	}
`;

export const CREATE_CATEGORY = gql`
	mutation createCategory($name:String!, $description:String!){
		createCategory(name:$name, description:$description){
			id
		}
	}
`;

export const EDIT_CATEGORY = gql`
	mutation updateCategory($id: Int!, $name:String!, $description:String!){
		updateCategory(id:$id, name:$name, description:$description){
			id
		}
	}
`;

export const DELETE_CATEGORY = gql`
    mutation deleteCategory($id:Int!){
        deleteCategory(id:$id) {
            id
            name
        }
    }
`;

export const GET_CATEGORY_BY_ID = gql`
	query categoryById($id:Int!) {
		categoryById(id:$id) {
			id
			name
			description
		}
	}
`;
