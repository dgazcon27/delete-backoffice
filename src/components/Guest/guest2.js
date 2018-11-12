import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import { deleteInvited } from '../../actions/Guest/actionsCreators';
import {
	openModal,
	closeModal,
} from '../../actions/sharedActions/sharedActions';

import {
	GET_GUESTS,
	SEARCH_INVITED,
	DELETE_GUEST,
} from '../../queries/guest';

const Invites2 = ({
	objectStateInvited,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionDelete,
	deleteMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_GUESTS,
		querySearch: SEARCH_INVITED,
	};

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'agregar nuevo',
		url: '/guest-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Nombre',
			jsonPath: 'user.name',
		},
		{
			id: 2,
			columName: 'Apellido',
			jsonPath: 'user.lastName',
		}],
		arrayActive: [false, false, true, true, false, false],
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
			dataPath: 'inviteds.data',
			totalPath: 'inviteds.total',
		},
		searchComponent: {
			dataPath: 'search.inviteds.data',
			totalPath: 'search.inviteds.total',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateInvited),
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
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
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

Invites2.propTypes = {
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	objectStateInvited: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	deleteMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateInvited: state.ReducerGuest,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDelete: (componentState, paginationPage, deleteMutation) =>
		dispatch(deleteInvited(componentState, paginationPage, deleteMutation)),
});

export default compose(
	graphql(DELETE_GUEST, { name: 'deleteMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Invites2);
