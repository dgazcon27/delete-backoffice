import gql from 'graphql-tag';

/*
    Se trae una tasa de cambios
    id: id de la monera en tabla rate
*/

export const GET_RATE = gql`
	query rateById($id: Int!) {
		rateById(id: $id) {
			id
			value
			active
			currency {
				id
			}
		}
	}
`;

/*
    Se trae todas las tasas de cambios
    id: id de la monera en tabla rate
*/
export const GET_RATES = gql`
    query ratePagination($paginationPage: Int!) {
        ratePagination(page: $paginationPage) {
            data {
                id
                value
                active
                currency {
                    id
                    description
                }
            }
            total
        }
    }
`;

export const DELETE_RATE = gql`
    mutation deleteRate($id: Int!) {
        deleteRate(id: $id) {
            id
        }
    }
`;

/*
    Actualiza la tasa de cambio

    id: es el id de la moneda en la tabla rate
    value: nuevo valor que tendra la moneda
    currency: es el id de la moneda en la tabla currency
*/
export const UPDATE_RATE = gql`
	mutation updateRate($id: Int!, $value: String!, $currency: ID, $updatedBy: Int){
		updateRate(id: $id, value: $value, currency: $currency, updatedBy: $updatedBy){
			id
			value
			currency {
				id
			}
		}
	}
`;


/*
    Crea un nueva tasa de pago

    value: valor de la tasa
    currency: ID de la moneda en la tabla currency
    createBy: ID del usuario que esta logueado
    updateBy: ID del usuario que esta logueado
*/
export const CREATE_RATE = gql`
    mutation createRate($value: String!, $currency: ID!, $createdBy: Int!, $updatedBy: Int!) {
        createRate(value: $value, currency: $currency, createdBy: $createdBy, updatedBy: $updatedBy) {
            id
        }
    }
`;
