/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Backspace from '@material-ui/icons/Backspace';
import Payment from '@material-ui/icons/Payment';
import Visibility from '@material-ui/icons/Visibility';
import Delete from '@material-ui/icons/Delete';
import Group from '@material-ui/icons/Group';
import List from '@material-ui/icons/List';
import Edit from '@material-ui/icons/Edit';
import {	
	compose,
	graphql,
	Query,
} from 'react-apollo';
import PropTypes from 'prop-types';
import {
	Modal,
	Paper,
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	TableFooter,
	TablePagination,
	IconButton,
	Tooltip,
} from '@material-ui/core';
import Title from '../Shared/title';

import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from '../Shared/sharedStyles';
import {
	openModal,
	closeModal,
	changePage,
} from '../../actions/PurchaseRequest/actionsCreators';
import {
	deleteEvent,
} from '../../actions/Event/actionsCreators';
import { openTicketModal, setAlert } from '../../actions/Ticket/actionsCreators';
import {
	GET_PURCHASE_REQ,
	SEARCH_PURCHASE_REQUEST,
	DELETE_PURCHASE_REQ,
	REFUND_PURCHASE_REQ,
	GET_ALL_PURCHASE_REQ,
} from '../../queries/purchaseRequest';
import {
	GET_EVENTS,
	DELETE_EVENT,
} from '../../queries/event';

import NewUsersCreate from '../Users/newUsersCreate';
import Loading from '../Loading/loading';
import ModalsAssignTicket from '../Ticket/ModalAssignTicket';
import NotificationAlert from '../widget/NotificationAlert';
import Search from '../Search/search';

	const objectSearch = {
		showButton: true,
		showSearch: false,
		titleButton: 'agregar nuevo',
		url: '/events-create',
	};

const Event = ({
	deleteMutation,
	deleteEvent,
	deleteEventMutation,
	actionDeleteEvent,
	classes,
	actionOpenModal,
	paginationPage,
	actionChangePage,
	actionDelete,
	actionCloseModal,
	actionSetAlert,
	actionOpenTicketModal,
	currentPage,
	modalType,
	modalTypeTicket,
	isOpen,
	isOpenTicket,
	id,
	isLoading,
	isAlert,
	viewlist,
	noModal,
	existUser,
	query,
}) => {

	let returnView = false;
	const params = query.length > 0 ?
		{ query: SEARCH_PURCHASE_REQUEST, variables: { query, currentPageSearch: 0 } } :
		{ query: GET_EVENTS, variables: { paginationPage } };
	if (window.localStorage.getItem('actualRole') === 'ADM') {
		returnView = true;
	} else if (window.localStorage.getItem('actualRole') === 'ADMINISTRACION') {
		returnView = true;
	}
	return (
		<Query {...params} >
			{({ loading, error, data }) => {
				if (loading) {
					return (
						<div>
							<Loading />
						</div>
					);
				}
				if (error) {
					return (
						<div> Error :( </div>
					);
				}
				const response = query.length > 0 ? data.search.events.data : data.events.data;
				const total = query.length > 0 ? data.search.events.total : data.events.total;
				return (
					<div>
					<Title title='Eventos' />
							<Search
								showButton={objectSearch.showButton}
								showSearch={objectSearch.showSearch}
								titleButton={objectSearch.titleButton}
								url={objectSearch.url}
							/>
						{ viewlist &&
						<div>
							{ isLoading &&
							<Loading />
							}
							{ !isLoading &&
							<div>
								<Paper>
									<Table>
										<TableHead>
							<TableRow>
												<TableCell className={classes.center}>Nombre</TableCell>
												<TableCell className={classes.center}>Ubicación</TableCell>
												<TableCell className={classes.center}>Opciones</TableCell>
							</TableRow>
										</TableHead>
										<TableBody>
											{
												response.map(item => (
													<TableRow key={item.id}>
														<TableCell className={classes.center}>
															{ item.name }
														</TableCell>
														<TableCell className={classes.center}>
															{ item.state.country.name }
														</TableCell>
														
														<TableCell className={classes.center}>
															<Link to={{ pathname: `/event-budget/${item.id}` }}>
																<IconButton>
																CO
																</IconButton>
															</Link>
															<Link to={{ pathname: `/event-edit/${item.id}` }}>
																<IconButton>
																	<Edit />
																</IconButton>
															</Link>
															<Link to={{ pathname: `/event-access/${item.id}` }}>
																<IconButton>
																	<List />
																</IconButton>
															</Link>
															{(returnView && item.totalPaid > 0) &&
															<IconButton onClick={() => { actionOpenModal('refund', item); }}>
																<Backspace />
				          									</IconButton>
															}
															<Tooltip
																enterDelay={200}
																id='tooltip-controlled'
																leaveDelay={100}
																placement='top'
																title='Eliminar purchaseReq'
															>	
																<IconButton onClick={() => { actionOpenModal('delete', item); }}>
																	<Delete />
																</IconButton>
															</Tooltip>

															{item.totalPaid <= 0 &&
																			<Tooltip
																enterDelay={200}
																id='tooltip-controlled'
																leaveDelay={100}
																placement='top'
																title='Asignar acreditacion'
															>
																<IconButton onClick={() => actionOpenTicketModal('assign_ticket', item)}>
																	<Group />
																</IconButton>
															</Tooltip>
															}
																										
														</TableCell>

													</TableRow>
												))
											}
										</TableBody>
										<TableFooter>
											<TableRow>
												<TablePagination
													count={total}
													rowsPerPage={10}
													page={paginationPage}
													rowsPerPageOptions={[10]}
													colSpan={6}
													onChangePage={(ev, changuedPage) => {
														actionChangePage(currentPage, changuedPage);
													}}

												/>
											</TableRow>
										</TableFooter>
									</Table>
								</Paper>
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
		<Modal
							open={isOpen}
							className={classNames(classes.modalOpenStyle)}
							onBackdropClick={() => actionCloseModal()}
							disableAutoFocus={false}
						>
							<div>
				{ modalType === 'delete' &&
					<Paper className={classNames(classes.paperOnModal)}>
									<h6>
															Eliminar Evento
									</h6>
									<p>
															¿Estas seguro que desea eliminar este evento?
									</p>
									<span>
										<IconButton onClick={() => {
											actionDeleteEvent(id, deleteMutation);	
										}}
										>
																Si
										</IconButton>
															&nbsp;
															&nbsp;
										<IconButton onClick={actionCloseModal}>
																No
										</IconButton>
									</span>
				    </Paper>
								}

   </div>
   </Modal>
	<Modal
							open={isOpenTicket}
							className={classNames(classes.modalOpenStyle)}
							onBackdropClick={() => actionCloseModal()}
							disableAutoFocus={false}
						>
							<div>
				{ modalTypeTicket === 'assign_ticket' &&
								<ModalsAssignTicket id={id} />
								}
   		</div>
	</Modal>


	</div>
				);
			}}
		</Query>
	);
};

Event.propTypes = {
	query: PropTypes.string,
	paginationPage: PropTypes.number.isRequired,
	viewlist: PropTypes.bool.isRequired,
	existUser: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	noModal: PropTypes.bool.isRequired,
	isAlert: PropTypes.bool.isRequired,
	isOpen: PropTypes.bool.isRequired,
	isOpenTicket: PropTypes.bool.isRequired,
	id: PropTypes.number.isRequired,
	modalTypeTicket: PropTypes.string.isRequired,
	modalType: PropTypes.string.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionOpenTicketModal: PropTypes.func.isRequired,
	actionSetAlert: PropTypes.func.isRequired,
	actionDeleteEvent: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

Event.defaultProps = {
	query: '',
};


const mapStateToProps = state => ({
	paginationPage: state.ReducerPurchaseRequest.paginationPage,
	currentPage: state.ReducerPurchaseRequest.currentPage,
	id: state.ReducerPurchaseRequest.id,
	modalType: state.ReducerPurchaseRequest.modalType,
	modalTypeTicket: state.ReducerTicket.modalType,
	isOpenTicket: state.ReducerTicket.isOpen,
	isOpen: state.ReducerPurchaseRequest.isOpen,
	viewlist: state.ReducerTicket.viewlist,
	isLoading: state.ReducerTicket.isLoading,
	isAlert: state.ReducerTicket.isAlert,
	noModal: state.ReducerTicket.noModal,
	existUser: state.ReducerTicket.isAlert,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionDeleteEvent: (id, mutation) =>
		dispatch(deleteEvent(id, mutation)),
	actionDeletePurchase: (id, mutation) =>
		dispatch(deletePurchaseReq(id, mutation)),
	actionCloseModal: () =>	dispatch(closeModal()),
	actionOpenModal: (type, item) => dispatch(openModal(type, item)),
	actionOpenTicketModal: (type, item) => dispatch(openTicketModal(type, item)),
	actionSetAlert: () => dispatch(setAlert(false)),
});

export { Event as PurchaseRequestNewTest };

export default compose(
	graphql(DELETE_EVENT, { name: 'deleteMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Event);
