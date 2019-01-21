import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import ContainerList from '../List/containerList';
import Title from '../Shared/title';

import { GET_TOKENS } from '../../queries/tokens';

const AssignTicket = ({
	paginationPage,
	objectStateAssign,
}) => {
	const objectQuery = {
		queryComponent: GET_TOKENS,
	};

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'agregar nuevo',
		url: '/purchase-request-create',
	};
	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Cliente',
			jsonPath: 'purchaser.name',
		},
		{
			id: 2,
			columName: 'Apellido',
			jsonPath: 'purchaser.lastName',
		},
		{
			id: 3,
			columName: 'DNI',
			jsonPath: 'purchaser.dni',
		},
		{
			id: 4,
			columName: 'Acceso',
			jsonPath: 'access.name',
		},
		{
			id: 5,
			columName: 'Evento',
			jsonPath: 'event.name',
		}],
		arrayActive: [false, false, true, false, false, false, false],
		urls: {
			visibility: '/purchase-request-edit',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'paidSalesList.data',
			totalPath: 'paidSalesList.total',
		},
		searchComponent: {
			dataPath: 'search.purchases.data',
			totalPath: 'search.purchases.total',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateAssign),
		paginationPage,
		messages: {},
	};

	const actions = {};

	return (
		<div>
			<Title title='Asignar tickets' />
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

AssignTicket.propTypes = {
	objectStateAssign: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateAssign: state.ReducerPurchaseRequest,
});
const mapDispatchToProps = () => ({
});
export default compose(connect(mapStateToProps, mapDispatchToProps))(AssignTicket);
