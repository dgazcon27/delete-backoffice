import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import { ExportModal2 } from '../ExportModal/ExportModal';
import styles from '../Shared/sharedStyles';
// ActionsCreators
import {
	openModalIncome,
	closeModalIncome,
	blockIncomePerEvent,
	deleteIncomePerEvent,
	toggleShow,
} from '../../actions/Movement/actionsCreators';

import Search from '../Search/search';
// Queries
import {
	GET_INCOME_PER_EVENT,
	GET_ALL_INCOME_PER_EVENT,
	BLOCK_INCOME_PER_EVENT,
	DELETE_INCOME_PER_EVENT,
	SEARCH_INCOME_PER_EVENT,
} from '../../queries/movement';


const IncomePerEvent = ({
	objectStateIncomePerEvent,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionBlock,
	actionDelete,
	blockMutation,
	deleteMutation,
	match,
	classes,
}) => {
	const event = match.params.id;
	const objectQuery = {
		queryComponent: GET_INCOME_PER_EVENT,
		querySearch: SEARCH_INCOME_PER_EVENT,
		paramsQueryComponent: {
			event,
		},
	};
	const alt = window.location.pathname.split('/')[2];
	const x = { event: alt };

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'agregar nuevo',
		url: `/movement/income/event/create/${event}`,
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
			visibility: '/movement/income/show',

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

			<Button variant='extendedFab' aria-label='Import' className={classes.importButton}>
				<div className={classes.searchAlignRigth}>
					<ExportModal2 pass={GET_ALL_INCOME_PER_EVENT} event={x} />
				</div>
			</Button>


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
	match: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateIncomePerEvent: state.ReducerMovement,
});
const mapDispatchToProps = dispatch => ({
	actionShowToggle: show => dispatch(toggleShow(show)),
	actionOpenModal: (modalType, data) => dispatch(openModalIncome(modalType, data)),
	actionCloseModal: () => dispatch(closeModalIncome()),
	actionBlock: (componentState, blockMutation) =>
		dispatch(blockIncomePerEvent(componentState, blockMutation)),
	actionDelete: (componentState, paginationPage, deleteMutation) =>
		dispatch(deleteIncomePerEvent(componentState, paginationPage, deleteMutation)),
});
export default compose(
	graphql(DELETE_INCOME_PER_EVENT, { name: 'deleteMutation' }),
	graphql(BLOCK_INCOME_PER_EVENT, { name: 'blockMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(IncomePerEvent);
