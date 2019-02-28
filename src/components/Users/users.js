import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	blockUser,
	deleteUser,
	openModal,
	closeModal,
} from '../../actions/users/actionsCreators';
import Title from '../Shared/title';
import {
	GET_USERS_F,
	BLOCK_USER,
	DELETE_USER,
} from '../../queries/users';

import { SEARCH_USERS } from '../../queries/search';

const Users = ({
	objectStateAccess,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionDelete,
	actionBlock,
	deleteUserMutation,
	blockUserMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_USERS_F,
		querySearch: SEARCH_USERS,
	};

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'agregar nuevo',
		url: '/users-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Nombre',
			jsonPath: 'name',
		},
		{
			id: 2,
			columName: 'Apellido',
			jsonPath: 'lastName',
		},
		{
			id: 3,
			columName: 'Tipo de Usuario',
			jsonPath: 'role.name',
		},
		{
			id: 4,
			columName: 'Correo Electronico',
			jsonPath: 'email',
		}],
		arrayActive: [false, false, false, true, true, true, true],
		urls: {
			list: {
				type: '',
				path: '',
			},
			payment: '',
			edit: '/users-edit',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'pagedUsersFilter.data',
			totalPath: 'pagedUsersFilter.total',
		},
		searchComponent: {
			dataPath: 'search.pagedUsersFilter.data',
			totalPath: 'search.pagedUsersFilter.total',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateAccess),
		paginationPage,
		messages: {
			edit: {
				title: 'contenido edit modal',
			},
			block: {
				titleStatus1: 'Bloquear usuario',
				msgStatus1: '¿Estas seguro que desea bloquear este Usuario?',
				titleStatus2: 'Desbloquear usuario',
				msgStatus2: '¿Esta seguro que desea desbloquear este Usuario?',
			},
			delete: {
				title: 'Eliminar usuario',
				msg: '¿Esta seguro que desea eliminar este Usuario?',
			},
		},
	};

	const actions = {
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		block: actionBlock,
		queryblock: blockUserMutation,
		delete: actionDelete,
		queryDelete: deleteUserMutation,
	};

	return (
		<div>
			<Title title='Usuarios' />
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

Users.propTypes = {
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	actionBlock: PropTypes.func.isRequired,
	objectStateAccess: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	deleteUserMutation: PropTypes.func.isRequired,
	blockUserMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateAccess: state.ReducerUser,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDelete: (componentState, paginationPage, deleteUserMutation) =>
		dispatch(deleteUser(componentState, paginationPage, deleteUserMutation)),
	actionBlock: (componentState, blockUserMutation) =>
		dispatch(blockUser(componentState, blockUserMutation)),
});

export default compose(
	graphql(DELETE_USER, { name: 'deleteUserMutation' }),
	graphql(BLOCK_USER, { name: 'blockUserMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Users);
