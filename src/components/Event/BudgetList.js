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
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import {
	Modal,
	Paper,
	Switch,
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
import Visibility from '@material-ui/icons/Visibility';
import styles from './userTypeCss';
import {
	openModal,
	closeModal,
	changePage,
	deleteBudget,
	blockedBudget,
} from '../../actions/Event/Access/actionsCreators';
import {
	DELETE_BUDGET,
	GET_BUDGET,
	BLOCK_BUDGET,
} from '../../queries/event';
import Loading from '../Loading/loading';

const BudgetList = ({
	id,
	isOpen,
	classes,
	modalType,
	statusValue,
	currentPage,
	actionOpenModal,
	actionCloseModal,
	paginationPage,
	actionChangePage,
	actionDeleteBudget,
	deleteBudgetMutation,
	blockedBudgetMutation,
	actionBlockedBudget,
	events,
}) => (
	<Query query={GET_BUDGET} variables={{ events, paginationPage }}>
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
						<h5 className={classes.title}>
							Cotizaciones por Evento
						</h5>
						<div className={classes.search}>
							<h5 className={classes.searchAlignRigth}>
								<Link to={{ pathname: `/event-budget-create/${events}` }}>
									<Button variant='extendedFab' aria-label='Delete' className={classes.addNew}>
										<Add className={classes.marginIcon} />
										Crear nueva Cotización
									</Button>
								</Link>
							</h5>
						</div>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Evento</TableCell>
										<TableCell>Precio Total</TableCell>
										<TableCell>Pendiente por pagar</TableCell>
										<TableCell>Total pagado</TableCell>

										<TableCell className={classes.alignRightOption}>
											Opciones
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data.budgetByEvent[0].data.map(budget => (
										<TableRow key={budget.id}>
											<TableCell>{budget.event.name}</TableCell>
											<TableCell>{budget.totalPrice}</TableCell>
											<TableCell>{budget.pendingPayment}</TableCell>
											<TableCell>{budget.totalPaid}</TableCell>
											<TableCell className={classes.alignRight}>
												<Tooltip
													enterDelay={200}
													id='tooltip-controlled'
													leaveDelay={100}
													placement='top'
													title='Detalles de Cotización'
												>
													<Link to={{ pathname: `/budget-detail/${budget.id}` }}>
														<IconButton>
															<Visibility />
														</IconButton>
													</Link>
												</Tooltip>
												<Tooltip
													enterDelay={200}
													id='tooltip-controlled'
													leaveDelay={100}
													placement='top'
													title='Editar Cotización'
												>
													<Link to={{ pathname: `/event-budget-edit/${events}/${budget.id}` }}>
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
													title='Eliminar Cotización'
												>
													<IconButton onClick={() => { actionOpenModal('delete', budget); }}>
														<Delete />
													</IconButton>
												</Tooltip>
												<Tooltip
													enterDelay={200}
													id='tooltip-controlled'
													leaveDelay={100}
													placement='top'
													title='Bloquear / Desbloquear'
												>
													<Switch
														onClick={() => actionOpenModal('block', budget)}
														checked={!budget.active}
														value='checked'
													/>
												</Tooltip>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											count={data.budgetByEvent[0].total}
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
							{modalType === 'delete' &&
							<Paper className={classNames(classes.paperOnModal)}>
								<h6>
									Eliminar Cotización
								</h6>
								<p>
									¿Estas seguro que desea eliminar el Cotización?
								</p>
								<span>
									<IconButton onClick={() => {
										actionDeleteBudget(id, events, paginationPage, deleteBudgetMutation);
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
							{modalType === 'block' &&
								<Paper className={classNames(classes.paperOnModal)}>
									{statusValue === 1 && <h6> Bloquear Cotización </h6>}
									{statusValue === 0 && <h6> Desbloquear Cotización </h6>}
									{
										statusValue === 1 &&
										<p>
											¿Estas seguro que desea bloquear el Cotización?
										</p>
									}
									{
										statusValue === 0 &&
										<p>
										¿Estas seguro que desea desbloquear el Cotización?
										</p>
									}

									<span>
										<IconButton
											onClick={() => {
												actionBlockedBudget(
													id,
													statusValue,
													blockedBudgetMutation,
												);
											}}
										>
										Si
										</IconButton>
										&nbsp;
										&nbsp;
										<IconButton onClick={actionCloseModal} >
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

BudgetList.propTypes = {
	isOpen: PropTypes.bool,
	modalType: PropTypes.string,
	statusValue: PropTypes.number,
	id: PropTypes.number.isRequired,
	events: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionDeleteBudget: PropTypes.func.isRequired,
	deleteBudgetMutation: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	actionBlockedBudget: PropTypes.func.isRequired,
	blockedBudgetMutation: PropTypes.func.isRequired,
};

BudgetList.defaultProps = {
	isOpen: false,
	modalType: '',
	statusValue: 0,
};

const mapStateToProps = state => ({
	id: state.ReducerEventAccess.id,
	events: state.ReducerEventAccess.event,
	isOpen: state.ReducerEventAccess.isOpen,
	modalType: state.ReducerEventAccess.modalType,
	statusValue: state.ReducerEventAccess.statusValue,
	currentPage: state.ReducerPagination.currentPage,
	paginationPage: state.ReducerPagination.paginationPage,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionOpenModal: (modalType, _access) => dispatch(openModal(modalType, _access)),
	actionCloseModal: () => dispatch(closeModal()),
	actionDeleteBudget: (
		id,
		event,
		paginationPage,
		deleteBudgetMutation,
	) => dispatch(deleteBudget(id, event, paginationPage, deleteBudgetMutation)),
	actionBlockedBudget: (
		id,
		statusValue,
		blockedBudgetMutation,
	) => dispatch(blockedBudget(id, statusValue, blockedBudgetMutation)),
});

export default compose(
	graphql(DELETE_BUDGET, { name: 'deleteBudgetMutation' }),
	graphql(BLOCK_BUDGET, { name: 'blockedBudgetMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(BudgetList);
