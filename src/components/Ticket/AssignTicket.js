import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import ContainerList from '../List/containerList';
import Title from '../Shared/title';
import Loading from '../Loading/loading';
import NotificationAlert from '../widget/NotificationAlert';
import NewUsersCreate from '../Users/newUsersCreate';
import Search from '../Search/search';
import { GET_TOKENS } from '../../queries/tokens';
import {
	openTicketModal,
	closeTicketModal,
	setAlert,
} from '../../actions/Ticket/actionsCreators';

const AssignTicket = ({
	paginationPage,
	objectStateAssign,
	actionOpenModal,
	actionCloseModal,
	isLoading,
	isAlert,
	actionSetAlert,
	viewlist,
	existUser,
	noModal,
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
			columName: 'Localizador',
			jsonPath: 'localize',
		}],
		arrayActive: [false, false, false, false, false, false, false, true],
		urls: {},
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

	const actions = {
		openModal: actionOpenModal,
		closeModal: actionCloseModal,
	};

	return (
		<div>
			{ viewlist &&
				<div>
					{ isLoading &&
						<Loading />
					}
					{ !isLoading &&
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
					}
					<NotificationAlert
						message='El ticket ha sido acreditado exitosamente'
						open={isAlert}
						close={actionSetAlert}
					/>
				</div>
			}
			{ !existUser && !noModal &&
				<NewUsersCreate
					propClass='true'
					noReload='true'
				/>
			}
		</div>
	);
};

AssignTicket.propTypes = {
	objectStateAssign: PropTypes.object.isRequired,
	paginationPage: PropTypes.number.isRequired,
	isAlert: PropTypes.bool.isRequired,
	viewlist: PropTypes.bool.isRequired,
	existUser: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	noModal: PropTypes.bool.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionSetAlert: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	paginationPage: state.ReducerPagination.paginationPage,
	isLoading: state.ReducerTicket.isLoading,
	isAlert: state.ReducerTicket.isAlert,
	noModal: state.ReducerTicket.noModal,
	existUser: state.ReducerTicket.isAlert,
	viewlist: state.ReducerTicket.viewlist,
	objectStateAssign: state.ReducerTicket,
});
const mapDispatchToProps = dispatch => ({
	actionOpenModal: (type, data) => dispatch(openTicketModal('assign_ticket', data)),
	actionCloseModal: () => dispatch(closeTicketModal('assign_ticket')),
	actionSetAlert: () => dispatch(setAlert(false)),
});
export default compose(connect(mapStateToProps, mapDispatchToProps))(AssignTicket);
