import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import GET_PRESALE from '../../queries/presale';
import Title from '../Shared/title';
import { SEARCH_PRESALE } from '../../queries/purchaseRequest';

const Presale = ({
	objectStateTicket,
	paginationPage,
}) => {
	const objectQuery = {
		queryComponent: GET_PRESALE,
		querySearch: SEARCH_PRESALE,
	};

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'agregar nuevo',
		url: '/presale-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Cliente',
			jsonPath: 'user.fullName',
		},
		{
			id: 2,
			columName: 'Documento de Identidad',
			jsonPath: 'user.dni',
		},
		{
			id: 3,
			columName: 'Acceso',
			jsonPath: 'access.name',
		},
		{
			id: 4,
			columName: 'Pendiente por pagar',
			jsonPath: 'pendingPayment',
		},
		{
			id: 5,
			columName: 'Evento',
			jsonPath: 'event.name',
		}],
		arrayActive: [false, true, false, false, false, false, false],
		urls: {
			list: {
				type: '',
				path: '',
			},
			payment: '/Pay',
			edit: '',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'presaleTypeSalesPagination.data',
			totalPath: 'presaleTypeSalesPagination.total',
		},
		searchComponent: {
			dataPath: 'searchAccessByEventStatusPresale.data',
			totalPath: 'searchAccessByEventStatusPresale.total',
		},
	};

	const objectModal = {
		componentState: objectStateTicket,
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
	};
	if (window.localStorage.getItem('actualRole') !== 'ADM') {
		if (window.localStorage.getItem('actualRole') !== 'ADMINISTRACION') {
			if (window.localStorage.getItem('actualRole') !== 'PRESALE') {
				window.location.assign('/');
			}
		}
	}

	return (
		<div>
			<Title title='Preventa' />
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

Presale.propTypes = {
	objectStateTicket: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateTicket: state.ReducerPurchaseRequest,
});

export default connect(mapStateToProps, null)(Presale);
