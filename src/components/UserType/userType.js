import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	setRol,
	blockUserType,
	deleteUserType,
} from '../../actions/userType/actionsCreators';
import Title from '../Shared/title';
import {
	GET_ROLES,
	BLOCK_ROL,
	DELETE_ROL,
} from '../../queries/userType';
import { SEARCH_ROLES } from '../../queries/search';

const UserType = ({
	objectStateUserType,
	paginationPage,
	actionSetRol,
	actionOpenModal,
	actionCloseModal,
	actionBlock,
	actionDelete,
	blockRolMutation,
	deleteRolMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_ROLES,
		querySearch: SEARCH_ROLES,
	};

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'agregar nuevo',
		url: '/user-type-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Nombre',
			jsonPath: 'name',
		}],
		arrayActive: [false, false, false, true, true, true, false],
		urls: {
			list: {
				type: '',
				path: '',
			},
			payment: '',
			edit: '/user-type-edit',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'roles.data',
			totalPath: 'roles.total',
		},
		searchComponent: {
			dataPath: 'search.roles.data',
			totalPath: 'search.roles.total',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateUserType),
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
		edit: actionSetRol,
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		block: actionBlock,
		queryblock: blockRolMutation,
		delete: actionDelete,
		queryDelete: deleteRolMutation,
	};

	return (
		<div>
			<Title title='Roles' />
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

UserType.propTypes = {
	actionSetRol: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionBlock: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	objectStateUserType: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	blockRolMutation: PropTypes.func.isRequired,
	deleteRolMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateUserType: state.ReducerUserType,
});

const mapDispatchToProps = dispatch => ({
	actionSetRol: (id, descripcion, name) => dispatch(setRol(id, descripcion, name)),
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionBlock: (componentState, blockRolMutation) =>
		dispatch(blockUserType(componentState, blockRolMutation)),
	actionDelete: (componentState, paginationPage, deleteRolMutation) =>
		dispatch(deleteUserType(componentState, paginationPage, deleteRolMutation)),
});

export default compose(
	graphql(DELETE_ROL, { name: 'deleteRolMutation' }),
	graphql(BLOCK_ROL, { name: 'blockRolMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(UserType);
