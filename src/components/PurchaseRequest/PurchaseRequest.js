import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
	compose,
	graphql,
	Query,
} from 'react-apollo';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Delete from '@material-ui/icons/Delete';
import Payment from '@material-ui/icons/Payment';
import Visibility from '@material-ui/icons/Visibility';
import List from '@material-ui/icons/List';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import {
	Modal,
	Paper,
	Table,
	Tooltip,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	IconButton,
	TableFooter,
	TablePagination,
} from '@material-ui/core';

import styles from './userTypeCss';
import {
	changePage,
	openModal,
	closeModal,
	deletePurchaseReq,
	setToPay,
	changePageSearch,
} from '../../actions/PurchaseRequest/actionsCreators';

import PurchaseRequestPay from './PurchaseRequestPay';

import {
	DELETE_PURCHASE_REQ,
	GET_PURCHASE_REQ,
	SEARCH_PURCHASE_REQUEST,
} from '../../queries/purchaseRequest';

import Loading from '../Loading/loading';

const PurchaseRequest = ({
	id,
	query,
	isOpen,
	userId,
	classes,
	modalType,
	currentPage,
	actionSetToPay,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionChangePage,
	currentPageSearch,
	actionDeletePurchaseReq,
	actionChangePageSearch,
	deletePurchaseReqMutation,
}) => {
	const params = query.length > 0 ?
		{ query: SEARCH_PURCHASE_REQUEST, variables: { query, page: currentPageSearch } } :
		{ query: GET_PURCHASE_REQ, variables: { paginationPage } };

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
				const response = query.length > 0 ? data.search.purchases.data : data.purchaseRequests.data;
				const total = query.length > 0 ? data.search.purchases.total : data.purchaseRequests.total;
				return (
					<div>
						<div>
							<Paper>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell className={classes.center}>Cliente</TableCell>
											<TableCell className={classes.center}>Documento de Identidad</TableCell>
											<TableCell className={classes.center}>Acceso</TableCell>
											<TableCell className={classes.center}>Pendiente por pagar</TableCell>
											<TableCell className={classes.center}>Evento</TableCell>
											<TableCell className={classes.alignRightOption} >Opciones</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{
											response.map(purchaseReq => (
												<TableRow key={purchaseReq.id}>
													<TableCell className={classes.center}>{`${purchaseReq.user.name}  ${purchaseReq.user.lastName}`}</TableCell>
													<TableCell className={classes.center}>{purchaseReq.user.dni}</TableCell>
													<TableCell className={classes.center}>
														{purchaseReq.access.name}
													</TableCell>
													<TableCell className={classes.center}>{`${purchaseReq.pendingPayment} `}
														{
															purchaseReq.pendingPayment > 0 &&
															<ThumbDown className={classes.iconPayment} />
														}
														{
															purchaseReq.pendingPayment <= 0 &&
															<ThumbUp className={classes.iconPayment} />
														}
													</TableCell>
													<TableCell className={classes.center}>{purchaseReq.event.name}</TableCell>
													<TableCell className={classes.alignRight}>
														{
															parseFloat(purchaseReq.totalPaid) > 0 &&
															<Tooltip
																enterDelay={200}
																id='tooltip-controlled'
																leaveDelay={100}
																placement='top'
																title='Lista de Pagos'
															>
																<IconButton onClick={() => { actionOpenModal('pagos', purchaseReq); }}>
																	<List />
																</IconButton>
															</Tooltip>
														}
														<Tooltip
															enterDelay={200}
															id='tooltip-controlled'
															leaveDelay={100}
															placement='top'
															title='Realizar pago'
														>
															<Link to='/Pay' href='/Pay'>
																<IconButton
																	onClick={() => {
																		actionSetToPay(
																			purchaseReq.id,
																			userId,
																		);
																	}
																	}
																>
																	<Payment />
																</IconButton>
															</Link>
														</Tooltip>
														<Link to={{ pathname: `/purchase-request-edit/${purchaseReq.id}` }}>
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
															<IconButton onClick={() => { actionOpenModal('delete', purchaseReq); }}>
																<Delete />
															</IconButton>
														</Tooltip>
													</TableCell>
												</TableRow>
											))
										}
									</TableBody>
									<TableFooter>
										<TableRow>
											{ query.length === 0 &&
												<TablePagination
													count={data.purchaseRequests.total}
													rowsPerPage={10}
													page={paginationPage}
													rowsPerPageOptions={[10]}
													colSpan={6}
													onChangePage={(event, changuedPage) => {
														actionChangePage(currentPage, changuedPage);
													}}
												/>
											}
											{ query.length > 0 &&
												<TablePagination
													count={total}
													rowsPerPage={10}
													page={currentPageSearch}
													rowsPerPageOptions={[10]}
													colSpan={6}
													onChangePage={(event, nextPage) => {
														actionChangePageSearch(currentPageSearch, nextPage);
													}}
												/>
											}
										</TableRow>
									</TableFooter>
								</Table>
							</Paper>
						</div>
						<Modal
							open={isOpen}
							className={classNames(classes.modalOpenStyle)}
							onBackdropClick={() => actionCloseModal()}
							disableAutoFocus={false}
						>
							<div>
								{modalType === 'delete' &&
								<Paper className={classNames(classes.paperOnModal)}>
									<h6>
										Eliminar Compra
									</h6>
									<p>
										¿Estas seguro que desea eliminar esta compra?
									</p>
									<span>
										<IconButton onClick={() => {
											actionDeletePurchaseReq(id, paginationPage, deletePurchaseReqMutation);
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
									<Paper className={classNames(classes.paperOnModal)}>
										<PurchaseRequestPay />
									</Paper>
								}
							</div>
						</Modal>
					</div>
				);
			}}
		</Query>
	);
};

PurchaseRequest.propTypes = {
	isOpen: PropTypes.bool,
	modalType: PropTypes.string,
	id: PropTypes.number.isRequired,
	userId: PropTypes.number.isRequired,
	query: PropTypes.string,
	classes: PropTypes.object.isRequired,
	actionSetToPay: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	deletePurchaseReqMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	paginationPageSearch: PropTypes.number.isRequired,
	currentPageSearch: PropTypes.number.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	actionChangePageSearch: PropTypes.func.isRequired,
	actionDeletePurchaseReq: PropTypes.func.isRequired,
};

PurchaseRequest.defaultProps = {
	isOpen: false,
	modalType: '',
	query: '',
};

const mapStateToProps = (state, ownProps) => ({
	currency: state.ReducerPurchaseRequest.currency,
	id: state.ReducerPurchaseRequest.id,
	isOpen: state.ReducerPurchaseRequest.isOpen,
	modalType: state.ReducerPurchaseRequest.modalType,
	currentPage: state.ReducerPurchaseRequest.currentPagePreq,
	paginationPage: state.ReducerPurchaseRequest.paginationPagePreq,
	initialValues: state.ReducerPurchaseRequest,
	paginationPageSearch: state.ReducerPurchaseRequest.paginationPageSearch,
	currentPageSearch: state.ReducerPurchaseRequest.currentPageSearch,
	userId: state.ReducerLogin.userId,
	query: ownProps.query,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionOpenModal: (modalType, bank) => dispatch(openModal(modalType, bank)),
	actionCloseModal: () => dispatch(closeModal()),
	actionChangePageSearch: (currentPage, paginationPageSearch) =>
		dispatch(changePageSearch(currentPage, paginationPageSearch)),
	actionDeletePurchaseReq: (id, paginationPage, deletePurchaseReqMutation) =>
		dispatch(deletePurchaseReq(id, paginationPage, deletePurchaseReqMutation)),
	actionSetToPay: (
		id,
		userId,
	) => dispatch(setToPay(
		id,
		userId,
	)),
});

export { PurchaseRequest as PurchaseRequestTest };

export default compose(
	graphql(DELETE_PURCHASE_REQ, { name: 'deletePurchaseReqMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(PurchaseRequest);
