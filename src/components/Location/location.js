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

import styles from './locationCss';

import {
	openModal,
	closeModal,
	changePage,
	blockLocation,
	deleteLocation,
	changePageSearch,
} from '../../actions/location/actionsCreators';

import {
	GET_LOCATIONS,
	BLOCK_LOCATION,
	DELETE_LOCATION,
} from '../../queries/location';

import { SEARCH_LOCATIONS } from '../../queries/search';
import Loading from '../Loading/loading';

const Location = ({
	id,
	name,
	isOpen,
	classes,
	modalType,
	statusValue,
	currentPage,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionChangePage,
	actionBlockLocation,
	actionDeleteLocation,
	blockLocationMutation,
	deleteLocationMutation,
	currentPageSearch,
	actionChangePageSearch,
	query,
}) => 	{
	const params = query.length > 0 ?
		{ query: SEARCH_LOCATIONS, variables: { query, currentPageSearch } } :
		{ query: GET_LOCATIONS, variables: { paginationPage } };
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
						<div>
							Error :(
						</div>
					);
				}

				const response = query.length > 0 ? data.search.locations.data : data.locations.data;
				const total = query.length > 0 ? data.search.locations.total : data.locations.total;
				return (
					<div>
						<div>
							<Paper>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>Nombre</TableCell>
											<TableCell className={classes.alignRightOption}>
												Opciones
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{response.map(location => (
											<TableRow key={location.id}>
												<TableCell>{location.name}</TableCell>
												<TableCell className={classes.alignRight}>
													<Tooltip
														enterDelay={200}
														id='tooltip-controlled'
														leaveDelay={100}
														placement='top'
														title='Editar Ubicación'
													>
														<Link to={{ pathname: `/edit-tables/${location.id}`, state: { type: 'Location' } }}>
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
														title='Eliminar Ubicación'
													>
														<IconButton onClick={() => { actionOpenModal('delete', location); }}>
															<Delete />
														</IconButton>
													</Tooltip>
												</TableCell>
											</TableRow>
										))}
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
									{statusValue === 1 && <h6> Bloquear Ubicación </h6>}
									{statusValue === 2 && <h6> Desbloquear Ubicación </h6>}
									{
										statusValue === 1 &&
										<p>
										¿Estas seguro que desea bloquear la ubicación {name}?
										</p>
									}
									{
										statusValue === 2 &&
										<p>
											¿Estas seguro que desea desbloquear la ubicación {name}?
										</p>
									}

									<span>
										<IconButton
											onClick={() => {
												actionBlockLocation(
													id,
													statusValue,
													blockLocationMutation,
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
								{modalType === 'delete' &&
								<Paper className={classNames(classes.paperOnModal)}>
									<h6>
										Eliminar Ubicación
									</h6>
									<p>
										¿Estas seguro que desea eliminar la ubicación {name} ?
									</p>
									<span>
										<IconButton onClick={() => {
											actionDeleteLocation(id, statusValue, paginationPage, deleteLocationMutation);
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

Location.propTypes = {
	query: PropTypes.string,
	name: PropTypes.string,
	isOpen: PropTypes.bool,
	modalType: PropTypes.string,
	statusValue: PropTypes.number,
	id: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	actionBlockLocation: PropTypes.func.isRequired,
	actionDeleteLocation: PropTypes.func.isRequired,
	blockLocationMutation: PropTypes.func.isRequired,
	deleteLocationMutation: PropTypes.func.isRequired,
	currentPageSearch: PropTypes.number.isRequired,
	actionChangePageSearch: PropTypes.func.isRequired,
};

Location.defaultProps = {
	name: '',
	isOpen: false,
	modalType: '',
	statusValue: 0,
	query: '',
};

const mapStateToProps = state => ({
	id: state.ReducerLocation.id,
	name: state.ReducerLocation.name,
	isOpen: state.ReducerLocation.isOpen,
	modalType: state.ReducerLocation.modalType,
	statusValue: state.ReducerLocation.statusValue,
	currentPage: state.ReducerLocation.currentPageLoc,
	paginationPage: state.ReducerLocation.paginationPageLoc,
	currentPageSearch: state.ReducerLocation.currentPageSearch,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionChangePageSearch: (currentPage, paginationPage) =>
		dispatch(changePageSearch(currentPage, paginationPage)),
	actionOpenModal: (modalType, _location) => dispatch(openModal(modalType, _location)),
	actionBlockLocation: (id, statusValue, blockLocationMutation) =>
		dispatch(blockLocation(id, statusValue, blockLocationMutation)),
	actionDeleteLocation: (id, statusValue, paginationPage, deleteLocationMutation) =>
		dispatch(deleteLocation(id, statusValue, paginationPage, deleteLocationMutation)),
	actionCloseModal: () => dispatch(closeModal()),
});

export default compose(
	graphql(DELETE_LOCATION, { name: 'deleteLocationMutation' }),
	graphql(BLOCK_LOCATION, { name: 'blockLocationMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Location);
