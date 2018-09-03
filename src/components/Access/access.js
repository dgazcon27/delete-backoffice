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
import styles from './accessCss';
import {
	openModal,
	closeModal,
	setAccess,
	deleteAccess,
	changePage,
} from '../../actions/Access/actionsCreators';
import {
	GET_ACCESS,
	DELETE_ACCESS,
} from '../../queries/access';
import Loading from '../Loading/loading';

const Access = ({
	id,
	name,
	isOpen,
	classes,
	modalType,
	statusValue,
	currentPage,
	actionOpenModal,
	actionCloseModal,
	actionEditAccess,
	paginationPage,
	actionDeleteAccess,
	actionChangePage,
	deleteAccessMutation,
}) => (
	<Query query={GET_ACCESS} variables={{ paginationPage }}>
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
							Acceso
						</h5>

						<div className={classes.search}>
							<h5 className={classes.searchAlignRigth}>
								<Link to='/access-create' href='/access-create' >
									<Button variant='extendedFab' aria-label='Delete' className={classes.addNew}>
										<Add className={classes.marginIcon} />
										Crear Acceso
									</Button>
								</Link>
							</h5>
						</div>

						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Nombre</TableCell>
										<TableCell>Precio</TableCell>
										<TableCell>Ubicacion</TableCell>
										<TableCell className={classes.alignRightOption}>
												Opciones
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data.access.data.map(access => (
										<TableRow key={access.id}>
											<TableCell>{access.name}</TableCell>
											<TableCell>{access.price}</TableCell>
											<TableCell>{access.location.name}</TableCell>
											<TableCell className={classes.alignRight}>
												<Tooltip
													enterDelay={200}
													id='tooltip-controlled'
													leaveDelay={100}
													placement='top'
													title='Editar Acceso'
												>
													<Link to='/access-edit' href='/access-edit'>
														<IconButton
															onClick={() => {
																actionEditAccess(
																	access.id,
																	access.name,
																	access.description,
																	access.price,
																	access.currency,
																	access.location.id,
																	access.zone.id,
																	access.status.id,
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
													title='Eliminar Acceso'
												>
													<IconButton onClick={() => { actionOpenModal('delete', access); }}>
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
											count={data.access.total}
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
										Eliminar Acceso
									</h6>
									<p>
										¿Estas seguro que desea eliminar el acceso {name} ?
									</p>
									<span>
										<IconButton onClick={() => {
											actionDeleteAccess(id, statusValue, paginationPage, deleteAccessMutation);
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

Access.propTypes = {
	isOpen: PropTypes.bool,
	modalType: PropTypes.string,
	statusValue: PropTypes.number,
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionEditAccess: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionDeleteAccess: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	deleteAccessMutation: PropTypes.func.isRequired,
};

Access.defaultProps = {
	isOpen: false,
	modalType: '',
	statusValue: 0,
};

const mapStateToProps = state => ({
	id: state.ReducerAccess.id,
	name: state.ReducerAccess.name,
	isOpen: state.ReducerAccess.isOpen,
	modalType: state.ReducerAccess.modalType,
	statusValue: state.ReducerAccess.statusValue,
	currentPage: state.ReducerAccess.currentPage,
	paginationPage: state.ReducerAccess.paginationPage,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionOpenModal: (modalType, _access) => dispatch(openModal(modalType, _access)),
	actionDeleteAccess: (id, statusValue, paginationPage, deleteAccessMutation) =>
		dispatch(deleteAccess(id, statusValue, paginationPage, deleteAccessMutation)),
	actionCloseModal: () => dispatch(closeModal()),
	actionEditAccess: (
		id,
		name,
		description,
		price,
		currency,
		location,
		zone,
		status,
	) => dispatch(setAccess(id, name, description, price, currency, location, zone, status)),
});

export default compose(
	graphql(DELETE_ACCESS, { name: 'deleteAccessMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Access);
