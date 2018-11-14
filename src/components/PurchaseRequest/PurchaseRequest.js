import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	deletePurchaseReq,
	setToPay,
} from '../../actions/PurchaseRequest/actionsCreators';

import {
	DELETE_PURCHASE_REQ,
	GET_PURCHASE_REQ,
} from '../../queries/purchaseRequest';

const PurchaseRequest = ({
	objectStatePurchaseRequest,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionDelete,
	deletePurchaseReqMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_PURCHASE_REQ,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'agregar nuevo',
		url: '/purchase-request-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Cliente',
			jsonPath: 'user.name',
		},
		{
			id: 2,
			columName: 'Documento de Identidad',
			jsonPath: 'user.dni',
		},
		{
			id: 3,
			columName: 'Acceso',
			jsonPath: 'access.name',
		},
		{
			id: 4,
			columName: 'Pendiente por pagar',
			jsonPath: 'pendingPayment',
		},
		{
			id: 5,
			columName: 'Evento',
			jsonPath: 'event.name',
		}],
		arrayActive: [true, true, true, true, false, false],
		urls: {
			list: {
				type: 'viewModal',
				path: 'event-access',
			},
			payment: 'Pay',
			edit: '/purchase-request-edit',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'purchaseRequests.data',
			totalPath: 'purchaseRequests.total',
		},
		searchComponent: {
			dataPath: '',
			totalPath: '',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStatePurchaseRequest),
		paginationPage,
		messages: {
			edit: {
				title: 'contenido edit modal',
			},
			block: {
				titleStatus1: 'Bloquear Rol',
				msgStatus1: '¿Estas seguro que desea bloquear el rol?',
				titleStatus2: 'Desbloquear Rol',
				msgStatus2: '¿Estas seguro que desea desbloquear el rol?',
			},
			delete: {
				title: 'Eliminar Compra',
				msg: '¿Estas seguro que desea eliminar esta compra?',
			},
		},
	};

	const actions = {
		//	edit: actionSetRol,
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		delete: actionDelete,
		queryDelete: deletePurchaseReqMutation,
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

PurchaseRequest.propTypes = {
	// actionSetRol: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	objectStatePurchaseRequest: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	deletePurchaseReqMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStatePurchaseRequest: state.ReducerPurchaseRequest,
});

const mapDispatchToProps = dispatch => ({
	// actionSetRol: (id, descripcion, name) => dispatch(setRol(id, descripcion, name)),
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDelete: (componentState, paginationPage, deletePurchaseReqMutation) =>
		dispatch(deletePurchaseReq(componentState, paginationPage, deletePurchaseReqMutation)),
	actionSetToPay: (id, userId) => dispatch(setToPay(id, userId)),
});

export default compose(
	graphql(DELETE_PURCHASE_REQ, { name: 'deletePurchaseReqMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(PurchaseRequest);
