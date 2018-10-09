import React from 'react';
import PropTypes from 'prop-types';
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
import styles from '../Shared/sharedStyles';
import Loading from '../Loading/loading';
import {
	GET_GUESTS,
	SEARCH_INVITED,
	DELETE_GUEST,
} from '../../queries/guest';
import {
	deleteInvited,
	changePageSearch,
	changePage,
} from '../../actions/Guest/actionsCreators';

import {
	openModal,
	closeModal,
} from '../../actions/sharedActions/sharedActions';

const Invited = ({
	id,
	name,
	isOpen,
	classes,
	modalType,
	currentPage,
	paginationPage,
	currentPageSearch,
	actionDelete,
	deleteMutation,
	actionChangePage,
	actionChangePageSearch,
	actionOpenModal,
	actionCloseModal,
	query,
}) => {
	const params = query.length > 0 ?
		{ query: SEARCH_INVITED, variables: { query, page: currentPageSearch } } :
		{ query: GET_GUESTS, variables: { paginationPage } };

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
				const response = query.length > 0 ? data.search.inviteds.data : data.inviteds.data;
				const total = query.length > 0 ? data.search.inviteds.total : data.inviteds.total;
				return (
					<div>
						<div>
							<Paper>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>Nombre</TableCell>
											<TableCell>Apellido</TableCell>
											<TableCell className={classes.alignRightOption} >Opciones</TableCell>
										</TableRow>
									</TableHead>

									<TableBody>
										{
											response.map(user => (
												<TableRow key={user.id}>
													<TableCell >{`${user.user.name}`}</TableCell>
													<TableCell >{`${user.user.lastName}`}</TableCell>
													<TableCell className={classes.alignRight} >
														<Tooltip
															enterDelay={200}
															id='tooltip-controlled'
															leaveDelay={100}
															placement='top'
															title='Editar Usuario'
														>
															<Link to={{ pathname: `/guest-edit/${user.id}`, state: { type: 'Guest' } }}>
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
															title='Eliminar invitado'
														>
															<IconButton onClick={() => { actionOpenModal('delete', user); }}>
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
								{modalType === 'delete' &&
									<Paper className={(classes.paperOnModal)}>
										<h6>
											Eliminar invitado
										</h6>
										<p>
											¿Estas seguro que desea eliminar el invitado {name} ?
										</p>
										<span>
											<IconButton onClick={() => {
												actionDelete(id, deleteMutation);
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

Invited.defaultProps = {
	query: '',
	isOpen: false,
	modalType: '',
	name: '',
};

Invited.propTypes = {
	isOpen: PropTypes.bool,
	name: PropTypes.string,
	query: PropTypes.string,
	modalType: PropTypes.string,
	id: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	paginationPage: PropTypes.number.isRequired,
	currentPageSearch: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	actionDelete: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	actionChangePageSearch: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	deleteMutation: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	id: state.ReducerGuest.id,
	paginationPage: state.ReducerGuest.paginationPage,
	currentPageSearch: state.ReducerUserType.currentPageSearch,
	currentPage: state.ReducerGuest.currentPage,
	name: state.ReducerGuest.name,
	modalType: state.ReducerUserType.modalType,
	isOpen: state.ReducerGuest.isOpen,
	query: ownProps.query,
});


const mapDispatchToProps = dispatch => ({
	actionDelete: (id, deleteMutation) =>
		dispatch(deleteInvited(id, deleteMutation)),
	actionOpenModal: (modalType, invited) => dispatch(openModal(modalType, invited)),
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionChangePageSearch: (currentPage, paginationPage) =>
		dispatch(changePageSearch(currentPage, paginationPage)),
	actionCloseModal: () => dispatch(closeModal()),
});

export { Invited as InvitedTest };

export default compose(
	graphql(DELETE_GUEST, { name: 'deleteMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Invited);
