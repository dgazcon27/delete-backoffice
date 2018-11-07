import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	blockHotel,
	deleteHotel,
} from '../../actions/Hotel/actionsCreators';

import {
	GET_HOTELS,
	BLOCK_HOTEL,
	DELETE_HOTEL,
} from '../../queries/hotels';

const Hotel2 = ({
	objectStateHotel,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionBlock,
	actionDelete,
	blockHotelMutation,
	deleteHotelMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_HOTELS,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'agregar nuevo',
		url: '/hotel-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Proveedor',
			jsonPath: 'provider.name',
		},
		{
			id: 2,
			columName: 'Evento',
			jsonPath: 'event.name',
		}],
		arrayActive: [false, true, true, true, false],
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'hotelss.data',
			totalPath: 'hotelss.total',
		},
		searchComponent: {
			dataPath: '',
			totalPath: '',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateHotel),
		paginationPage,
		messages: {
			edit: {
				title: 'contenido edit modal',
			},
			block: {
				titleStatus1: 'Bloquear Hotel',
				msgStatus1: '¿Estas seguro que desea bloquear el Hotel?',
				titleStatus2: 'Desbloquear Hotel',
				msgStatus2: '¿Estas seguro que desea desbloquear el Hotel?',
			},
			delete: {
				title: 'Eliminar Compra',
				msg: '¿Estas seguro que desea eliminar esta compra?',
			},
		},
	};

	const actions = {
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		block: actionBlock,
		queryblock: blockHotelMutation,
		delete: actionDelete,
		queryDelete: deleteHotelMutation,
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

Hotel2.propTypes = {
	actionOpenModal: PropTypes.func.isRequired,
	actionBlock: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	objectStateHotel: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	blockHotelMutation: PropTypes.func.isRequired,
	deleteHotelMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateHotel: state.ReducerHotel,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionBlock: (componentState, deleteHotelMutation) =>
		dispatch(blockHotel(componentState, deleteHotelMutation)),
	actionDelete: (componentState, paginationPage, blockHotelMutation) =>
		dispatch(deleteHotel(componentState, paginationPage, blockHotelMutation)),
});

export default compose(
	graphql(DELETE_HOTEL, { name: 'deleteHotelMutation' }),
	graphql(BLOCK_HOTEL, { name: 'blockHotelMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Hotel2);
