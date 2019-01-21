import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import GET_PRESALE from '../../queries/presale';
import Title from '../Shared/title';

const Presale = ({
	objectStateTicket,
	paginationPage,
}) => {
	const objectQuery = {
		queryComponent: GET_PRESALE,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'agregar nuevo',
		url: '/presale-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Cliente',
			jsonPath: 'user.name',
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
		arrayActive: [false, false, false, false, false, false, false],
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
			dataPath: 'presaleTypeSalesPagination.data',
			totalPath: 'presaleTypeSalesPagination.total',
		},
		searchComponent: {
			dataPath: '',
			totalPath: '',
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
	objectStateTicket: {},
});

export default connect(mapStateToProps, null)(Presale);
