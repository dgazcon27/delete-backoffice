import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	deleteAccess,
	blockAccess,
} from '../../actions/Event/Access/actionsCreators';

import {
	GET_ACCESS,
	DELETE_ACCESS,
	BLOCK_ACCESS,
} from '../../queries/event';

const AccessList2 = ({
	objectStateAccessList,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionBlock,
	actionDelete,
	deleteAccessMutation,
	blockAccessMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_ACCESS,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'crear acceso',
		url: '/',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Nombre',
			jsonPath: 'access.name',
		},
		{
			id: 2,
			columName: 'Ubicación',
			jsonPath: 'access.location.name',
		},
		{
			id: 3,
			columName: 'Habitación',
			jsonPath: 'access.withRoom',
		},
		{
			id: 4,
			columName: 'Cantidad',
			jsonPath: 'access.numberRooms',
		}],
		arrayActive: [false, true, true, true, false],
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'accessesByEvent[0].data',
			totalPath: 'accessesByEvent[0].total',
		},
		searchComponent: {
			dataPath: '',
			totalPath: '',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateAccessList),
		paginationPage,
		messages: {
			edit: {
				title: 'contenido edit modal',
			},
			block: {
				titleStatus1: 'Bloquear Acceso',
				msgStatus1: '¿Estas seguro que desea bloquear el Acceso?',
				titleStatus2: 'Desbloquear Acceso',
				msgStatus2: '¿Estas seguro que desea desbloquear el Acceso?',
			},
			delete: {
				title: 'Eliminar Acceso',
				msg: '¿Estas seguro que desea eliminar el Acceso?',
			},
		},
	};

	const actions = {
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		block: actionBlock,
		queryblock: blockAccessMutation,
		delete: actionDelete,
		queryDelete: deleteAccessMutation,
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

AccessList2.propTypes = {
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionBlock: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	objectStateAccessList: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	blockAccessMutation: PropTypes.func.isRequired,
	deleteAccessMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateAccessList: state.ReducerEventAccess,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionBlock: (componentState, blockAccessMutation) =>
		dispatch(blockAccess(componentState, blockAccessMutation)),
	actionDelete: (componentState, paginationPage, deleteAccessMutation) =>
		dispatch(deleteAccess(componentState, paginationPage, deleteAccessMutation)),
});

export default compose(
	graphql(DELETE_ACCESS, { name: 'deleteAccessMutation' }),
	graphql(BLOCK_ACCESS, { name: 'blockAccessMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(AccessList2);
