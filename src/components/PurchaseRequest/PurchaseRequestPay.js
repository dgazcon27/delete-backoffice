import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
	compose,
	Query,
} from 'react-apollo';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Edit from '@material-ui/icons/Edit';
import {
	Table,
	Tooltip,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	IconButton,
	TableFooter,
} from '@material-ui/core';
import styles from './userTypeCss';
import {
	openModal,
	closeModal,
} from '../../actions/Payment/actionsCreators';

import { PURCHASE_REQUEST_PAY } from '../../queries/purchaseRequest';
import Loading from '../Loading/loading';

const PurchaseRequestPay = ({
	id,
	classes,
}) => (
	<Query query={PURCHASE_REQUEST_PAY} variables={{ id }}>
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
					<div className={classes.purchaseRequestModal}>
						<h5 className={classes.titleModal}>Abonos del Cliente</h5>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Monto</TableCell>
									<TableCell>Referencia</TableCell>
									<TableCell>Banco</TableCell>
									<TableCell>Fecha</TableCell>
									<TableCell className={classes.alignRightOption} >Opciones</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.purchaseRequestPayment.map(payment => (
									<TableRow key={payment.payment.id}>
										<TableCell>{payment.payment.amount}</TableCell>
										<TableCell>{payment.payment.reference}</TableCell>
										<TableCell>{payment.payment.bankAccount.bank.name}</TableCell>
										<TableCell>{payment.payment.created_at}</TableCell>
										<TableCell>
											<Tooltip
												enterDelay={200}
												id='tooltip-controlled'
												leaveDelay={100}
												placement='top'
												title='Editar Pago'
											>
												<Link to={{ pathname: `/pre-sale-edit/${payment.id}/${payment.payment.id}` }}>
													<IconButton >
														<Edit />
													</IconButton>
												</Link>
											</Tooltip>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter />
						</Table>

					</div>
				</div>
			);
		}}
	</Query>
);

PurchaseRequestPay.propTypes = {
	id: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	id: state.ReducerPurchaseRequest.id,
	currentPage: state.ReducerPurchaseRequest.currentPage,
	paginationPage: state.ReducerPurchaseRequest.paginationPage,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, _payment) => dispatch(openModal(modalType, _payment)),
	actionCloseModal: () => dispatch(closeModal()),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(PurchaseRequestPay);
