import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	setProvider,
	blockProvider,
	deleteProvider,
} from '../../actions/Provider/actionsCreators';

import {
	GET_PROVIDERS,
	BLOCK_PROVIDER,
	DELETE_PROVIDER,
} from '../../queries/providers';
import { SEARCH_PROVIDER } from '../../queries/search';

const Provider = ({
	objectStateProvider,
	paginationPage,
	actionSetProvider,
	actionOpenModal,
	actionCloseModal,
	actionBlock,
	actionDelete,
	blockProviderMutation,
	deleteProviderMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_PROVIDERS,
		querySearch: SEARCH_PROVIDER,
	};

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'agregar nuevo',
		url: '/provider-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'RIF',
			jsonPath: 'rif',
		}, {
			id: 2,
			columName: 'Nombre',
			jsonPath: 'name',
		}, {
			id: 3,
			columName: 'Correo',
			jsonPath: 'email',
		}, {
			id: 4,
			columName: 'Estado',
			jsonPath: 'state.name',
		}, {
			id: 5,
			columName: 'Categoría',
			jsonPath: 'category.name',
		}],
		arrayActive: [false, false, true, true, false, true, false],
		urls: {
			list: {
				type: '',
				path: '',
			},
			payment: '',
			edit: '/provider-edit',
			details: 'provider-details',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'providersPagination.data',
			totalPath: 'providersPagination.total',
		},
		searchComponent: {
			dataPath: 'search.providers.data',
			totalPath: 'search.providers.total',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateProvider),
		paginationPage,
		messages: {
			edit: {
				title: 'contenido edit modal',
			},
			block: {
				titleStatus1: 'Bloquear Proveedor',
				msgStatus1: '¿Estas seguro que desea bloquear el proveedor?',
				titleStatus2: 'Desbloquear Proveedor',
				msgStatus2: '¿Estas seguro que desea desbloquear el proveedor?',
			},
			delete: {
				title: 'Eliminar Proveedor',
				msg: '¿Estas seguro que desea eliminar el proveedor?',
			},
		},
	};

	const actions = {
		edit: actionSetProvider,
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		block: actionBlock,
		queryblock: blockProviderMutation,
		delete: actionDelete,
		queryDelete: deleteProviderMutation,
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

Provider.propTypes = {
	actionSetProvider: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionBlock: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	objectStateProvider: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	blockProviderMutation: PropTypes.func.isRequired,
	deleteProviderMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateProvider: state.ReducerProvider,
});

const mapDispatchToProps = dispatch => ({
	actionSetProvider: provider => dispatch(setProvider(provider)),
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionBlock: (componentState, blockProviderMutation) =>
		dispatch(blockProvider(componentState, blockProviderMutation)),
	actionDelete: (componentState, paginationPage, deleteProviderMutation) =>
		dispatch(deleteProvider(componentState, paginationPage, deleteProviderMutation)),
});

export default compose(
	graphql(DELETE_PROVIDER, { name: 'deleteProviderMutation' }),
	graphql(BLOCK_PROVIDER, { name: 'blockProviderMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Provider);
