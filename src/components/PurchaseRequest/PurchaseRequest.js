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
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Payment from '@material-ui/icons/Payment';
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
} from '../../actions/PurchaseRequest/actionsCreators';

import {
	DELETE_PURCHASE_REQ,
	GET_PURCHASE_REQ,
} from '../../queries/purchaseRequest';

import Loading from '../Loading/loading';

const PurchaseRequest = ({
	id,
	name,
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
	actionDeletePurchaseReq,
	deletePurchaseReqMutation,
}) => (
	<Query query={GET_PURCHASE_REQ} variables={{ paginationPage }}>
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
			return (
				<div>
					<div>
						<h5 className={classes.title}>
						Taquilla
						</h5>
						<h5 className={classes.searchAlignRigth}>
							<Link to='/purchase-request-create' href='/purchase-request-create' >
								<Button variant='extendedFab' aria-label='Delete' className={classes.addNew}>
									<Add className={classes.marginIcon} />
									Agregar Nuevo
								</Button>
							</Link>
						</h5>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Cliente</TableCell>
										<TableCell>Documento de Identidad</TableCell>
										<TableCell>Acceso</TableCell>
										<TableCell>Pendiente por pagar</TableCell>
										<TableCell>Evento</TableCell>
										<TableCell className={classes.alignRightOption} >Opciones</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										data.purchaseRequests.data.map(purchaseReq => (
											<TableRow key={purchaseReq.id}>
												<TableCell >{`${purchaseReq.user.name}  ${purchaseReq.user.lastName}`}</TableCell>
												<TableCell >{purchaseReq.user.dni}</TableCell>
												<TableCell >{purchaseReq.access.name}</TableCell>
												<TableCell >{purchaseReq.pendingPayment}</TableCell>
												<TableCell >{purchaseReq.event.name}</TableCell>
												<TableCell className={classes.alignRight}>
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
													<Link to={{ pathname: `/purchase-request-edit/${purchaseReq.id}`, state: { type: 'Purchase' } }}>
														<IconButton>
															<Edit />
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
										<TablePagination
											count={data.purchaseRequests.total}
											rowsPerPage={10}
											page={paginationPage}
											rowsPerPageOptions={[10]}
											colSpan={3}
											onChangePage={(event, changuedPage) => {
												actionChangePage(currentPage, changuedPage);
											}}
										/>
									</TableRow>
								</TableFooter>
							</Table>
						</Paper>
					</div>
					<Modal
						open={isOpen}
						className={classNames(classes.modalOpenStyle)}
						hideBackdrop
						disableAutoFocus={false}
					>
						<div>
							{modalType === 'delete' &&
								<Paper className={classNames(classes.paperOnModal)}>
									<h6>
										Eliminar bank
									</h6>
									<p>
										¿Estas seguro que desea eliminar el bank {name} ?
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
						</div>
					</Modal>
				</div>
			);
		}}
	</Query>
);

PurchaseRequest.propTypes = {
	isOpen: PropTypes.bool,
	name: PropTypes.string,
	modalType: PropTypes.string,
	id: PropTypes.number.isRequired,
	userId: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	actionSetToPay: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	deletePurchaseReqMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	actionDeletePurchaseReq: PropTypes.func.isRequired,
};

PurchaseRequest.defaultProps = {
	name: '',
	isOpen: false,
	modalType: '',
};

const mapStateToProps = state => ({
	currency: state.ReducerPurchaseRequest.currency,
	id: state.ReducerPurchaseRequest.id,
	name: state.ReducerPurchaseRequest.name,
	isOpen: state.ReducerPurchaseRequest.isOpen,
	modalType: state.ReducerPurchaseRequest.modalType,
	currentPage: state.ReducerPurchaseRequest.currentPagePreq,
	paginationPage: state.ReducerPurchaseRequest.paginationPagePreq,
	initialValues: state.ReducerPurchaseRequest,
	userId: state.ReducerLogin.userId,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionOpenModal: (modalType, bank) => dispatch(openModal(modalType, bank)),
	actionCloseModal: () => dispatch(closeModal()),
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
