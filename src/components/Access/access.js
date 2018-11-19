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
} from '../../actions/Access/actionsCreators';

import {
	GET_ACCESS,
	DELETE_ACCESS,
} from '../../queries/access';

const Access = ({
	objectStateAccess,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionDelete,
	deleteAccessMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_ACCESS,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'crear acceso',
		url: '/access-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Nombre',
			jsonPath: 'name',
		},
		{
			id: 2,
			columName: 'Ubicación',
			jsonPath: 'location.name',
		}],
		arrayActive: [false, false, false, true, true, false, false],
		urls: {
			list: {
				type: '',
				path: '',
			},
			payment: '',
			edit: '/access-edit',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'access.data',
			totalPath: 'access.total',
		},
		searchComponent: {
			dataPath: '',
			totalPath: '',
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
				titleStatus1: '',
				msgStatus1: '',
				titleStatus2: '',
				msgStatus2: '',
			},
			delete: {
				title: 'Eliminar Acceso',
				msg: '¿Estas seguro que desea eliminar el acceso?',
			},
		},
	};

	const actions = {
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
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

Access.propTypes = {
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	objectStateAccess: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	deleteAccessMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateAccess: state.ReducerAccess,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDelete: (componentState, paginationPage, deleteAccessMutation) =>
		dispatch(deleteAccess(componentState, paginationPage, deleteAccessMutation)),
});

export default compose(
	graphql(DELETE_ACCESS, { name: 'deleteAccessMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Access);
