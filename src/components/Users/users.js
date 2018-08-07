import React from 'react';
import PropTypes from 'prop-types';
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
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import styles from '../UserType/userTypeCss';
import {
	GET_USERS,
	BLOCK_USER,
	DELETE_USER,
} from '../../queries/users';
import { changePage } from '../../actions/userType/actionsCreators';
import {
	// editUser,
	blockUser,
	deleteUser,
	openModal,
	closeModal,
} from '../../actions/users/actionsCreators';

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
	actionChangePage,
	actionOpenModal,
	actionBlockUser,
	actionDeleteUser,
	actionCloseModal,
	blockUserMutation,
	deleteUserMutation,
}) => (
	<Query query={GET_USERS} variables={{ paginationPage }}>
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
							Usuarios
						</h3>
						<h5>
							Agregar Nuevo
						</h5>

						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Nombre</TableCell>
										<TableCell className={classes.alignRightOption} >Opciones</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{
										data.users.data.map(user => (
											<TableRow key={user.id}>
												<TableCell >{`${user.name} ${user.lastName}`}</TableCell>
												<TableCell className={classes.alignRight} >
													<IconButton onClick={actionCloseModal}>
														<Edit />
													</IconButton>
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
															checked={user.status.id === 2}
															value='checked'
														/>
													</Tooltip>
												</TableCell>
											</TableRow>
										))
									}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											count={data.users.total}
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
									{statusValue === 1 && <h6> Bloquear usuario </h6>}
									{statusValue === 2 && <h6> Desbloquear usuario </h6>}
									{
										statusValue === 1 &&
										<p>
										¿Estas seguro que desea bloquear el Usuario {name}?
										</p>
									}
									{
										statusValue === 2 &&
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
						</div>
					</Modal>
				</div>
			);
		}}
	</Query>
);

Users.propTypes = {
	currentPage: PropTypes.number.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	modalType: PropTypes.string.isRequired,
	statusValue: PropTypes.number.isRequired,
	id: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionBlockUser: PropTypes.func.isRequired,
	blockUserMutation: PropTypes.func.isRequired,
	deleteUserMutation: PropTypes.func.isRequired,
	actionDeleteUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	currentPage: state.ReducerUserType.currentPage,
	id: state.ReducerUserType.id,
	name: state.ReducerUserType.name,
	isOpen: state.ReducerUserType.isOpen,
	modalType: state.ReducerUserType.modalType,
	statusValue: state.ReducerUserType.statusValue,
	paginationPage: state.ReducerUserType.paginationPage,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
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
