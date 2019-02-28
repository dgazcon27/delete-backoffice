import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import GET_TABLE from '../../queries/table';
import Title from '../Shared/title';
import { openModal } from '../../actions/Room/actionsCreators';
import { SEARCH_TABLES } from '../../queries/purchaseRequest';

const Ticket = ({
	objectStateTicket,
	paginationPage,
	actionOpenModal,
}) => {
	const objectQuery = {
		queryComponent: GET_TABLE,
		querySearch: SEARCH_TABLES,
	};

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'agregar nuevo',
		url: '/table-create',
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
			dataPath: 'salesTypeTablesPagination.data',
			totalPath: 'salesTypeTablesPagination.total',
		},
		searchComponent: {
			dataPath: 'searchAccessByEventStatusTable.data',
			totalPath: 'searchAccessByEventStatusTable.total',
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
		openModal: actionOpenModal,
	};
	if (window.localStorage.getItem('actualRole') !== 'ADM') {
		if (window.localStorage.getItem('actualRole') !== 'ADMINISTRACION') {
			if (window.localStorage.getItem('actualRole') !== 'TABLE') {
				window.location.assign('/');
			}
		}
	}
	return (
		<div>
			<Title title='Mesas' />
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
	actionOpenModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateTicket: state.ReducerPurchaseRequest,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
});


export default compose(connect(mapStateToProps, mapDispatchToProps))(Ticket);
