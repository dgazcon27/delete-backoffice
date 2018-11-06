import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	deleteEvent,
} from '../../actions/Event/actionsCreators';

import {
	GET_EVENTS,
	DELETE_EVENT,
} from '../../queries/event';

const Event = ({
	objectStateEvent,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionDelete,
	deleteEventMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_EVENTS,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'agregar nuevo',
		url: '/events-create',
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
			jsonPath: 'state.country.name',
		}],
		arrayActive: [true, true, true, false, false],
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'events.data',
			totalPath: 'events.total',
		},
		searchComponent: {
			dataPath: 'search.events.data',
			totalPath: 'search.events.total',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateEvent),
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
				title: 'Eliminar evento',
				msg: '¿Estas seguro que desea eliminar este evento?',
			},
		},
	};

	const actions = {
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		delete: actionDelete,
		queryDelete: deleteEventMutation,
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

Event.propTypes = {
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	objectStateEvent: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	deleteEventMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateEvent: state.ReducerEvent,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDelete: (componentState, paginationPage, deleteEventMutation) =>
		dispatch(deleteEvent(componentState, paginationPage, deleteEventMutation)),
});

export default compose(
	graphql(DELETE_EVENT, { name: 'deleteEventMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Event);
