import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	deletePayment,
} from '../../actions/Payment/actionsCreators';

import {
	GET_PAYMENTS,
	DELETE_PAYMENT,
} from '../../queries/payment';

const Payment = ({
	objectStatePayment,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionDelete,
	deletePaymentMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_PAYMENTS,
	};

	const objectSearch = {
		showButton: false,
		showSearch: false,
		titleButton: '',
		url: '',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Monto',
			jsonPath: 'payment.amount',
		},
		{
			id: 2,
			columName: 'Referencia',
			jsonPath: 'payment.reference',
		},
		{
			id: 3,
			columName: 'Banco',
			jsonPath: 'payment.bankAccount.bank.name',
		},
		{
			id: 4,
			columName: 'Fecha',
			jsonPath: 'payment.created_at',
		}],
		arrayActive: [false, false, true, true, false, false],
		urls: {
			list: {
				type: '',
				path: '',
			},
			payment: '',
			edit: '/pre-sale-edit',
		},
		keyId: 'payment.id',
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'payments.data',
			totalPath: 'payments.total',
		},
		searchComponent: {
			dataPath: '',
			totalPath: '',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStatePayment),
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
				title: 'Eliminar Rol',
				msg: '¿Estas seguro que desea eliminar el rol ?',
			},
		},
	};

	const actions = {
		//	edit: actionSetRol,
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		delete: actionDelete,
		queryDelete: deletePaymentMutation,
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

Payment.propTypes = {
	// actionSetRol: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	objectStatePayment: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	deletePaymentMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStatePayment: state.ReducerPayment,
});

const mapDispatchToProps = dispatch => ({
	// actionSetRol: (id, descripcion, name) => dispatch(setRol(id, descripcion, name)),
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDelete: (componentState, paginationPage, deletePaymentMutation) =>
		dispatch(deletePayment(componentState, paginationPage, deletePaymentMutation)),
});

export default compose(
	graphql(DELETE_PAYMENT, { name: 'deletePaymentMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Payment);
