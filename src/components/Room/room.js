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
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import styles from './roomCss';
import {
	openModal,
	closeModal,
	setRoom,
	blockRoom,
	deleteRoom,
	changePage,
} from '../../actions/Room/actionsCreators';
import {
	GET_ROOMS,
	BLOCK_ROOM,
	DELETE_ROOM,
} from '../../queries/room';
import Loading from '../Loading/loading';

const Room = ({
	id,
	name,
	isOpen,
	classes,
	modalType,
	statusValue,
	currentPage,
	actionOpenModal,
	actionCloseModal,
	actionEditRoom,
	paginationPage,
	actionBlockRoom,
	actionDeleteRoom,
	actionChangePage,
	blockRoomMutation,
	deleteRoomMutation,
}) => (
	<Query query={GET_ROOMS} variables={{ paginationPage }}>
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
						<h5>
							Habitaciones
						</h5>
						<div className={classes.search}>
							<h5 className={classes.searchAlignRigth}>
								<Link to='/room-create' href='/room-create' >
									<Button variant='extendedFab' aria-label='Delete' className={classes.addNew}>
										<Add className={classes.marginIcon} />
										Agregar Nuevo
									</Button>
								</Link>
							</h5>
						</div>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Nombre</TableCell>
										<TableCell>Tipo</TableCell>
										<TableCell>Capacidad</TableCell>
										<TableCell>Hotel</TableCell>
										<TableCell>Evento</TableCell>
										<TableCell className={classes.alignRightOption}>
												Opciones
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data.rooms.data.map(room => (
										<TableRow key={room.id}>
											<TableCell>{room.name}</TableCell>
											<TableCell>{room.type}</TableCell>
											<TableCell>{room.capacity}</TableCell>
											<TableCell>{room.hotel.provider.name}</TableCell>
											<TableCell>{room.event.name}</TableCell>
											<TableCell className={classes.alignRight}>
												<Tooltip
													enterDelay={200}
													id='tooltip-controlled'
													leaveDelay={100}
													placement='top'
													title='Editar Pago'
												>
													<Link to='/room-edit' href='/room-edit'>
														<IconButton
															onClick={() => { actionEditRoom(room); }}
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
													<IconButton onClick={() => { actionOpenModal('delete', room); }}>
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
														onClick={() => { actionOpenModal('block', room); }}
														checked={!room.active}
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
											count={data.rooms.total}
											rowsPerPage={10}
											page={paginationPage}
											rowsPerPageOptions={[10]}
											colSpan={6}
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
						disableAutoFocus={false}
						onBackdropClick={() => actionCloseModal()}
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
										Eliminar Habitación
									</h6>
									<p>
										¿Estas seguro que desea eliminar la Habitación {name}?
									</p>
									<span>
										<IconButton onClick={() => {
											actionDeleteRoom(id, statusValue, paginationPage, deleteRoomMutation);
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
									{statusValue === 1 && <h6> Bloquear Habitación </h6>}
									{statusValue === 2 && <h6> Desbloquear Habitación </h6>}
									{
										statusValue === 1 &&
										<p>
											¿Estas seguro que desea bloquear la Habitación {name}?
										</p>
									}
									{
										statusValue === 2 &&
										<p>
										¿Estas seguro que desea desbloquear la Habitación {name}?
										</p>
									}

									<span>
										<IconButton
											onClick={() => {
												actionBlockRoom(
													id,
													statusValue,
													paginationPage,
													blockRoomMutation,
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

Room.propTypes = {
	isOpen: PropTypes.bool,
	modalType: PropTypes.string,
	statusValue: PropTypes.number,
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionEditRoom: PropTypes.func.isRequired,
	actionBlockRoom: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionDeleteRoom: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	blockRoomMutation: PropTypes.func.isRequired,
	deleteRoomMutation: PropTypes.func.isRequired,
};

Room.defaultProps = {
	isOpen: false,
	modalType: '',
	statusValue: 0,
};

const mapStateToProps = state => ({
	id: state.ReducerRoom.id,
	name: state.ReducerRoom.name,
	isOpen: state.ReducerRoom.isOpen,
	modalType: state.ReducerRoom.modalType,
	statusValue: state.ReducerRoom.statusValue,
	currentPage: state.ReducerRoom.currentPage,
	paginationPage: state.ReducerRoom.paginationPage,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionOpenModal: (modalType, _Room) => dispatch(openModal(modalType, _Room)),
	actionDeleteRoom: (id, statusValue, paginationPage, deleteRoomMutation) =>
		dispatch(deleteRoom(id, statusValue, paginationPage, deleteRoomMutation)),
	actionCloseModal: () => dispatch(closeModal()),
	actionEditRoom: room => dispatch(setRoom(room)),
	actionBlockRoom: (
		id,
		statusValue,
		paginationPage,
		blockRoomMutation,
	) => dispatch(blockRoom(id, statusValue, paginationPage, blockRoomMutation)),
});

export default compose(
	graphql(DELETE_ROOM, { name: 'deleteRoomMutation' }),
	graphql(BLOCK_ROOM, { name: 'blockRoomMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Room);
