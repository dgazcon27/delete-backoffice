import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	setZone,
	blockZone,
	deleteZone,
} from '../../actions/zone/actionsCreators';

import {
	GET_ZONES,
	BLOCK_ZONE,
	DELETE_ZONE,
} from '../../queries/zone';
import { SEARCH_ZONES } from '../../queries/search';

const Zone = ({
	objectStateZone,
	paginationPage,
	actionSetZone,
	actionOpenModal,
	actionCloseModal,
	actionBlock,
	actionDelete,
	blockZoneMutation,
	deleteZoneMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_ZONES,
		querySearch: SEARCH_ZONES,
	};

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'crear zona',
		url: '/Departments-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Nombre',
			jsonPath: 'name',
		}],
		arrayActive: [false, false, true, true, true, false],
		urls: {
			list: {
				type: '',
				path: '',
			},
			payment: '',
			edit: '/Departments-edit',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'zoness.data',
			totalPath: 'zoness.total',
		},
		searchComponent: {
			dataPath: 'search.zones.data',
			totalPath: 'search.zones.total',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateZone),
		paginationPage,
		messages: {
			edit: {
				title: 'contenido edit modal',
			},
			block: {
				titleStatus1: 'Bloquear Zona',
				msgStatus1: '¿Estas seguro que desea bloquear esta zona?',
				titleStatus2: 'Desbloquear zona',
				msgStatus2: '¿Estas seguro que desea desbloquear esta zona?',
			},
			delete: {
				title: 'Eliminar zona',
				msg: '¿Estas seguro que desea eliminar esta zona ?',
			},
		},
	};

	const actions = {
		edit: actionSetZone,
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		block: actionBlock,
		queryblock: blockZoneMutation,
		delete: actionDelete,
		queryDelete: deleteZoneMutation,
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

Zone.propTypes = {
	actionSetZone: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionBlock: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	objectStateZone: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	blockZoneMutation: PropTypes.func.isRequired,
	deleteZoneMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateZone: state.ReducerZone,
});

const mapDispatchToProps = dispatch => ({
	actionSetZone: (id, descripcion, name) => dispatch(setZone(id, descripcion, name)),
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionBlock: (componentState, blockRolMutation) =>
		dispatch(blockZone(componentState, blockRolMutation)),
	actionDelete: (componentState, paginationPage, deleteRolMutation) =>
		dispatch(deleteZone(componentState, paginationPage, deleteRolMutation)),
});

export default compose(
	graphql(DELETE_ZONE, { name: 'deleteZoneMutation' }),
	graphql(BLOCK_ZONE, { name: 'blockZoneMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Zone);
