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
import Payment from '@material-ui/icons/Payment';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Visibility from '@material-ui/icons/Visibility';
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
import styles from './reservationCss';
import {
	openModal,
	closeModal,
	setReservation,
	deleteReservation,
	changePage,
} from '../../actions/Reservation/actionsCreators';
import {
	GET_RESERVATIONS,
	DELETE_RESERVATION,
} from '../../queries/reservation';
import Loading from '../Loading/loading';

const Reservation = ({
	id,
	isOpen,
	classes,
	modalType,
	statusValue,
	currentPage,
	actionOpenModal,
	actionCloseModal,
	actionEditReservation,
	paginationPage,
	actionDeleteReservation,
	actionChangePage,
	deleteReservationMutation,
}) => (
	<Query query={GET_RESERVATIONS} variables={{ paginationPage }}>
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
							Paquetes
						</h5>
						<div className={classes.search}>
							<h5 className={classes.searchAlignRigth}>
								<Link to='/reservation-create' href='/reservation-create' >
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
										<TableCell>Cliente</TableCell>
										<TableCell>Pendiente por pagar</TableCell>
										<TableCell>Habitación</TableCell>
										<TableCell>Días</TableCell>
										<TableCell>Cantidad</TableCell>
										<TableCell className={classes.alignRightOption}>
												Opciones
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data.reservations.data.map(reservation => (
										<TableRow key={reservation.id}>
											<TableCell>
												{reservation.client.name} {reservation.client.lastName}
											</TableCell>
											<TableCell>{reservation.pendingPayment}</TableCell>
											<TableCell>{reservation.room.name}</TableCell>
											<TableCell>{reservation.days}</TableCell>
											<TableCell>{reservation.quantity}</TableCell>
											<TableCell className={classes.alignRight}>
												<Tooltip
													enterDelay={200}
													id='tooltip-controlled'
													leaveDelay={100}
													placement='top'
													title='Ver reservación'
												>
													<Link to={`/reservation-edit/${reservation.id}`}>
														<IconButton>
															<Visibility />
														</IconButton>
													</Link>
												</Tooltip>
												<Tooltip
													enterDelay={200}
													id='tooltip-controlled'
													leaveDelay={100}
													placement='top'
													title='Realizar Pago'
												>
													<Link to='/reservation-payment' href='/reservation-payment'>
														<IconButton
															onClick={() => {
																actionEditReservation(reservation);
															}}
														>
															<Payment />
														</IconButton>
													</Link>
												</Tooltip>
												<Tooltip
													enterDelay={200}
													id='tooltip-controlled'
													leaveDelay={100}
													placement='top'
													title='Eliminar Reservación'
												>
													<IconButton onClick={() => { actionOpenModal('delete', reservation); }}>
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
											count={data.reservations.total}
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
										Eliminar Reservación
									</h6>
									<p>
										¿Estas seguro que desea eliminar la reservación {id} ?
									</p>
									<span>
										<IconButton
											onClick={() => {
												actionDeleteReservation(
													id,
													statusValue,
													paginationPage,
													deleteReservationMutation,
												);
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

Reservation.propTypes = {
	isOpen: PropTypes.bool,
	modalType: PropTypes.string,
	statusValue: PropTypes.number,
	id: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionEditReservation: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionDeleteReservation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	deleteReservationMutation: PropTypes.func.isRequired,
};

Reservation.defaultProps = {
	isOpen: false,
	modalType: '',
	statusValue: 0,
};

const mapStateToProps = state => ({
	id: state.ReducerReservation.id,
	isOpen: state.ReducerReservation.isOpen,
	modalType: state.ReducerReservation.modalType,
	statusValue: state.ReducerReservation.statusValue,
	currentPage: state.ReducerReservation.currentPage,
	paginationPage: state.ReducerReservation.paginationPage,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionOpenModal: (modalType, _reservation) => dispatch(openModal(modalType, _reservation)),
	actionDeleteReservation: (id, statusValue, paginationPage, deleteReservationMutation) =>
		dispatch(deleteReservation(id, statusValue, paginationPage, deleteReservationMutation)),
	actionCloseModal: () => dispatch(closeModal()),
	actionEditReservation: reservation => dispatch(setReservation(reservation)),
});

export default compose(
	graphql(DELETE_RESERVATION, { name: 'deleteReservationMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Reservation);
