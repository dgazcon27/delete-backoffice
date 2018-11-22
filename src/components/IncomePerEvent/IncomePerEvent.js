import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
// ActionsCreators
import {  } from '../../actions/IncomePerEvent/actionsCreators';
// Queries
import {  } from '../../queries/incomePerEvent'
// QUERY SEARCH
import {  } from '../../queries/incomePerEvent';
const IncomePerEvent = ({
    objectStateIncomePerEvent,
    paginationPage,
    actionSetRol,
    actionOpenModal,
    actionCloseModal,
    actionBlock,
    actionDelete,
    blockRolMutation,
    deleteRolMutation,
}) => {
    /*
    *	Descripción:
    *		Este objeto contiene dos parametros (queryComponent, querySearch) a los cuales se les asignan queries que seran ejecutadas
    *		en el componente.
    *
    *		queryComponent: Consulta interna del component (la que trae informacion en primera instancia) | QUERY GQL | REQUERIDA
    *		querySearch: Consulta de busqueda del component (se activa cuando se realiza una busqueda) | QUERY GQL | NO REQUERIDA
    */

    const objectQuery = {
        queryComponent: GET_ROLES,
        querySearch: SEARCH_ROLES,
    };

    /*
    *	Descripción:
    *		Este objeto contiene cuatros parametros (showButton, showSearch, titleButton, url)
    *		el componente.
    *
    *		showButton: Muestra u oculta el boton colocado arriba a la izquierda | BOOL | NO REQUERIDA
    *		showSearch: Muestra u oculta el input colocado arriba a la derecha | BOOL | NO REQUERIDA
    *		titleButton: Titulo del Boton colocado arriba a la izquierda | STRING | NO REQUERIDA 
    *		url: Url a donde se redirecciona al usuario al pulsar el boton colocado arriba a la izquierda | STRING | NO REQUERIDA 
    */

    const objectSearch = {
        showButton: true,
        showSearch: true,
        titleButton: 'agregar nuevo +',
        url: '/',
    };

    /*
    *	Descripción:
    *		Este objeto contiene tres parametros (titlesColumns, arrayActive, urls)
    *		los cuales contienen informacion para manipular el listado visualizado por el usuario.
    *
    *		titlesColumns: Es un array de objetos donde cada objeto contiene informacion de una columna | OBJECT | REQUERIDA
    *		arrayActive: Es un array Booleano donde cada posicion del vector representa una opcion del listado | BOOL | REQUERIDA
    *		| List | Payment | Visibility | Edit | Delete | Switch | VpnKey |
    *		urls: Titulo del Boton colocado arriba a la izquierda | STRING | NO REQUERIDA 
    */

    const objectList = {
        titlesColumns: [{
            id: 1,
            columName: 'Referencia',
            jsonPath: 'referent',
        },
        {
            id: 2,
            columName: 'Monto',
            jsonPath: 'amount',
        },
        {
            id: 3,
            columName: 'Cuenta Bancaria',
            jsonPath: 'bankAccount',
        },
        {
            id: 4,
            columName: 'Categoria',
            jsonPath: 'category',
        }],
        arrayActive: [false, false, true, true, true, true, false],
    urls: {
        list: {
            type: '',
            path: '',
        },
        payment: '',
        edit: '/',
        },
    };
    /*
    *	Descripción:
    *		Este objeto contiene dos parametros (currentComponent, searchComponent)
    *		a los cuales se les asignan la data traida por la consulta ejecutada.
    *
    *		dataPath: Ruta dentro del objeto respuesta hasta llegar a data | STRING | REQUERIDA
    *		totalPath: Ruta dentro del objeto respuesta hasta llegar a total | STRING | REQUERIDA
    */

    const objectPath = {
        currentComponent: {
            dataPath: '.data'
            totalPath: '.total'
        },
        searchComponent: {
            dataPath: 'search..data',
            totalPath: 'search..total',
        },
    };

    /*
    *	Descripción:
    *		Este objeto contiene los mensajes mostrados en los modales los cuales se muestran al seleccionar una opcion
    */

    const objectModal = {
        componentState: Object.assign({}, objectStateUserType),
        paginationPage,
        messages: {
            edit: {
                title: 'contenido edit modal',
            },
            block: {
                titleStatus1: '',
                msgStatus1: '',
                titleStatus2: '',
                msgStatus2: '',
            },
            delete: {
                title: '',
                msg: '',
            },
        },
    };

    /*
    *	Descripción:
    *		Este objeto contiene las acciones que seran despachadas al seleccionar una opcion del listado
    */

    const actions = {
        edit: actionSetRol,
        openModal: actionOpenModal,
        closeModal: actionCloseModal,
        block: actionBlock,
        queryblock: blockRolMutation,
        delete: actionDelete,
        queryDelete: deleteRolMutation,
    };

    return (
        <div>
            <Search
                showButton={objectSearch.showButton}
                showSearch={objectSearch.showSearch}
                titleButton={objectSearch.titleButton}
                url={objectSearch.url}
            />
            <ContainerList
                queries={objectQuery}
                propsSearchComponent={objectSearch}
                propsListComponent={objectList}
                propsModalComponent={objectModal}
                objectPath={objectPath}
                actions={actions}
            />
        </div>
    );
};

IncomePerEvent.propTypes = {
    actionSetRol: PropTypes.func.isRequired,
    actionOpenModal: PropTypes.func.isRequired,
    actionBlock: PropTypes.func.isRequired,
    actionDelete: PropTypes.func.isRequired,
    actionCloseModal: PropTypes.func.isRequired,
    objectStateIncomePerEvent: PropTypes.object.isRequired,
    paginationPage: PropTypes.number.isRequired,
    blockRolMutation: PropTypes.func.isRequired,
    deleteRolMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    paginationPage: state.ReducerPagination.paginationPage,
    objectStateIncomePerEvent: state.Reducer,
});
const mapDispatchToProps = dispatch => ({
    actionSetRol: (id, descripcion, name) => dispatch(setRol(id, descripcion, name)),
    actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
    actionCloseModal: () => dispatch(closeModal()),
    actionBlock: (componentState, blockRolMutation) =>
        dispatch(blockUserType(componentState, blockRolMutation)),
    actionDelete: (componentState, paginationPage, deleteRolMutation) =>
        dispatch(deleteUserType(componentState, paginationPage, deleteRolMutation)),
});
export default compose(
    graphql(DELETE_ROL, { name: 'deleteRolMutation' }),
    graphql(BLOCK_ROL, { name: 'blockRolMutation' }),
    connect(mapStateToProps, mapDispatchToProps),
)(IncomePerEvent);