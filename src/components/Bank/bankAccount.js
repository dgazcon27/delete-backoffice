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

import styles from './userTypeCss';
import {
	changePage,
	deleteBank,
	openModal,
	closeModal,
	setBankAccount,
} from '../../actions/Bank/actionsCreators';

import {
	GET_BANK_ACCOUNTS,
	DELETE_BANK_ACCOUNT,
} from '../../queries/bank';

import Loading from '../Loading/loading';

const BankAccount = ({
	id,
	name,
	isOpen,
	classes,
	modalType,
	currentPage,
	actionSetBankAccount,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionChangePage,
	deleteBankAccountMutation,
	actionDeleteBankAccount,
}) => (
	<Query query={GET_BANK_ACCOUNTS} variables={{ paginationPage }}>
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
						<h3>
							Cuentas bancarias
						</h3>
						<h5>
							<div>
								<Link to='/bank-account-create' href='/bank-account-create' >
									Agregar nueva cuenta
								</Link>
							</div>
						</h5>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Propietario</TableCell>
										<TableCell>Numero de cuenta</TableCell>
										<TableCell>Moneda</TableCell>
										<TableCell className={classes.alignRightOption} >Opciones</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										data.bankAccounts.data.map(bankA => (
											<TableRow key={bankA.id}>
												<TableCell >{`${bankA.owner.name} ${bankA.owner.lastName}` }</TableCell>
												<TableCell >{bankA.accountNumber}</TableCell>
												<TableCell >{bankA.currency}</TableCell>
												<TableCell className={classes.alignRight}>
													<Tooltip
														enterDelay={200}
														id='tooltip-controlled'
														leaveDelay={100}
														placement='top'
														title='Editar bank.'
													>
														<Link to='/bank-account-edit/' href='/bank-account-edit'>
															<IconButton
																onClick={() => {
																	actionSetBankAccount(
																		bankA.id,
																		bankA.owner.id,
																		bankA.bank.id,
																		bankA.type,
																		bankA.currency,
																		bankA.accountNumber,
																		bankA.comment,
																	);
																}
																}
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
														title='Eliminar bank'
													>
														<IconButton onClick={() => { actionOpenModal('delete', bankA); }}>
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
											count={data.bankAccounts.total}
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
										Eliminar bank
								</h6>
								<p>
										¿Estas seguro que desea eliminar el bank {name} ?
								</p>
								<span>
									<IconButton onClick={() => {
										actionDeleteBankAccount(id, paginationPage, deleteBankAccountMutation);
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

BankAccount.propTypes = {
	isOpen: PropTypes.bool,
	name: PropTypes.string,
	modalType: PropTypes.string,
	id: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	actionSetBankAccount: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	deleteBankAccountMutation: PropTypes.func.isRequired,
	actionDeleteBankAccount: PropTypes.func.isRequired,
};

BankAccount.defaultProps = {
	name: '',
	isOpen: false,
	modalType: '',
};

const mapStateToProps = state => ({
	currency: state.ReducerBankAccount.currency,
	id: state.ReducerBankAccount.id,
	accountNumber: state.ReducerBankAccount.accountNumber,
	isOpen: state.ReducerBankAccount.isOpen,
	modalType: state.ReducerBankAccount.modalType,
	currentPage: state.ReducerBankAccount.currentPage,
	paginationPage: state.ReducerBankAccount.paginationPage,
});

const mapDispatchToProps = dispatch => ({
	actionDeleteBankAccount: (id, paginationPage, deleteBankAccountMutation) =>
		dispatch(deleteBank(id, paginationPage, deleteBankAccountMutation)),
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionOpenModal: (modalType, bank) => dispatch(openModal(modalType, bank)),
	actionCloseModal: () => dispatch(closeModal()),
	actionSetBankAccount: (
		id,
		owner,
		bank,
		accountNumber,
		type,
		currency,
		comment,
	) =>
		dispatch(setBankAccount(id, owner, bank, type, currency, accountNumber, comment)),
});

export { BankAccount as BankAccountTest };

export default compose(
	graphql(DELETE_BANK_ACCOUNT, { name: 'deleteBankAccountMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(BankAccount);
