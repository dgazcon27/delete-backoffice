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
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import {
	Modal,
	Switch,
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

import styles from './userTypeCss';
import {
	changePage,
	openModal,
	closeModal,
	blockHotel,
	deleteHotel,
} from '../../actions/Hotel/actionsCreators';

import {
	GET_HOTELS,
	BLOCK_HOTEL,
	DELETE_HOTEL,
} from '../../queries/hotels';

import Loading from '../Loading/loading';

const Hotel = ({
	id,
	isOpen,
	classes,
	modalType,
	currentPage,
	statusValue,
	paginationPage,
	actionOpenModal,
	actionCloseModal,
	actionChangePage,
	actionBlockHotel,
	blockHotelMutation,
	actionDeleteHotel,
	deleteHotelMutation,
}) => (
	<Query query={GET_HOTELS} variables={{ paginationPage }}>
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
						Hotel
						</h5>
						<h5 className={classes.searchAlignRigth}>
							<Link to='/hotel-create' href='/hotel-create' >
								<Button variant='extendedFab' aria-label='Delete' className={classes.addNew}>
									<Add className={classes.marginIcon} />
									Agregar Nuevo
								</Button>
							</Link>
						</h5>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Proveedor </TableCell>
										<TableCell>Evento</TableCell>
										<TableCell className={classes.alignRightOption} >Opciones</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										data.hotelss.data.map(hotel => (
											<TableRow key={hotel.id}>
												<TableCell >{`${hotel.provider.name}`}</TableCell>
												<TableCell >{hotel.event.name}</TableCell>
												<TableCell className={classes.alignRight}>

													<Tooltip
														enterDelay={200}
														id='tooltip-controlled'
														leaveDelay={100}
														placement='top'
														title='Bloquear / Desbloquear'
													>
														<Switch
															onClick={() => { actionOpenModal('block', hotel); }}
															checked={hotel.active === false}
															value='checked'
														/>
													</Tooltip>
													<Link to={{ pathname: `/hotel-edit/${hotel.id}` }}>
														<IconButton>
															<Edit />
														</IconButton>
													</Link>
													<Tooltip
														enterDelay={200}
														id='tooltip-controlled'
														leaveDelay={100}
														placement='top'
														title='Eliminar purchaseReq'
													>
														<IconButton onClick={() => { actionOpenModal('delete', hotel); }}>
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
											count={data.hotelss.total}
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
						onBackdropClick={() => actionCloseModal()}
						disableAutoFocus={false}
					>
						<div>
							{modalType === 'block' &&
							<Paper className={classNames(classes.paperOnModal)}>
								{statusValue && <h6> Bloquear Hotel </h6>}
								{!statusValue && <h6> Desbloquear Hotel </h6>}
								{
									statusValue &&
									<p>
											¿Estas seguro que desea bloquear el Hotel?
									</p>
								}
								{
									!statusValue &&
									<p>
												¿Estas seguro que desea desbloquear el Hotel?
									</p>
								}

								<span>
									<IconButton
										onClick={() => {
											actionBlockHotel(
												id,
												statusValue,
												blockHotelMutation,
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
									Eliminar Compra
								</h6>
								<p>
									¿Estas seguro que desea eliminar esta compra?
								</p>
								<span>
									<IconButton onClick={() => {
										actionDeleteHotel(id, paginationPage, deleteHotelMutation);
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

Hotel.propTypes = {
	isOpen: PropTypes.bool,
	statusValue: PropTypes.bool,
	modalType: PropTypes.string,
	id: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	actionOpenModal: PropTypes.func.isRequired,
	actionDeleteHotel: PropTypes.func.isRequired,
	actionBlockHotel: PropTypes.func.isRequired,
	blockHotelMutation: PropTypes.func.isRequired,
	deleteHotelMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	actionChangePage: PropTypes.func.isRequired,
};

Hotel.defaultProps = {
	isOpen: false,
	modalType: '',
	statusValue: false,
};

const mapStateToProps = state => ({
	currency: state.ReducerHotel.currency,
	statusValue: state.ReducerHotel.statusValue,
	id: state.ReducerHotel.id,
	isOpen: state.ReducerHotel.isOpen,
	modalType: state.ReducerHotel.modalType,
	currentPage: state.ReducerHotel.currentPagePreq,
	paginationPage: state.ReducerHotel.paginationPage,
	initialValues: state.ReducerHotel,
	userId: state.ReducerLogin.userId,
});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionOpenModal: (modalType, hotel) => dispatch(openModal(modalType, hotel)),
	actionCloseModal: () => dispatch(closeModal()),
	actionBlockHotel: (id, statusValue, blockHotelMutation) =>
		dispatch(blockHotel(id, statusValue, blockHotelMutation)),
	actionDeleteHotel: (id, paginationPage, deleteHotelMutation) =>
		dispatch(deleteHotel(id, paginationPage, deleteHotelMutation)),

});

export { Hotel as PurchaseRequestTest };

export default compose(
	graphql(DELETE_HOTEL, { name: 'deleteHotelMutation' }),
	graphql(BLOCK_HOTEL, { name: 'blockHotelMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Hotel);
