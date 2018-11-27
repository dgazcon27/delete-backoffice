import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';

// ActionsCreators
import {
	openModal,
	closeModal,
	blockIncomePerEvent,
	deleteIncomePerEvent,
} from '../../actions/IncomePerEvent/actionsCreators';

// Queries
import {
	GET_INCOME_PER_EVENT,
	BLOCK_INCOME_PER_EVENT,
	DELETE_INCOME_PER_EVENT,
	SEARCH_INCOME_PER_EVENT,
} from '../../queries/incomePerEvent';

const IncomePerEvent = ({
	objectStateIncomePerEvent,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionBlock,
	actionDelete,
	blockMutation,
	deleteMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_INCOME_PER_EVENT,
		querySearch: SEARCH_INCOME_PER_EVENT,
		paramsQueryComponent: {
			event: 4,
		},
	};

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'agregar nuevo +',
		url: '/',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Referencia',
			jsonPath: 'reference',
		},
		{
			id: 2,
			columName: 'Monto',
			jsonPath: 'amount',
		},
		{
			id: 3,
			columName: 'Cuenta Bancaria',
			jsonPath: 'bankAccount.id',
		},
		{
			id: 4,
			columName: 'Categoria',
			jsonPath: 'category.name',
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

	const objectPath = {
		currentComponent: {
			dataPath: 'incomeMovementPagination.data',
			totalPath: 'incomeMovementPagination.total',
		},
		searchComponent: {
			dataPath: 'searchIncome.data',
			totalPath: 'searchIncome.total',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateIncomePerEvent),
		paginationPage,
		messages: {
			edit: {
				title: 'contenido edit modal',
			},
			block: {
				titleStatus1: 'Bloquear ingreso',
				msgStatus1: '¿Desea bloquear este ingreso por evento?',
				titleStatus2: 'Desbloquear ingreso',
				msgStatus2: '¿Desea desbloquear este ingreso por evento?',
			},
			delete: {
				title: 'Eliminar Ingreso',
				msg: '¿Desea eliminar este Ingreso?',
			},
		},
	};

	const actions = {
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		block: actionBlock,
		queryblock: blockMutation,
		delete: actionDelete,
		queryDelete: deleteMutation,
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
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionBlock: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	objectStateIncomePerEvent: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	blockMutation: PropTypes.func.isRequired,
	deleteMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateIncomePerEvent: state.ReducerIncomePerEvent,
});
const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionBlock: (componentState, blockMutation) =>
		dispatch(blockIncomePerEvent(componentState, blockMutation)),
	actionDelete: (componentState, paginationPage, deleteMutation) =>
		dispatch(deleteIncomePerEvent(componentState, paginationPage, deleteMutation)),
});
export default compose(
	graphql(DELETE_INCOME_PER_EVENT, { name: 'deleteMutation' }),
	graphql(BLOCK_INCOME_PER_EVENT, { name: 'blockMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(IncomePerEvent);
