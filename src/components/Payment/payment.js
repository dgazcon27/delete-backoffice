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
	SEARCH_PAYMENT_LIST,
	GET_PAYMENTS,
	DELETE_PAYMENT,
} from '../../queries/payment';
import Title from '../Shared/title';

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
		querySearch: SEARCH_PAYMENT_LIST,

	};

	const objectSearch = {
		showButton: false,
		showSearch: true,
		titleButton: '',
		url: '',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Monto',
			jsonPath: 'amount',
		},
		{
			id: 2,
			columName: 'Referencia',
			jsonPath: 'reference',
		},
		{
			id: 3,
			columName: 'Banco',
			jsonPath: 'bankAccount.bank.name',
		},
		{
			id: 4,
			columName: 'Fecha',
			jsonPath: 'created_at',
		}],
		arrayActive: [false, false, true, false, true, false, false],
		urls: {
			list: {
				type: '',
				path: '',
			},
			payment: '',
			visibility: '/pre-sale-edit',
		},
		keyId: 'id',
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'payments.data',
			totalPath: 'payments.total',
		},
		searchComponent: {
			dataPath: 'searchPaymentList.data',
			totalPath: 'searchPaymentList.total',
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
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		delete: actionDelete,
		queryDelete: deletePaymentMutation,
	};

	return (
		<div>
			<Title title='Pagos' />
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
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDelete: (componentState, paginationPage, deletePaymentMutation) =>
		dispatch(deletePayment(componentState, paginationPage, deletePaymentMutation)),
});

export default compose(
	graphql(DELETE_PAYMENT, { name: 'deletePaymentMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Payment);
