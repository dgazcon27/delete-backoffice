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
} from '../../actions/Bank/actionsCreators';

import {
	GET_BANKS,
	DELETE_BANK,
} from '../../queries/bank';

import Loading from '../Loading/loading';

const Bank = ({
	id,
	name,
	isOpen,
	classes,
	modalType,
	currentPage,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionChangePage,
	deleteBankMutation,
	actionDeleteBank,
}) => (
	<Query query={GET_BANKS} variables={{ paginationPage }}>
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
							Bancos
						</h5>
						<h5 className={classes.searchAlignRigth}>
							<Link to='/bank-create' href='/bank-create' >
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
										<TableCell>Nombre</TableCell>
										<TableCell>Moneda</TableCell>
										<TableCell className={classes.alignRightOption} >Opciones</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										data.banks.data.map(bank => (
											<TableRow key={bank.id}>
												<TableCell >{bank.name}</TableCell>
												<TableCell >{bank.currency}</TableCell>
												<TableCell className={classes.alignRight}>
													<Tooltip
														enterDelay={200}
														id='tooltip-controlled'
														leaveDelay={100}
														placement='top'
														title='Editar bank.'
													>
														<Link to={{ pathname: `/bank-edit/${bank.id}`, state: { type: 'Bank' } }}>
															<IconButton>
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
														<IconButton onClick={() => { actionOpenModal('delete', bank); }}>
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
											count={data.banks.total}
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
											actionDeleteBank(id, paginationPage, deleteBankMutation);
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

Bank.propTypes = {
	isOpen: PropTypes.bool,
	name: PropTypes.string,
	modalType: PropTypes.string,
	id: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	deleteBankMutation: PropTypes.func.isRequired,
	actionDeleteBank: PropTypes.func.isRequired,
};

Bank.defaultProps = {
	name: '',
	isOpen: false,
	modalType: '',
};

const mapStateToProps = state => ({
	currency: state.ReducerBank.currency,
	id: state.ReducerBank.id,
	name: state.ReducerBank.name,
	isOpen: state.ReducerBank.isOpen,
	modalType: state.ReducerBank.modalType,
	currentPage: state.ReducerBank.currentPageBank,
	paginationPage: state.ReducerBank.paginationPageBank,
});

const mapDispatchToProps = dispatch => ({
	actionDeleteBank: (id, paginationPage, deleteBankMutation) =>
		dispatch(deleteBank(id, paginationPage, deleteBankMutation)),
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionOpenModal: (modalType, bank) => dispatch(openModal(modalType, bank)),
	actionCloseModal: () => dispatch(closeModal()),
});

export { Bank as BankTest };

export default compose(
	graphql(DELETE_BANK, { name: 'deleteBankMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Bank);
