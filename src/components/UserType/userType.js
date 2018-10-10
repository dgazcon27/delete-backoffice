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

import styles from './userTypeCss';
import {
	changePage,
	changePageSearch,
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

import { SEARCH_ROLES } from '../../queries/search';

import Loading from '../Loading/loading';

const UserType = ({
	id,
	name,
	isOpen,
	classes,
	modalType,
	currentPage,
	paginationPage,
	currentPageSearch,
	statusValue,
	actionOpenModal,
	actionCloseModal,
	actionChangePage,
	blockRolMutation,
	deleteRolMutation,
	actionBlockUserType,
	actionDeleteUserType,
	actionChangePageSearch,
	query,
}) => {
	const params = query.length > 0 ?
		{ query: SEARCH_ROLES, variables: { query, currentPageSearch } } :
		{ query: GET_ROLES, variables: { paginationPage } };

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

				const response = query.length > 0 ? data.search.roles.data : data.roles.data;
				const total = query.length > 0 ? data.search.roles.total : data.roles.total;

				return (
					<div>
						<div>
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
											response.map(rol => (
												<TableRow key={rol.id}>
													<TableCell >{rol.name}</TableCell>
													<TableCell className={classes.alignRight}>
														<Tooltip
															enterDelay={200}
															id='tooltip-controlled'
															leaveDelay={100}
															placement='top'
															title='Editar Rol.'
														>
															<Link to={{ pathname: `/user-type-edit/${rol.id}`, state: { type: 'UserType' } }}>
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
																checked={!rol.active}
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
											{query.length > 0 &&
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
							className={classNames(classes.modalOpenStyle)}
							hideBackdrop
							disableAutoFocus={false}
						>
							<div>
								{ 	modalType === 'edit' &&
									<Paper>
										<h1>
											contenido edit modal
										</h1>
										<button onClick={actionCloseModal}>
											cerrar
										</button>
									</Paper>
								}

								{	modalType === 'block' &&
									<Paper className={classNames(classes.paperOnModal)}>
										{statusValue && <h6> Bloquear Rol </h6>}
										{!statusValue && <h6> Desbloquear Rol </h6>}
										{
											statusValue &&
											<p>
												¿Estas seguro que desea bloquear el rol {name}?
											</p>
										}
										{
											!statusValue &&
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
								{	modalType === 'delete' &&
									<Paper className={classNames(classes.paperOnModal)}>
										<h6>
											Eliminar Rol
										</h6>
										<p>
											¿Estas seguro que desea eliminar el rol {name} ?
										</p>
										<span>
											<IconButton onClick={() => {
												actionDeleteUserType(id, statusValue, paginationPage, deleteRolMutation);
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
};

UserType.propTypes = {
	query: PropTypes.string,
	isOpen: PropTypes.bool,
	name: PropTypes.string,
	modalType: PropTypes.string,
	statusValue: PropTypes.number,
	id: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	currentPageSearch: PropTypes.number.isRequired,
	blockRolMutation: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	deleteRolMutation: PropTypes.func.isRequired,
	actionBlockUserType: PropTypes.func.isRequired,
	actionDeleteUserType: PropTypes.func.isRequired,
	actionChangePageSearch: PropTypes.func.isRequired,
};

UserType.defaultProps = {
	name: '',
	isOpen: false,
	modalType: '',
	statusValue: 0,
	query: '',
};

const mapStateToProps = (state, ownProps) => ({
	id: state.ReducerUserType.id,
	name: state.ReducerUserType.name,
	isOpen: state.ReducerUserType.isOpen,
	modalType: state.ReducerUserType.modalType,
	statusValue: state.ReducerUserType.statusValue,
	currentPage: state.ReducerUserType.currentPage,
	paginationPage: state.ReducerUserType.paginationPage,
	currentPageSearch: state.ReducerUserType.currentPageSearch,
	query: ownProps.query,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionChangePageSearch: (currentPage, paginationPage) =>
		dispatch(changePageSearch(currentPage, paginationPage)),
	actionOpenModal: (modalType, _rol) => dispatch(openModal(modalType, _rol)),
	actionBlockUserType: (id, statusValue, blockRolMutation) =>
		dispatch(blockUserType(id, statusValue, blockRolMutation)),
	actionDeleteUserType: (id, statusValue, paginationPage, deleteRolMutation) =>
		dispatch(deleteUserType(id, statusValue, paginationPage, deleteRolMutation)),
	actionCloseModal: () => dispatch(closeModal()),
});

export { UserType as UserTypeTest };

export default compose(
	graphql(DELETE_ROL, { name: 'deleteRolMutation' }),
	graphql(BLOCK_ROL, { name: 'blockRolMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UserType);
