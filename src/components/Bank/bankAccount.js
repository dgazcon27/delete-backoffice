import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	deleteBankAccount,
	openModal,
	closeModal,
} from '../../actions/BankAccount/actionsCreators';

import {
	GET_BANK_ACCOUNTS,
	DELETE_BANK_ACCOUNT,
} from '../../queries/bank';

const BankAccountNew = ({
	objectStateBankAccount,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionDelete,
	deleteBankAccountMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_BANK_ACCOUNTS,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'agregar nuevo',
		url: '/bank-account-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Propietario',
			jsonPath: 'owner.lastName',
		},
		{
			id: 2,
			columName: 'Numero de cuenta',
			jsonPath: 'accountNumber',
		},
		{
			id: 3,
			columName: 'Moneda',
			jsonPath: 'currency',
		}],
		arrayActive: [true, true, false, false],
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'bankAccounts.data',
			totalPath: 'bankAccounts.total',
		},
		searchComponent: {
			dataPath: 'search.bankAccounts.data',
			totalPath: 'search.bankAccounts.total',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateBankAccount),
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
				title: 'Eliminar cuenta de banco',
				msg: '¿Estas seguro que desea eliminar esta cuenta de banco?',
			},
		},
	};

	const actions = {
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		delete: actionDelete,
		queryDelete: deleteBankAccountMutation,
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

BankAccountNew.propTypes = {
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	objectStateBankAccount: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	deleteBankAccountMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateBankAccount: state.ReducerBankAccount,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDelete: (componentState, paginationPage, deleteBankAccountMutation) =>
		dispatch(deleteBankAccount(componentState, paginationPage, deleteBankAccountMutation)),
});

export default compose(
	graphql(DELETE_BANK_ACCOUNT, { name: 'deleteBankAccountMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(BankAccountNew);
