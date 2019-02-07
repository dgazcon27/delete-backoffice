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
    mutation updateRate($id: Int!, $value: String!, $currency: ID){
        updateRate(id: $id, value: $value, currency: $currency){
            id
            value
            currency {
                id
            }
        }
    }   
`;
