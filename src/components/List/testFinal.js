import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from './containerList';
import Search from '../../components/Search/search';
import {
	openModal,
	closeModal,
	setRol,
	blockUserType,
	deleteUserType,
} from '../../actions/userType/actionsCreators';

import {
	GET_ROLES,
	BLOCK_ROL,
	DELETE_ROL,
} from '../../queries/userType';
import { SEARCH_ROLES } from '../../queries/search';

/* import {
	openModal,
	closeModal,
	setRol,
} from '../../actions/userType/actionsCreators'; */

const TestFinal = ({
	id,
	isOpen,
	modalType,
	paginationPage,
	statusValue,
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
		titleButton: 'Add Algo',
		url: '/',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Nombre',
			jsonPath: 'name',
		}],
		arrayActive: [true, true, true, true],
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
		id,
		isOpen,
		modalType,
		statusValue,
		paginationPage,
		messages: {
			edit: {
				title: 'contenido edit modal',
			},
			block: {
				titleStatus1: 'Bloquear Rol',
				msgStatus1: '¿Estas seguro que desea bloquear el rol ?',
				titleStatus2: 'Desbloquear Rol',
				msgStatus2: '¿Estas seguro que desea desbloquear el rol ?',
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
	actionSetRol: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionBlock: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
	isOpen: PropTypes.bool.isRequired,
	modalType: PropTypes.string.isRequired,
	statusValue: PropTypes.number.isRequired,
	paginationPage: PropTypes.number.isRequired,
	blockRolMutation: PropTypes.func.isRequired,
	deleteRolMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	id: state.ReducerUserType.id,
	statusValue: state.ReducerUserType.statusValue,
	paginationPage: state.ReducerPagination.paginationPage,
	isOpen: state.ReducerUserType.isOpen,
	modalType: state.ReducerUserType.modalType,
});

const mapDispatchToProps = dispatch => ({
	actionSetRol: (id, descripcion, name) => dispatch(setRol(id, descripcion, name)),
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionBlock: (id, statusValue, blockRolMutation) =>
		dispatch(blockUserType(id, statusValue, blockRolMutation)),
	actionDelete: (id, statusValue, paginationPage, deleteRolMutation) =>
		dispatch(deleteUserType(id, statusValue, paginationPage, deleteRolMutation)),
});

export default compose(
	graphql(DELETE_ROL, { name: 'deleteRolMutation' }),
	graphql(BLOCK_ROL, { name: 'blockRolMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(TestFinal);
