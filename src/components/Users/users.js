import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
	Modal,
	Paper,
	Table,
	Switch,
	Tooltip,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	IconButton,
	TableFooter,
	TablePagination,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
	graphql,
	compose,
	Query,
} from 'react-apollo';
import { Link } from 'react-router-dom';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import VpnKey from '@material-ui/icons/VpnKey';
import styles from '../UserType/userTypeCss';
import {
	GET_USERS,
	BLOCK_USER,
	DELETE_USER,
} from '../../queries/users';
import { SEARCH_USERS } from '../../queries/search';
import {
	blockUser,
	deleteUser,
	openModal,
	closeModal,
	changePage,
	changePageSearch,
} from '../../actions/users/actionsCreators';
import ModalPassword from './modalPassword';

import Loading from '../Loading/loading';

const Users = ({
	id,
	name,
	isOpen,
	classes,
	modalType,
	statusValue,
	currentPage,
	paginationPage,
	currentPageSearch,
	query,
	actionChangePage,
	actionOpenModal,
	actionBlockUser,
	actionDeleteUser,
	actionCloseModal,
	actionChangePageSearch,
	blockUserMutation,
	deleteUserMutation,
}) => {
	const params = query.length > 0 ?
		{ query: SEARCH_USERS, variables: { query, currentPageSearch } } :
		{ query: GET_USERS, variables: { paginationPage } };

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

				const response = query.length > 0 ? data.search.users.data : data.users.data;
				const total = query.length > 0 ? data.search.users.total : data.users.total;

				return (
					<div>
						<div>
							<Paper>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>Nombre</TableCell>
											<TableCell>Tipo de Usuario</TableCell>
											<TableCell className={classes.alignRightOption} >Opciones</TableCell>
										</TableRow>
									</TableHead>

									<TableBody>
										{
											response.map(user => (
												<TableRow key={user.id}>
													<TableCell >{`${user.name} ${user.lastName}`}</TableCell>
													<TableCell >{`${user.role.name}`}</TableCell>
													<TableCell className={classes.alignRight} >
														<Tooltip
															enterDelay={200}
															id='tooltip-controlled'
															leaveDelay={100}
															placement='top'
															title='Editar Usuario'
														>
															<Link to={{ pathname: `/users-edit/${user.id}`, state: { type: 'User' } }}>
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
															title='Eliminar Usuario'
														>
															<IconButton onClick={() => { actionOpenModal('delete', user); }}>
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
																onClick={() => { actionOpenModal('block', user); }}
																checked={!user.active}
																value='checked'
															/>
														</Tooltip>
														<Tooltip
															enterDelay={200}
															id='tooltip-controlled'
															leaveDelay={100}
															placement='top'
															title='Cambiar Contraseña'
														>
															<IconButton onClick={() => { actionOpenModal('password', user); }}>
																<VpnKey />
															</IconButton>
														</Tooltip>
													</TableCell>
												</TableRow>
											))
										}
									</TableBody>
									<TableFooter>
										<TableRow>
											{ query.length > 0 &&
												<TablePagination
													count={total}
													rowsPerPage={10}
													page={currentPageSearch}
													rowsPerPageOptions={[10]}
													colSpan={3}
													onChangePage={(event, nextPage) => {
														actionChangePageSearch(currentPageSearch, nextPage);
													}}
												/>
											}
											{ query.length === 0 &&
												<TablePagination
													count={total}
													rowsPerPage={10}
													page={paginationPage}
													rowsPerPageOptions={[10]}
													colSpan={3}
													onChangePage={(event, nextPage) => {
														actionChangePage(currentPage, nextPage);
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
							className={(classes.modalOpenStyle)}
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
								{modalType === 'block' &&
									<Paper className={classes.paperOnModal}>
										{statusValue && <h6> Bloquear usuario </h6>}
										{!statusValue && <h6> Desbloquear usuario </h6>}
										{
											statusValue &&
											<p>
											¿Estas seguro que desea bloquear el Usuario {name}?
											</p>
										}
										{
											!statusValue &&
											<p>
												¿Estas seguro que desea desbloquear el Usuario {name}?
											</p>
										}

										<span>
											<IconButton
												onClick={() => { actionBlockUser(id, statusValue, blockUserMutation); }}
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
								{modalType === 'delete' &&
									<Paper className={(classes.paperOnModal)}>
										<h6>
											Eliminar Usuario
										</h6>
										<p>
											¿Estas seguro que desea eliminar el Usuario {name} ?
										</p>
										<span>
											<IconButton onClick={() => {
												actionDeleteUser(id, statusValue, paginationPage, deleteUserMutation);
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
								{modalType === 'password' &&
									<Paper className={(classes.paperOnModal)}>
										<ModalPassword />
									</Paper>
								}
								{modalType === 'foreign_key' &&
									<Paper className={classNames(classes.paperOnModal)}>
										<h6>
											Eliminar Usuario
										</h6>
										<p>
											Él siguiente usuario no puede ser
											eliminado ya que existen elementos que dependen de él.
										</p>
										<span>
											<IconButton onClick={actionCloseModal}>
												Ok
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
};

Users.defaultProps = {
	query: '',
};

Users.propTypes = {
	currentPage: PropTypes.number.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	modalType: PropTypes.string.isRequired,
	statusValue: PropTypes.bool.isRequired,
	id: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	currentPageSearch: PropTypes.number.isRequired,
	query: PropTypes.string,
	actionCloseModal: PropTypes.func.isRequired,
	actionBlockUser: PropTypes.func.isRequired,
	blockUserMutation: PropTypes.func.isRequired,
	deleteUserMutation: PropTypes.func.isRequired,
	actionDeleteUser: PropTypes.func.isRequired,
	actionChangePageSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	id: state.ReducerUser.id,
	name: state.ReducerUser.name,
	isOpen: state.ReducerUser.isOpen,
	modalType: state.ReducerUser.modalType,
	statusValue: state.ReducerUser.statusValue,
	paginationPage: state.ReducerUser.paginationPageUsers,
	currentPage: state.ReducerUser.currentPageUsers,
	currentPageSearch: state.ReducerUserType.currentPageSearch,
	query: ownProps.query,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionChangePageSearch: (currentPage, paginationPage) =>
		dispatch(changePageSearch(currentPage, paginationPage)),
	actionOpenModal: (modalType, _user) => dispatch(openModal(modalType, _user)),
	actionBlockUser: (id, statusValue, blockUserMutation) =>
		dispatch(blockUser(id, statusValue, blockUserMutation)),
	actionDeleteUser: (id, statusValue, paginationPage, deleteUserMutation) =>
		dispatch(deleteUser(id, statusValue, paginationPage, deleteUserMutation)),
	actionCloseModal: () => dispatch(closeModal()),
});

export default compose(
	graphql(DELETE_USER, { name: 'deleteUserMutation' }),
	graphql(BLOCK_USER, { name: 'blockUserMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Users);
