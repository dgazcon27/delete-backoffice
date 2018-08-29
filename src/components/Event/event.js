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
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import {
	Modal,
	Paper,
	Table,
	// Switch,
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
	openModal,
	closeModal,
	deleteEvent,
	setEvent,
} from '../../actions/Event/actionsCreators';

import {
	GET_EVENTS,
	DELETE_EVENT,
} from '../../queries/event';

import Loading from '../Loading/loading';

const Event = ({
	id,
	name,
	paginationPage,
	classes,
	currentPage,
	actionChangePage,
	actionCloseModal,
	deleteEventMutation,
	actionDeleteEvent,
	actionOpenModal,
	isOpen,
	modalType,
	actionSetEvent,
}) => (
	<Query query={GET_EVENTS} variables={{ paginationPage }}>
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
						<h5 className={classes.title}>
							Evento
						</h5>
						<div className={classes.search}>
							<h5 className={classes.searchAlignRigth}>
								<Link to='/events-create' href='/events-create' >
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
										<TableCell>Ubicación</TableCell>
										<TableCell className={classes.alignRightOption}>Opciones</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										data.events.data.map(event => (
											<TableRow key={event.id}>
												<TableCell >{event.name}</TableCell>
												<TableCell >{event.state.name}</TableCell>
												<TableCell className={classes.alignRight}>
													<Tooltip
														enterDelay={200}
														id='tooltip-controlled'
														leaveDelay={100}
														placement='top'
														title='Editar evento.'
													>
														<Link to='/event-edit' href='/event-edit'>
															<IconButton
																onClick={() => {
																	actionSetEvent(event);
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
														title='Eliminar evento'
													>
														<IconButton onClick={() => {
															actionOpenModal('delete', event);
														}}
														>
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
										<TablePagination
											count={data.events.total}
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
							{modalType === 'delete' &&
								<Paper className={classNames(classes.paperOnModal)}>
									<h6>
										Eliminar bank
									</h6>
									<p>
										¿Estas seguro que desea eliminar el evento {name} ?
									</p>
									<span>
										<IconButton onClick={() => {
											actionDeleteEvent(id, paginationPage, deleteEventMutation);
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


Event.propTypes = {
	name: PropTypes.string,
	paginationPage: PropTypes.number.isRequired,
	isOpen: PropTypes.bool,
	classes: PropTypes.object.isRequired,
	modalType: PropTypes.string,
	id: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionSetEvent: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	actionDeleteEvent: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	deleteEventMutation: PropTypes.func.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
};


Event.defaultProps = {
	name: '',
	isOpen: false,
	modalType: '',
};

const mapStateToProps = state => ({
	id: state.ReducerEvent.id,
	name: state.ReducerEvent.name,
	modalType: state.ReducerEvent.modalType,
	paginationPage: state.ReducerEvent.paginationPage,
	currentPage: state.ReducerEvent.currentPage,
	isOpen: state.ReducerEvent.isOpen,
});


const mapDispatchToProps = dispatch => ({
	actionDeleteEvent: (id, paginationPage, deleteEventMutation) =>
		dispatch(deleteEvent(id, paginationPage, deleteEventMutation)),
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionOpenModal: (modalType, event) => dispatch(openModal(modalType, event)),
	actionCloseModal: () => dispatch(closeModal()),
	actionSetEvent: event =>
		dispatch(setEvent(event)),
});

export { Event as EventTest };

export default compose(
	graphql(DELETE_EVENT, { name: 'deleteEventMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Event);
