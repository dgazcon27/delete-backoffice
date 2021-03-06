import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import { GET_TICKET } from '../../queries/ticket';
import Title from '../Shared/title';

import { SEARCH_TICKETS } from '../../queries/purchaseRequest';

const Ticket = ({
	objectStateTicket,
	paginationPage,
}) => {
	const objectQuery = {
		queryComponent: GET_TICKET,
		querySearch: SEARCH_TICKETS,
	};

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'agregar nuevo',
		url: '/ticket-create',
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
			payment: '/pay',
			edit: '',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'boxOfficeSalesPagination.data',
			totalPath: 'boxOfficeSalesPagination.total',
		},
		searchComponent: {
			dataPath: 'searchAccessByEventStatusBoxOffice.data',
			totalPath: 'searchAccessByEventStatusBoxOffice.total',
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
			if (window.localStorage.getItem('actualRole') !== 'TICKET') {
				window.location.assign('/');
			}
		}
	}
	return (
		<div>
			<Title title='Taquilla' />
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

Ticket.propTypes = {
	objectStateTicket: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateTicket: state.ReducerPurchaseRequest,
});

export default connect(mapStateToProps, null)(Ticket);
