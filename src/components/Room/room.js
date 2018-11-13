import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	blockRoom,
	deleteRoom,
} from '../../actions/Room/actionsCreators';

import {
	GET_ROOMS,
	BLOCK_ROOM,
	DELETE_ROOM,
} from '../../queries/room';

const Room = ({
	objectStateRoom,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionBlock,
	actionDelete,
	blockRoomMutation,
	deleteRoomMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_ROOMS,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'agregar nuevo',
		url: '/room-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Nombre',
			jsonPath: 'name',
		},
		{
			id: 2,
			columName: 'Tipo',
			jsonPath: 'type',
		},
		{
			id: 3,
			columName: 'Capacidad',
			jsonPath: 'capacity',
		},
		{
			id: 4,
			columName: 'Hotel',
			jsonPath: 'hotel.provider.name',
		},
		{
			id: 5,
			columName: 'Evento',
			jsonPath: 'event.name',
		}],
		arrayActive: [false, false, true, true, true, false],
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
			dataPath: 'rooms.data',
			totalPath: 'rooms.total',
		},
		searchComponent: {
			dataPath: '',
			totalPath: '',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateRoom),
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
		// edit: actionSetRol,
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		block: actionBlock,
		queryblock: blockRoomMutation,
		delete: actionDelete,
		queryDelete: deleteRoomMutation,
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

Room.propTypes = {
	// actionSetRol: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionBlock: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	objectStateRoom: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	blockRoomMutation: PropTypes.func.isRequired,
	deleteRoomMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateRoom: state.ReducerRoom,
});

const mapDispatchToProps = dispatch => ({
	// actionSetRol: (id, descripcion, name) => dispatch(setRol(id, descripcion, name)),
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionBlock: (componentState, blockRoomMutation) =>
		dispatch(blockRoom(componentState, blockRoomMutation)),
	actionDelete: (componentState, paginationPage, deleteRoomMutation) =>
		dispatch(deleteRoom(componentState, paginationPage, deleteRoomMutation)),
});

export default compose(
	graphql(DELETE_ROOM, { name: 'deleteRoomMutation' }),
	graphql(BLOCK_ROOM, { name: 'blockRoomMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Room);
