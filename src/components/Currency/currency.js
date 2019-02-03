import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	deleteCurrency,
} from '../../actions/Currency/actionsCreators';

import 	{
	GET_CURRENCY,
	DELETE_CURRENCY,
} from '../../queries/currency';
import Title from '../Shared/title';

const Currency = ({
	objectStateBank,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionDelete,
	deleteCurrencyMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_CURRENCY,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'agregar nuevo',
		url: '/Currency-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'id',
			jsonPath: 'id',
		},
		{
			id: 2,
			columName: 'Moneda',
			jsonPath: 'description',
		}],
		arrayActive: [false, false, false, true, true, false, false],
		urls: {
			list: {
				type: '',
				path: '',
			},
			payment: '',
			edit: '/Currency-edit',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'currencyPagination.data',
			totalPath: 'currencyPagination.total',
		},
		searchComponent: {
			dataPath: 'currencyPagination.data',
			totalPath: 'currencyPagination.total',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateBank),
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
				title: 'Eliminar Banco',
				msg: '¿Estas seguro que desea eliminar este Banco?',
			},
		},
	};

	const actions = {
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		delete: actionDelete,
		queryDelete: deleteCurrencyMutation,
	};

	return (
		<div>
			<Title title='Monedas' />
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

Currency.propTypes = {
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	objectStateBank: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	deleteCurrencyMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateBank: state.ReducerCurrency,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: modalType => dispatch(openModal(modalType)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDelete: (componentState, paginationPage, deleteCurrencyMutation) =>
		dispatch(deleteCurrency(componentState, paginationPage, deleteCurrencyMutation)),
});

export default compose(
	graphql(DELETE_CURRENCY, { name: 'deleteCurrencyMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Currency);
