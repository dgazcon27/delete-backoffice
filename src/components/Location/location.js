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
import styles from './locationCss';
import {
	openModal,
	closeModal,
	changePage,
	blockLocation,
	deleteLocation,
} from '../../actions/location/actionsCreators';
import {
	GET_LOCATIONS,
	BLOCK_LOCATION,
	DELETE_LOCATION,
} from '../../queries/location';
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
}) => (
	<Query query={GET_LOCATIONS} variables={{ paginationPage }}>
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
						Errror :(
					</div>
				);
			}
			return (
				<div>
					<div>
						<h3>
							Ubicación
						</h3>
						<h5>
							<Link to='/create-tables' href='/create-tables'>
								Crear Ubicación
							</Link>
						</h5>
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
									{data.locations.data.map(location => (
										<TableRow key={location.id}>
											<TableCell>{location.name}</TableCell>
											<TableCell className={classes.alignRight}>
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
												<Tooltip
													enterDelay={200}
													id='tooltip-controlled'
													leaveDelay={100}
													placement='top'
													title='Bloquear / Desbloquear'
												>
													<Switch
														onClick={() => { actionOpenModal('block', location); }}
														checked={location.status.id === 2}
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
											count={data.locations.total}
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
										onClick={() => { actionBlockLocation(id, statusValue, blockLocationMutation); }}
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

Location.propTypes = {
	statusValue: PropTypes.number,
	id: PropTypes.number.isRequired,
	name: PropTypes.string,
	isOpen: PropTypes.bool,
	classes: PropTypes.object.isRequired,
	modalType: PropTypes.string,
	currentPage: PropTypes.number.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	actionBlockLocation: PropTypes.func.isRequired,
	actionDeleteLocation: PropTypes.func.isRequired,
	blockLocationMutation: PropTypes.func.isRequired,
	deleteLocationMutation: PropTypes.func.isRequired,
};

Location.defaultProps = {
	name: '',
	isOpen: false,
	modalType: '',
	statusValue: 0,
};

const mapStateToProps = state => ({
	id: state.ReducerLocation.id,
	name: state.ReducerLocation.name,
	isOpen: state.ReducerLocation.isOpen,
	modalType: state.ReducerLocation.modalType,
	statusValue: state.ReducerLocation.statusValue,
	currentPage: state.ReducerLocation.currentPage,
	paginationPage: state.ReducerLocation.paginationPage,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
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
