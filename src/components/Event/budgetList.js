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
	openModal,
	closeModal,
	changePage,
	deleteAccess,
	blockAccess,
} from '../../actions/Event/Access/actionsCreators';
import {
	DELETE_ACCESS,
	BLOCK_ACCESS,
	GET_BUDGET,
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
	actionDeleteAccess,
	deleteAccessMutation,
	blockAccessMutation,
	actionBlockAccess,
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
								<Link to={{ pathname: `/event-access-create/${events}` }}>
									<Button variant='extendedFab' aria-label='Delete' className={classes.addNew}>
										<Add className={classes.marginIcon} />
										Crear Acceso por Evento
									</Button>
								</Link>
							</h5>
						</div>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Nombre</TableCell>
										<TableCell>Área</TableCell>
										<TableCell>Habitación</TableCell>
										<TableCell>Cantidad</TableCell>
										<TableCell className={classes.alignRightOption}>
											Opciones
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data.budgetByEvent[0].data.map(budget => (
										<TableRow key={budget.id}>
											<TableCell>{budget.id}</TableCell>

											<TableCell className={classes.alignRight}>
												<Tooltip
													enterDelay={200}
													id='tooltip-controlled'
													leaveDelay={100}
													placement='top'
													title='Editar Acceso'
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
													title='Eliminar Acceso'
												>
													<IconButton onClick={() => { actionOpenModal('delete', budget); }}>
														<Delete />
													</IconButton>
												</Tooltip>
												{/*
												<Tooltip
													enterDelay={200}
													id='tooltip-controlled'
													leaveDelay={100}
													placement='top'
													title='Bloquear / Desbloquear'
												>
													<Switch
														onClick={() => { actionOpenModal('block', budget); }}
														checked={!budget.active}
														value='checked'
													/>
												</Tooltip>
												*/}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											count={data.accessesByEvent[0].total}
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
									Eliminar Acceso
								</h6>
								<p>
									¿Estas seguro que desea eliminar el Acceso?
								</p>
								<span>
									<IconButton onClick={() => {
										actionDeleteAccess(id, events, paginationPage, deleteAccessMutation);
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
									{statusValue === 1 && <h6> Bloquear Acceso </h6>}
									{statusValue === 2 && <h6> Desbloquear Acceso </h6>}
									{
										statusValue === 1 &&
										<p>
											¿Estas seguro que desea bloquear el Acceso?
										</p>
									}
									{
										statusValue === 2 &&
										<p>
										¿Estas seguro que desea desbloquear el Acceso?
										</p>
									}

									<span>
										<IconButton
											onClick={() => {
												actionBlockAccess(
													id,
													events,
													statusValue,
													paginationPage,
													blockAccessMutation,
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
	actionDeleteAccess: PropTypes.func.isRequired,
	deleteAccessMutation: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	actionBlockAccess: PropTypes.func.isRequired,
	blockAccessMutation: PropTypes.func.isRequired,
};

BudgetList.defaultProps = {
	isOpen: false,
	modalType: '',
	statusValue: 0,
};

const mapStateToProps = state => ({
	id: state.ReducerEvent.id,
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
	actionDeleteAccess: (
		id,
		event,
		paginationPage,
		deleteAccessMutation,
	) => dispatch(deleteAccess(id, event, paginationPage, deleteAccessMutation)),
	actionBlockAccess: (
		id,
		event,
		statusValue,
		paginationPage,
		blockAccessMutation,
	) => dispatch(blockAccess(id, event, statusValue, paginationPage, blockAccessMutation)),
});

export default compose(
	graphql(DELETE_ACCESS, { name: 'deleteAccessMutation' }),
	graphql(BLOCK_ACCESS, { name: 'blockAccessMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(BudgetList);
