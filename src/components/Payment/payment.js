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
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
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
import styles from './paymentCss';
import {
	openModal,
	closeModal,
	setPayment,
	deletePayment,
	changePage,
} from '../../actions/Payment/actionsCreators';
import {
	GET_PAYMENTS,
	DELETE_PAYMENT,
} from '../../queries/payment';
import Loading from '../Loading/loading';

const Payment = ({
	id,
	isOpen,
	classes,
	modalType,
	statusValue,
	currentPage,
	actionOpenModal,
	actionCloseModal,
	actionEditPayment,
	paginationPage,
	actionDeletePayment,
	actionChangePage,
	deletePaymentMutation,
}) => (
	<Query query={GET_PAYMENTS} variables={{ paginationPage }}>
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
					<div>
							Error :(
					</div>
				);
			}
			return (
				<div>
					<div>
						<h3>
							Pagos
						</h3>
						<h5>
							<Link to='/Departments-create' href='/Departments-create'>
									Crear pago
							</Link>
						</h5>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Monto</TableCell>
										<TableCell>Referencia</TableCell>
										<TableCell>Banco</TableCell>
										<TableCell>Fecha</TableCell>
										<TableCell className={classes.alignRightOption}>
												Opciones
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data.payments.data.map(payment => (
										<TableRow key={payment.payment.id}>
											<TableCell>{payment.payment.amount}</TableCell>
											<TableCell>{payment.payment.reference}</TableCell>
											<TableCell>{payment.payment.bankAccount.bank.name}</TableCell>
											<TableCell>{payment.payment.created_at}</TableCell>
											<TableCell className={classes.alignRight}>
												<Tooltip
													enterDelay={200}
													id='tooltip-controlled'
													leaveDelay={100}
													placement='top'
													title='Editar Pago'
												>
													<Link to='/pre-sale-edit' href='/pre-sale-edit'>
														<IconButton
															onClick={() => {
																actionEditPayment(
																	payment.payment.id,
																	payment.purchaseRequest.id,
																	payment.payment.amount,
																	payment.payment.reference,
																	payment.payment.comment,
																	payment.payment.type,
																	payment.payment.bankAccount.id,
																);
															}}
														>
															<Edit />
														</IconButton>
													</Link>
												</Tooltip>
												<Tooltip
													enterDelay={200}
													id='tooltip-controlled'
													leaveDelay={100}
													placement='top'
													title='Eliminar Pago'
												>
													<IconButton onClick={() => { actionOpenModal('delete', payment.payment); }}>
														<Delete />
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											count={data.payments.total}
											rowsPerPage={10}
											page={paginationPage}
											rowsPerPageOptions={[10]}
											colSpan={5}
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
							{modalType === 'edit' &&
							<Paper>
								<h1>
											contenido edit modal
								</h1>
								<button onClick={actionCloseModal}>
											cerrar
								</button>
							</Paper>
							}
							{modalType === 'delete' &&
								<Paper className={classNames(classes.paperOnModal)}>
									<h6>
										Eliminar Pago
									</h6>
									<p>
										¿Estas seguro que desea eliminar el pago {id} ?
									</p>
									<span>
										<IconButton onClick={() => {
											actionDeletePayment(id, statusValue, paginationPage, deletePaymentMutation);
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

Payment.propTypes = {
	isOpen: PropTypes.bool,
	modalType: PropTypes.string,
	statusValue: PropTypes.number,
	id: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionEditPayment: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionDeletePayment: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	deletePaymentMutation: PropTypes.func.isRequired,
};

Payment.defaultProps = {
	isOpen: false,
	modalType: '',
	statusValue: 0,
};

const mapStateToProps = state => ({
	id: state.ReducerPayment.id,
	isOpen: state.ReducerPayment.isOpen,
	modalType: state.ReducerPayment.modalType,
	statusValue: state.ReducerPayment.statusValue,
	currentPage: state.ReducerPayment.currentPage,
	paginationPage: state.ReducerPayment.paginationPage,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionOpenModal: (modalType, _payment) => dispatch(openModal(modalType, _payment)),
	actionDeletePayment: (id, statusValue, paginationPage, deletePaymentMutation) =>
		dispatch(deletePayment(id, statusValue, paginationPage, deletePaymentMutation)),
	actionCloseModal: () => dispatch(closeModal()),
	actionEditPayment: (
		id,
		purchaseRequest,
		amount,
		reference,
		comment,
		type,
		bankAccount,
	) => dispatch(setPayment(id, purchaseRequest, amount, reference, comment, type, bankAccount)),
});

export default compose(
	graphql(DELETE_PAYMENT, { name: 'deletePaymentMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Payment);
