import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
	compose,
	Query,
} from 'react-apollo';
import PropTypes from 'prop-types';
import {
	Paper,
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	TableFooter,
	TablePagination,
} from '@material-ui/core';
import Title from '../Shared/title';
import styles from '../Shared/sharedStyles';
import { changePage } from '../../actions/PurchaseRequest/actionsCreators';
import { SEARCH_PURCHASE_REQUEST } from '../../queries/purchaseRequest';
import { GET_BANK_ACCOUNTS_STATE } from '../../queries/bank';
import Loading from '../Loading/loading';

const BankAccountState = ({
	actionChangePage,
	paginationPage,
	accountNumber,
	currentPage,
	isLoading,
	fullName,
	bankName,
	currency,
	viewlist,
	classes,
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
											total > 0 ?
												<div>
													<div className={classes.balance}>
														{alfa.bankAccount.owner.fullName} -
														{alfa.bankAccount.accountNumber} -
														{alfa.bankAccount.bank.name}
													</div>
													<div className={classes.balance}>
														{alfa.bankAccount.currency} :
														{alfa.bankAccount.currentBalance}
													</div>
												</div> :
												<div>
													<div className={classes.center} >
														<h4>
												No Existen movimientos para esta cuenta.
														</h4>
													</div>
													<div>
														<div className={classes.balance}>
															{fullName} -
															{accountNumber} -
															{bankName}
														</div>
														<div className={classes.balance}>
															{currency} : 0
														</div>
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
							</div>
						}
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
	isLoading: PropTypes.bool.isRequired,
	isOpenTicket: PropTypes.bool.isRequired,
	id: PropTypes.number.isRequired,
	fullName: PropTypes.string.isRequired,
	bankName: PropTypes.string.isRequired,
	accountNumber: PropTypes.string.isRequired,
	currency: PropTypes.string.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionOpenTicketModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

BankAccountState.defaultProps = {
	query: '',
};


const mapStateToProps = state => ({
	accountNumber: state.ReducerBankAccount.accountNumber,
	fullName: state.ReducerBankAccount.fullName,
	bankName: state.ReducerBankAccount.bankName,
	currency: state.ReducerBankAccount.currency,

	paginationPage: state.ReducerPurchaseRequest.paginationPage,
	currentPage: state.ReducerPurchaseRequest.currentPage,
	id: state.ReducerBankAccount.id,
	isOpenTicket: state.ReducerTicket.isOpen,
	isOpen: state.ReducerPurchaseRequest.isOpen,
	viewlist: state.ReducerTicket.viewlist,
	isLoading: state.ReducerTicket.isLoading,
	isAlert: state.ReducerTicket.isAlert,
	noModal: state.ReducerTicket.noModal,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
});

export { BankAccountState as PurchaseRequestNewTest };

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(BankAccountState);
