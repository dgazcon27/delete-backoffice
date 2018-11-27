import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import Title from '../Shared/title';
import { GET_EVENTS } from '../../queries/event';

const Expenses = ({
	objectStateEvent,
	paginationPage,
}) => {
	const objectQuery = {
		queryComponent: GET_EVENTS,
	};

	const objectSearch = {
		showButton: false,
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
		arrayActive: [false, false, true, false, false, false, false],
		urls: {
			list: {
				type: 'viewList',
				path: 'event-access',
			},
			payment: '',
			edit: '',
			visibility: '/expense-per-event',
		},
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
				title: '',
			},
			block: {
				titleStatus1: '',
				msgStatus1: '',
				titleStatus2: '',
				msgStatus2: '',
			},
			delete: {
				title: '',
				msg: '',
			},
		},
	};

	const actions = {
		openModal: '',
		closeModal: '',
		delete: '',
		queryDelete: '',
	};

	return (
		<div>
			<Title title='Gastos por evento' />
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

Expenses.propTypes = {
	objectStateEvent: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateEvent: state.ReducerEvent,
});

const mapDispatchToProps = () => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Expenses);
