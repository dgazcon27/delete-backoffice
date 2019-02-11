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
	blockExpensePerEvent,
	deleteExpensePerEvent,
} from '../../actions/Movement/actionsCreators';

// Queries
import {
	GET_EXPENSE_PER_EVENT,
	BLOCK_EXPENSE_PER_EVENT,
	DELETE_EXPENSE_PER_EVENT,
	SEARCH_EXPENSES_PER_EVENT,
} from '../../queries/movement';

const ExpensePerEvent = ({
	objectStateExpensePerEvent,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionBlock,
	actionDelete,
	blockMutation,
	deleteMutation,
	match,
}) => {
	const event = match.params.id;
	const objectQuery = {
		queryComponent: GET_EXPENSE_PER_EVENT,
		querySearch: SEARCH_EXPENSES_PER_EVENT,
		paramsQueryComponent: {
			event,
		},
	};

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'agregar nuevo',
		url: `/movement/expenses/event/create/${event}`,
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
			jsonPath: 'bankAccount.accountNumber',
		},
		{
			id: 4,
			columName: 'Categoria',
			jsonPath: 'category.name',
		}],
		arrayActive: [false, false, true, false, false, true, false],
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
			dataPath: 'expensesMovementPagination.data',
			totalPath: 'expensesMovementPagination.total',
		},
		searchComponent: {
			dataPath: 'searchExpenses.data',
			totalPath: 'searchExpenses.total',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateExpensePerEvent),
		paginationPage,
		messages: {
			edit: {
				title: 'contenido edit modal',
			},
			block: {
				titleStatus1: 'Bloquear egreso',
				msgStatus1: '¿Desea bloquear este egreso por evento?',
				titleStatus2: 'Desbloquear egreso',
				msgStatus2: '¿Desea desbloquear este egreso por evento?',
			},
			delete: {
				title: 'Eliminar egreso',
				msg: '¿Desea eliminar este egreso?',
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

ExpensePerEvent.propTypes = {
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionBlock: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	objectStateExpensePerEvent: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	blockMutation: PropTypes.func.isRequired,
	deleteMutation: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateExpensePerEvent: state.ReducerMovement,
});
const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionBlock: (componentState, blockMutation) =>
		dispatch(blockExpensePerEvent(componentState, blockMutation)),
	actionDelete: (componentState, paginationPage, deleteMutation) =>
		dispatch(deleteExpensePerEvent(componentState, paginationPage, deleteMutation)),
});
export default compose(
	graphql(DELETE_EXPENSE_PER_EVENT, { name: 'deleteMutation' }),
	graphql(BLOCK_EXPENSE_PER_EVENT, { name: 'blockMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(ExpensePerEvent);
