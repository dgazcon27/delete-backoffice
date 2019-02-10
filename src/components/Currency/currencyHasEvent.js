import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	deleteCurrencyHasEvent,
} from '../../actions/Currency/actionsCreators';
import Title from '../Shared/title';

import {
	GET_CURRENCIES_HAS_EVENT,
	DELETE_CURRENCIES_HAS_EVENT,
} from '../../queries/currency';

const CurrencyHasEvent = ({
	objectStateEvent,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionDelete,
	deleteEventMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_CURRENCIES_HAS_EVENT,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'agregar nuevo',
		url: '/currency/events/create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Moneda',
			jsonPath: 'currency.description',
		},
		{
			id: 2,
			columName: 'Evento',
			jsonPath: 'event.name',
		}],
		arrayActive: [false, false, false, false, true, false, false],
		urls: {
			list: {
				type: '',
				path: '',
			},
			payment: '',
			edit: '',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'currencyHasEventPagination.data',
			totalPath: 'currencyHasEventPagination.total',
		},
		searchComponent: {
			dataPath: '',
			totalPath: '',
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
				title: 'Eliminar moneda de un evento',
				msg: '¿Estas seguro que desea eliminar esta moneda?',
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
			<Title title='Monedas de un evento' />
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

CurrencyHasEvent.propTypes = {
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	objectStateEvent: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	deleteEventMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateEvent: state.ReducerCurrency,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDelete: (componentState, paginationPage, deleteEventMutation) =>
		dispatch(deleteCurrencyHasEvent(componentState, paginationPage, deleteEventMutation)),
});

export default compose(
	graphql(DELETE_CURRENCIES_HAS_EVENT, { name: 'deleteEventMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(CurrencyHasEvent);
