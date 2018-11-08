import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	deleteLocation,
} from '../../actions/location/actionsCreators';

import {
	GET_LOCATIONS,
	DELETE_LOCATION,
} from '../../queries/location';
import { SEARCH_LOCATIONS } from '../../queries/search';

const Location = ({
	objectStateLocation,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionDelete,
	deleteRolMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_LOCATIONS,
		querySearch: SEARCH_LOCATIONS,
	};

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'Crear Ubicación',
		url: '/create-tables',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Nombre',
			jsonPath: 'name',
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
			dataPath: 'locations.data',
			totalPath: 'locations.total',
		},
		searchComponent: {
			dataPath: 'search.locations.data',
			totalPath: 'search.locations.total',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateLocation),
		paginationPage,
		messages: {
			edit: {
				title: '',
			},
			block: {
				titleStatus1: '',
				msgStatus1: '',
				titleStatus2: '',
				msgStatus2: '',
			},
			delete: {
				title: 'Eliminar Ubicación',
				msg: '¿Estas seguro que desea eliminar esta ubicación?',
			},
		},
	};

	const actions = {
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
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

Location.propTypes = {
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	objectStateLocation: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	deleteRolMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateLocation: state.ReducerLocation,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDelete: (componentState, paginationPage, deleteRolMutation) =>
		dispatch(deleteLocation(componentState, paginationPage, deleteRolMutation)),
});

export default compose(
	graphql(DELETE_LOCATION, { name: 'deleteRolMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Location);
