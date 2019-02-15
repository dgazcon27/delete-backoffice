import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
	compose,
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
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Payment from '@material-ui/icons/Payment';
import Visibility from '@material-ui/icons/Visibility';
import Delete from '@material-ui/icons/Delete';
import Group from '@material-ui/icons/Group';
import List from '@material-ui/icons/List';
import Title from '../Shared/title';

import styles from '../Shared/sharedStyles';
import {
	changePage,
	openModal,
	closeModal,
} from '../../actions/PurchaseRequest/actionsCreators';
import { openTicketModal, setAlert } from '../../actions/Ticket/actionsCreators';
import { SEARCH_PURCHASE_REQUEST } from '../../queries/purchaseRequest';
import { GET_BANK_ACCOUNTS_STATE } from '../../queries/bank';


import NewUsersCreate from '../Users/newUsersCreate';
import Loading from '../Loading/loading';
import ModalsAssignTicket from '../Ticket/ModalAssignTicket';
import NotificationAlert from '../widget/NotificationAlert';

const BankAccountState = ({
	actionOpenTicketModal,
	actionChangePage,
	actionCloseModal,
	actionOpenModal,
	modalTypeTicket,
	paginationPage,
	actionSetAlert,
	isOpenTicket,
	currentPage,
	modalType,
	isLoading,
	existUser,
	viewlist,
	isAlert,
	noModal,
	classes,
	isOpen,
	query,
	id,
}) => {
	const params = query.length > 0 ?
		{ query: SEARCH_PURCHASE_REQUEST, variables: { query, currentPageSearch: 0 } } :
		{ query: GET_BANK_ACCOUNTS_STATE, variables: { bankAccount_id: id, paginationPage: 0 } };
	return (
		<Query {...params}>
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
				const response = query.length > 0 ?
					data.search.purchases.data : data.bankAccountMovement.data;
				const total = query.length > 0 ?
					data.search.purchases.total : data.bankAccountMovement.total;
				const alfa = response[0];

				return (
					<div>
						{ viewlist &&
							<div>
								{ isLoading &&
									<Loading />
								}
								{ !isLoading &&
									<div>
										<Title title='Balance de cuenta' />
										{
											total &&
											<div>
												<div>
													{alfa.bankAccount.owner.fullName} -
													{alfa.bankAccount.accountNumber} -
													{alfa.bankAccount.bank.name}
												</div>
												<div>
													{alfa.bankAccount.currency} :
													{alfa.bankAccount.currentBalance}
												</div>
											</div>
										}
										<Paper>
											<Table>
												<TableHead>
													<TableRow>
														<TableCell className={classes.center}>Moneda</TableCell>
														<TableCell className={classes.center}>Monto</TableCell>
														<TableCell className={classes.center}>Tipo de movimiento</TableCell>
														<TableCell className={classes.center}>Referencia</TableCell>
														<TableCell className={classes.center}>Opciones</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{
														response.map(item => (
															<TableRow key={item.id}>
																<TableCell className={classes.center}>
																	{ item.bankAccount.currency }
																</TableCell>
																<TableCell className={classes.center}>
																	{ item.amount }
																</TableCell>
																<TableCell className={classes.center}>
																	{ item.movementsType }
																</TableCell>
																<TableCell className={classes.center}>
																	{ item.reference }
																</TableCell>
																<TableCell className={classes.center}>
																	<Link to={{ pathname: `/purchase-request-edit/${item.id}` }}>
																		<IconButton>
																			<Visibility />
																		</IconButton>
																	</Link>
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
																	{item.pendingPayment > 0 &&
																		<Tooltip
																			enterDelay={200}
																			id='tooltip-controlled'
																			leaveDelay={100}
																			placement='top'
																			title='Realizar pago'
																		>
																			<Link to={`/Pay/${item.id}`} href={`/Pay/${item.id}`}>
																				<IconButton>
																					<Payment />
																				</IconButton>

																			</Link>
																		</Tooltip>
																	}
																	{ item.pendingPayment > 0 && item.totalPaid > 0 &&
																		<Tooltip
																			enterDelay={200}
																			id='tooltip-controlled'
																			leaveDelay={100}
																			placement='top'
																			title='Listar'
																		>
																			<IconButton onClick={() => actionOpenModal('pagos', item)}>
																				<List />
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
											Eliminar Compra
										</h6>
										<p>
											¿Estas seguro que desea eliminar esta compra?
										</p>
										<span>
											<IconButton onClick={() => {
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

BankAccountState.propTypes = {
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
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

BankAccountState.defaultProps = {
	query: '',
};


const mapStateToProps = state => ({
	paginationPage: state.ReducerPurchaseRequest.paginationPage,
	currentPage: state.ReducerPurchaseRequest.currentPage,
	id: state.ReducerBankAccount.id,
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
	actionCloseModal: () =>	dispatch(closeModal()),
	actionOpenModal: (type, item) => dispatch(openModal(type, item)),
	actionOpenTicketModal: (type, item) => dispatch(openTicketModal(type, item)),
	actionSetAlert: () => dispatch(setAlert(false)),
});

export { BankAccountState as PurchaseRequestNewTest };

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(BankAccountState);
