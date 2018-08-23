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
import styles from './zoneCss';
import {
	openModal,
	closeModal,
	setZone,
	blockZone,
	deleteZone,
} from '../../actions/zone/actionsCreators';
import {
	GET_ZONES,
	BLOCK_ZONE,
	DELETE_ZONE,
} from '../../queries/zone';
import { changePage } from '../../actions/userType/actionsCreators';
import Loading from '../Loading/loading';

const Zone = ({
	id,
	name,
	isOpen,
	classes,
	modalType,
	statusValue,
	currentPage,
	actionOpenModal,
	actionCloseModal,
	actionEditZone,
	paginationPage,
	actionBlockZone,
	actionDeleteZone,
	actionChangePage,
	blockZoneMutation,
	deleteZoneMutation,
}) => (
	<Query query={GET_ZONES} variables={{ paginationPage }}>
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
						<h3>
							Zonas
						</h3>
						<h5>
							<Link to='/Departments-create' href='/Departments-create'>
									Crear Zona
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
									{data.zoness.data.map(zone => (
										<TableRow key={zone.id}>
											<TableCell>{zone.name}</TableCell>
											<TableCell className={classes.alignRight}>
												<Tooltip
													enterDelay={200}
													id='tooltip-controlled'
													leaveDelay={100}
													placement='top'
													title='Editar Zona.'
												>
													<Link to='/Departments-edit' href='/Departments-edit'>
														<IconButton
															onClick={() => {
																actionEditZone(
																	zone.id,
																	zone.name,
																	zone.maxcapacity,
																	zone.capacity,
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
													title='Eliminar Zona'
												>
													<IconButton onClick={() => { actionOpenModal('delete', zone); }}>
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
														onClick={() => { actionOpenModal('block', zone); }}
														checked={zone.status.id === 2}
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
											count={data.zoness.total}
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
										¿Estas seguro que desea bloquear la zona {name}?
										</p>
									}
									{
										statusValue === 2 &&
										<p>
											¿Estas seguro que desea desbloquear la zona {name}?
										</p>
									}

									<span>
										<IconButton
											onClick={() => {
												actionBlockZone(
													id,
													statusValue,
													blockZoneMutation,
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
										¿Estas seguro que desea eliminar la zona {name} ?
									</p>
									<span>
										<IconButton onClick={() => {
											actionDeleteZone(id, statusValue, paginationPage, deleteZoneMutation);
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

Zone.propTypes = {
	name: PropTypes.string,
	isOpen: PropTypes.bool,
	modalType: PropTypes.string,
	statusValue: PropTypes.number,
	id: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionEditZone: PropTypes.func.isRequired,
	actionBlockZone: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionDeleteZone: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	blockZoneMutation: PropTypes.func.isRequired,
	deleteZoneMutation: PropTypes.func.isRequired,
};

Zone.defaultProps = {
	name: '',
	isOpen: false,
	modalType: '',
	statusValue: 0,
};

const mapStateToProps = state => ({
	id: state.ReducerZone.id,
	name: state.ReducerZone.name,
	isOpen: state.ReducerZone.isOpen,
	modalType: state.ReducerZone.modalType,
	statusValue: state.ReducerZone.statusValue,
	currentPage: state.ReducerZone.currentPage,
	paginationPage: state.ReducerZone.paginationPage,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionOpenModal: (modalType, _Zone) => dispatch(openModal(modalType, _Zone)),
	actionBlockZone: (id, statusValue, blockZoneMutation) =>
		dispatch(blockZone(id, statusValue, blockZoneMutation)),
	actionDeleteZone: (id, statusValue, paginationPage, deleteZoneMutation) =>
		dispatch(deleteZone(id, statusValue, paginationPage, deleteZoneMutation)),
	actionCloseModal: () => dispatch(closeModal()),
	actionEditZone: (
		id,
		name,
		maxcapacity,
		capacity,
	) => dispatch(setZone(id, name, maxcapacity, capacity)),
});

export default compose(
	graphql(DELETE_ZONE, { name: 'deleteZoneMutation' }),
	graphql(BLOCK_ZONE, { name: 'blockZoneMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Zone);
