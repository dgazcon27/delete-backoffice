import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	deleteRate,
	editRate,
} from '../../actions/exchangeRate/actionsCreator';
import Title from '../Shared/title';
import {
	GET_RATES,
	DELETE_RATE,
} from '../../queries/exchangeRate';

const ExchangeRate = ({
	objectStateExchangeRate,
	paginationPage,
	actionEditRate,
	actionOpenModal,
	actionCloseModal,
	actionDelete,
	deleteRateMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_RATES,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'actualizar tasa de cambio',
		url: '/update-exchange-rate',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Moneda',
			jsonPath: 'currency.description',
		},
		{
			id: 2,
			columName: 'valor',
			jsonPath: 'value',
		}],
		arrayActive: [false, false, false, true, true, false, false],
		urls: {
			list: {
				type: '',
				path: '',
			},
			payment: '',
			edit: '/update-exchange-rate',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'ratePagination.data',
			totalPath: 'ratePagination.total',
		},
		searchComponent: {
			dataPath: '',
			totalPath: '',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateExchangeRate),
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
				title: 'Eliminar Moneda',
				msg: '¿Estas seguro que desea eliminar esta moneda?',
			},
		},
	};

	const actions = {
		edit: actionEditRate,
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		delete: actionDelete,
		queryDelete: deleteRateMutation,
	};

	return (
		<div>
			<Title title='Tasa de cambio' />
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

ExchangeRate.propTypes = {
	actionEditRate: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	objectStateExchangeRate: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	deleteRateMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateExchangeRate: state.ReducerExchangeRate,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionEditRate: id => dispatch(editRate(id)),
	actionDelete: (componentState, paginationPage, deleteRateMutation) =>
		dispatch(deleteRate(componentState, paginationPage, deleteRateMutation)),
});

export default compose(
	graphql(DELETE_RATE, { name: 'deleteRateMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(ExchangeRate);
