import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ContainerList from '../List/containerList';
import Search from '../Search/search';
import {
	openModal,
	closeModal,
	deleteReservation,
} from '../../actions/Reservation/actionsCreators';
import Title from '../Shared/title';

import {
	GET_RESERVATIONS,
	DELETE_RESERVATION,
} from '../../queries/reservation';

const Reservation = ({
	objectStateReservation,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionDelete,
	deleteReservationMutation,
}) => {
	const objectQuery = {
		queryComponent: GET_RESERVATIONS,
	};

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'agregar nuevo',
		url: '/reservation-create',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Cliente',
			jsonPath: 'client.name',
		},
		{
			id: 2,
			columName: 'Pendiente por pagar',
			jsonPath: 'pendingPayment',
		},
		{
			id: 3,
			columName: 'Habitación',
			jsonPath: 'room.name',
		},
		{
			id: 4,
			columName: 'Días',
			jsonPath: 'days',
		},
		{
			id: 5,
			columName: 'Cantidad',
			jsonPath: 'quantity',
		}],
		arrayActive: [false, true, true, false, true, false, false],
		urls: {
			list: {
				type: '',
				path: '',
			},
			payment: 'reservation-payment',
			edit: '/reservation-edit',
		},
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'reservations.data',
			totalPath: 'reservations.total',
		},
		searchComponent: {
			dataPath: '',
			totalPath: '',
		},
	};

	const objectModal = {
		componentState: Object.assign({}, objectStateReservation),
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
				title: 'Eliminar Reservación',
				msg: '¿Estas seguro que desea eliminar esta reservación?',
			},
		},
	};

	const actions = {
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
		delete: actionDelete,
		queryDelete: deleteReservationMutation,
	};

	return (
		<div>
			<Title title='Reservaciones' />
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

Reservation.propTypes = {
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionDelete: PropTypes.func.isRequired,
	objectStateReservation: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	deleteReservationMutation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	objectStateReservation: state.ReducerReservation,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, data) => dispatch(openModal(modalType, data)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDelete: (componentState, paginationPage, deleteReservationMutation) =>
		dispatch(deleteReservation(componentState, paginationPage, deleteReservationMutation)),
});

export default compose(
	graphql(DELETE_RESERVATION, { name: 'deleteReservationMutation' }),
	connect(mapStateToProps, mapDispatchToProps),
)(Reservation);
