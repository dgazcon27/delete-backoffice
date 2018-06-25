import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
	compose,
	graphql,
	Query,
} from 'react-apollo';
import PropTypes from 'prop-types';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	Modal,
	Switch,
	Tooltip,
} from '@material-ui/core';

import styles from './userTypeCss';
import {
	editUserType,
	blockUserType,
	deleteUserType,
	openModal,
	closeModal,
} from '../../actions/userType/actionsCreators';

import {
	GET_ROLES,
	BLOCK_ROL,
	DELETE_ROL,
} from '../../queries/userType';

const UserType = ({
	id,
	statusValue,
	name,
	classes,
	isOpen,
	modalType,
	actionOpenModal,
	actionCloseModal,
	blockRolMutation,
	deleteRolMutation,
	actionBlockUserType,
	actionDeleteUserType,
}) => (
	<Query query={GET_ROLES}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<div>
						<h1>Loading ...</h1>
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
							Roles
						</h3>
						<h5>
							<a>
								Agregar Nuevo
							</a>
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
										data.roles.map(rol => (
											<TableRow key={rol.id}>
												<TableCell >{rol.name}</TableCell>
												<TableCell className={classes.alignRight}>
													<IconButton onClick={() => { actionOpenModal('edit', rol); }}>
														<Edit />
													</IconButton>
													<Tooltip
														enterDelay={200}
														id='tooltip-controlled'
														leaveDelay={100}
														placement='top'
														title='Eliminar Rol'
													>
														<IconButton onClick={() => { actionOpenModal('delete', rol); }}>
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
															onClick={() => { actionOpenModal('block', rol); }}
															checked={rol.status.id === 2}
															value='checked'
														/>
													</Tooltip>
												</TableCell>
											</TableRow>
										))
									}
								</TableBody>
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

							{modalType === 'block' &&
								<Paper className={classNames(classes.paperOnModal)}>
									{statusValue === 1 && <h6> Bloquear Rol </h6>}
									{statusValue === 2 && <h6> Desbloquear Rol </h6>}
									{
										statusValue === 1 &&
										<p>
										¿Estas seguro que desea bloquear el rol {name}?
										</p>
									}
									{
										statusValue === 2 &&
										<p>
											¿Estas seguro que desea desbloquear el rol {name}?
										</p>
									}

									<span>
										<IconButton
											onClick={() => { actionBlockUserType(id, statusValue, blockRolMutation); }}
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
								<Paper className={classNames(classes.paperOnModal)}>
									<h6>
										Eliminar Rol
									</h6>
									<p>
										¿Estas seguro que desea eliminar el rol {name} ?
									</p>
									<span>
										<IconButton onClick={() => {
											actionDeleteUserType(id, statusValue, deleteRolMutation);
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

UserType.propTypes = {
	isOpen: PropTypes.bool,
	name: PropTypes.string,
	modalType: PropTypes.string,
	statusValue: PropTypes.number,
	id: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionDeleteUserType: PropTypes.func.isRequired,
	blockRolMutation: PropTypes.func.isRequired,
	deleteRolMutation: PropTypes.func.isRequired,
	actionBlockUserType: PropTypes.func.isRequired,
};

UserType.defaultProps = {
	name: '',
	isOpen: false,
	modalType: '',
	statusValue: 0,
};

const mapStateToProps = state => ({
	id: state.ReducerUserType.id,
	name: state.ReducerUserType.name,
	isOpen: state.ReducerUserType.isOpen,
	update: state.ReducerUserType.update,
	modalType: state.ReducerUserType.modalType,
	statusValue: state.ReducerUserType.statusValue,
});

const mapDispatchToProps = dispatch => ({
	actionOpenModal: (modalType, _rol) => dispatch(openModal(modalType, _rol)),
	actionBlockUserType: (id, statusValue, blockRolMutation) =>
		dispatch(blockUserType(id, statusValue, blockRolMutation)),
	actionDeleteUserType: (id, statusValue, deleteRolMutation) =>
		dispatch(deleteUserType(id, statusValue, deleteRolMutation)),
	actionCloseModal: () => dispatch(closeModal()),
	actionEditUserType: () => dispatch(editUserType()),
});

export default compose(
	graphql(DELETE_ROL, { name: 'deleteRolMutation', options: { refetchQueries: [{ query: GET_ROLES }] } }),
	graphql(BLOCK_ROL, { name: 'blockRolMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UserType);
