import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../../components/Search/search';
import {
	deleteBank,
	openModal,
	closeModal,
} from '../../actions/Bank/actionsCreators';

import {
	GET_BANKS,
	DELETE_BANK,
} from '../../queries/bank';

const TestFinal = ({
	objectStateBank,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionDelete,
	deleteBankMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_BANKS,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'agregar nuevo',
		url: '/bank-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Nombre',
			jsonPath: 'name',
		},
		{
			id: 2,
			columName: 'Moneda',
			jsonPath: 'currency',
		}],
		arrayActive: [true, true, false, false],
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'banks.data',
			totalPath: 'banks.total',
		},
		searchComponent: {
			dataPath: 'search.banks.data',
			totalPath: 'search.banks.total',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateBank),
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
				title: 'Eliminar Banco',
				msg: '¿Estas seguro que desea eliminar este Banco?',
			},
		},
	};

	const actions = {
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		delete: actionDelete,
		queryDelete: deleteBankMutation,
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

TestFinal.propTypes = {
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	objectStateBank: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	deleteBankMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateBank: state.ReducerBank,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDelete: (componentState, paginationPage, deleteBankMutation) =>
		dispatch(deleteBank(componentState, paginationPage, deleteBankMutation)),
});

export default compose(
	graphql(DELETE_BANK, { name: 'deleteBankMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(TestFinal);
