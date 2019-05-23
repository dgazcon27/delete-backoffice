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

import { ExportModal2 } from '../ExportModal/ExportModal';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import CsvDownloader from 'react-csv-downloader';
import { preSCV , ExportModal} from '../commonComponent';

import styles from '../Shared/sharedStyles';
import {
	openModal,
	closeModal,
	changePage,
	deletePurchaseReq,
	refundPurchaseReq,
} from '../../actions/PurchaseRequest/actionsCreators';
import { openTicketModal, setAlert } from '../../actions/Ticket/actionsCreators';
import {
	GET_PURCHASE_REQ,
	SEARCH_PURCHASE_REQUEST,
	DELETE_PURCHASE_REQ,
	REFUND_PURCHASE_REQ,
	GET_ALL_PURCHASE_REQ,
} from '../../queries/purchaseRequest';
import NewUsersCreate from '../Users/newUsersCreate';
import Loading from '../Loading/loading';
import ModalsAssignTicket from '../Ticket/ModalAssignTicket';
import NotificationAlert from '../widget/NotificationAlert';
import PurchaseRequestPay from './PurchaseRequestPay';




const AllPR = () => (
	<Query query = {GET_ALL_PURCHASE_REQ}>
	{({ loading, error, data }) => {
		return(<div></div>)
	}}
	</Query>
);

const PurchaseRequestNew = ({
	classes,
	actionOpenModal,
	paginationPage,
	actionChangePage,
	actionCloseModal,
	deleteMutation,
	refundMutation,
	actionDeletePurchase,
	actionRefundPurchase,
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
		{ query: GET_PURCHASE_REQ, variables: { paginationPage } };
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
				const response = query.length > 0 ? data.search.purchases.data : data.purchaseRequests.data;
				const total = query.length > 0 ? data.search.purchases.total : data.purchaseRequests.total;
				let datas = [];
				datas = preSCV(response);
				return (
					<div>
						<Button variant='extendedFab' aria-label='Import' className={classes.importButton}  >
							<ExportModal pass = { GET_ALL_PURCHASE_REQ } />
						</Button>

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
												<TableCell className={classes.center}>Cliente</TableCell>
												<TableCell className={classes.center}>DNI</TableCell>
												<TableCell className={classes.center}>Acceso</TableCell>
												<TableCell className={classes.center}>Pendiente por pagar</TableCell>
												<TableCell className={classes.center}>Evento</TableCell>
												<TableCell className={classes.center}>Opciones</TableCell>
							</TableRow>
										</TableHead>
										<TableBody>
											{
												response.map(item => (
													<TableRow key={item.id}>
														<TableCell className={classes.center}>
															{ item.user.fullName }
														</TableCell>
														<TableCell className={classes.center}>
															{ item.user.dni }
														</TableCell>
														<TableCell className={classes.center}>
															{ item.access.name }
														</TableCell>
														<TableCell className={classes.center}>
															{ item.pendingPayment }
														</TableCell>
														<TableCell className={classes.center}>
															{ item.event.name }
														</TableCell>
														<TableCell className={classes.center}>

															{(returnView && item.totalPaid > 0) &&
															<IconButton onClick={() => { actionOpenModal('refund', item); }}>
																<Backspace />
				          									</IconButton>
															}
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
							actionDeletePurchase(id, deleteMutation);
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
				{ modalType === 'refund' &&
			<Paper className={classNames(classes.paperOnModal)}>
					<h6>
											Reembolso
					</h6>
					<p>
											¿Estas seguro que desea reembolsar esta compra?
					</p>
					<span>
						<IconButton onClick={() => {
							actionRefundPurchase(id, refundMutation);
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
				{modalType === 'pagos' &&
								<PurchaseRequestPay />
								}
				{modalType === 'export' &&
				<Paper className={classNames(classes.paperOnModal)} >
					<span>
						<h6>
						Exportar Archivo
						</h6>
						<div>
						Desea exportar archivo en formato CSV (debe utilizar Excel para leer dicho archivo)
						</div>
											&nbsp;

						<IconButton>
							<ExportModal pass = { GET_ALL_PURCHASE_REQ } />
						</IconButton>
						<IconButton onClick={actionCloseModal}>
							No
						</IconButton>
											&nbsp;
											&nbsp;
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

PurchaseRequestNew.propTypes = {
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
	actionDeletePurchase: PropTypes.func.isRequired,
	actionRefundPurchase: PropTypes.func.isRequired,
	refundMutation: PropTypes.func.isRequired,
	deleteMutation: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

PurchaseRequestNew.defaultProps = {
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
	actionDeletePurchase: (id, mutation) =>
		dispatch(deletePurchaseReq(id, mutation)),
	actionRefundPurchase: (id, mutation) =>
		dispatch(refundPurchaseReq(id, mutation)),
	actionCloseModal: () =>	dispatch(closeModal()),
	actionOpenModal: (type, item) => dispatch(openModal(type, item)),
	actionOpenTicketModal: (type, item) => dispatch(openTicketModal(type, item)),
	actionSetAlert: () => dispatch(setAlert(false)),
});

export { PurchaseRequestNew as PurchaseRequestNewTest };

export default compose(
	graphql(REFUND_PURCHASE_REQ, { name: 'refundMutation' }),
	graphql(DELETE_PURCHASE_REQ, { name: 'deleteMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(PurchaseRequestNew);
