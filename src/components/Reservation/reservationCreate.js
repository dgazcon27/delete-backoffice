import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
	compose,
	graphql,
	Query,
} from 'react-apollo';
import { Modal } from '@material-ui/core';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from 'material-ui/Menu/MenuItem';
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import styles from '../Shared/sharedStyles';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import {
	renderTextField,
	renderNumberField,
	renderSelectField,
	renderTextDefaultValueField,
} from '../RenderFields/renderFields';
import {
	GET_ROOMS,
	GET_HOTELS,
	CREATE_RESERVATION,
} from '../../queries/reservation';
import {
	getRooms,
	closeAlert,
	getUserByDNI,
	createReservation,
	setModal,
} from '../../actions/Reservation/actionsCreators';
import Loading from '../Loading/loading';
import Title from '../Shared/title';

const Room = ({
	event,
	hotel,
}) => (
	<Query query={GET_ROOMS} variables={{ event, hotel }}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='room'
						type='select'
						label='Habitación'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) {
				return ('Error!');
			}
			return (
				<Field
					name='room'
					type='select'
					label='Habitación'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.roomByHotelQuery.map(room => (
						<MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

Room.propTypes = {
	event: PropTypes.number.isRequired,
	hotel: PropTypes.number.isRequired,
};

const Hotel = ({
	event,
	actionGetRooms,
}) => (
	<Query query={GET_HOTELS} variables={{ event }}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='hotel'
						type='select'
						label='Hotel'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) {
				return ('Error!');
			}
			return (
				<Field
					name='hotel'
					type='select'
					label='Hotel'
					component={renderSelectField}
					validate={required}
					className='container'
					onChange={actionGetRooms}
				>
					{data.providerByEvent.map(hotel => (
						<MenuItem
							key={hotel.id}
							value={hotel.id}
						>
							{hotel.provider.name}
						</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

Hotel.propTypes = {
	event: PropTypes.number.isRequired,
	actionGetRooms: PropTypes.func.isRequired,
};

let ReservationCreate = ({
	name,
	hotel,
	open,
	load,
	isOpen,
	nameAccess,
	client,
	eventId,
	classes,
	lastName,
	myValues,
	alertOpen,
	alertType,
	submitting,
	handleSubmit,
	paginationPage,
	actionGetRooms,
	purchaseRequest,
	actionUserByDNI,
	actionCloseAlert,
	actionCloseModal,
	actionCreateReservation,
	createReservationMutation,
}) => (
	<div>
		{load &&
			<div>
				<Loading />
			</div>
		}
		{!load &&
			<div>
				<Title title='Nuevo Paquete' />
				<Paper className={classes.createContainer}>
					<form>
						<h6 className={classes.formTitle}>Nuevo Paquete</h6>
						<div className={classes.formStyle}>
							<Field
								name='client'
								type='text'
								component={renderTextField}
								validate={[required, empty]}
								label='Cliente'
								className={classes.inputSearch}
							/>
							<IconButton className={classes.formStyle3}>
								<Search onClick={(event) => {
									event.preventDefault(actionUserByDNI(myValues.client));
								}}
								/>
							</IconButton>
						</div>
						<div className={classes.formStyle}>
							<Field
								name='name'
								type='text'
								component={renderTextDefaultValueField}
								label='Nombre'
								className='yourclass'
								valor={`${name} ${lastName}`}
								disabled
							/>
						</div>
						<div className={classes.formStyle}>
							<Field
								name='nameAccess'
								type='text'
								component={renderTextDefaultValueField}
								label='Acceso comprado para el evento'
								className='yourclass'
								valor={`${nameAccess}`}
								disabled
							/>
						</div>
						<div className={classes.formStyle}>
							<Field
								name='comment'
								type='text'
								component={renderTextField}
								label='Comentario'
							/>
						</div>
						<div className={classes.formStyle}>
							<Field
								name='days'
								type='text'
								component={renderNumberField}
								validate={[required, empty]}
								label='Días'
								className='yourclass'
							/>
						</div>
						<div className={classes.formStyle}>
							<Field
								name='quantity'
								type='text'
								component={renderNumberField}
								validate={[required, empty]}
								label='Cantidad de Habitaciones'
								className='yourclass'
								valor
							/>
						</div>
						<div className={classes.formStyle}>
							<Hotel event={eventId} actionGetRooms={actionGetRooms} />
						</div>
						<div className={classes.formStyle}>
							<Room event={eventId} hotel={hotel} />
						</div>
						<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionCreateReservation(myValues.comment, client, purchaseRequest, myValues.room, myValues.days, myValues.quantity, paginationPage, createReservationMutation))} disabled={submitting} >
							Crear
						</button>
						<Link to='/reservation' className={classes.returnButton} >
							Regresar
						</Link>
					</form>
					<Modal
						open={isOpen}
						className={classNames(classes.modalOpenStyle)}
						hideBackdrop
						disableAutoFocus={false}
					>
						<div>
							{open === 'non_payment' &&
								<Paper className={classNames(classes.paperOnModal)}>
									<h6>
										Reservación
									</h6>
									<p>
										La cédula ingresada no tiene una compra registrada. ¿Desea agregar una compra?
									</p>
									<span>
										<Link to='/purchase-request-create'>
											<IconButton onClick={actionCloseModal}>
												Si
											</IconButton>
										</Link>
									</span>
									<span>
										<IconButton onClick={actionCloseModal}>
											No
										</IconButton>
									</span>
								</Paper>
							}
							{open === 'non_exist' &&
								<Paper className={classNames(classes.paperOnModal)}>
									<h6>
										Reservación
									</h6>
									<p>
										La cédula ingresada no se encuentra registrada. ¿Desea registrarla?
									</p>
									<span>
										<Link to='/users-create'>
											<IconButton onClick={actionCloseModal}>
												Si
											</IconButton>
										</Link>
									</span>
									<span>
										<IconButton onClick={actionCloseModal}>
											No
										</IconButton>
									</span>
								</Paper>
							}
						</div>
					</Modal>
				</Paper>
			</div>
		}
		{alertType === 'validation' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id='message-id'>La Reservación que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'creado' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>La Reservación fue creada con éxito.</span>}
		/>
		}
	</div>
);

ReservationCreate.propTypes = {
	name: PropTypes.string.isRequired,
	nameAccess: PropTypes.string.isRequired,
	open: PropTypes.string.isRequired,
	client: PropTypes.number.isRequired,
	hotel: PropTypes.number.isRequired,
	eventId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	load: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	myValues: PropTypes.object.isRequired,
	submitting: PropTypes.bool.isRequired,
	isOpen: PropTypes.bool.isRequired,
	lastName: PropTypes.string.isRequired,
	alertType: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	actionGetRooms: PropTypes.func.isRequired,
	actionUserByDNI: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	purchaseRequest: PropTypes.number.isRequired,
	actionCreateReservation: PropTypes.func.isRequired,
	createReservationMutation: PropTypes.func.isRequired,
};

ReservationCreate = reduxForm({
	form: 'ReservationCreate',
})(ReservationCreate);

const selector = formValueSelector('ReservationCreate');

const mapStateToProps = state => ({
	name: state.ReducerReservation.name,
	nameAccess: state.ReducerReservation.nameAccess,
	open: state.ReducerReservation.open,
	load: state.ReducerReservation.load,
	isOpen: state.ReducerReservation.isOpen,
	hotel: state.ReducerReservation.hotel,
	client: state.ReducerReservation.client,
	eventId: state.ReducerReservation.event,
	lastName: state.ReducerReservation.lastName,
	alertType: state.ReducerReservation.alertType,
	alertOpen: state.ReducerReservation.alertOpen,
	paginationPage: state.ReducerReservation.paginationPage,
	purchaseRequest: state.ReducerReservation.purchaseRequest,
	myValues: selector(state, 'client', 'purchaseRequest', 'comment', 'days', 'quantity', 'room', 'nameAccess'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionUserByDNI: client => dispatch(getUserByDNI(parseInt(client, 10))),
	actionGetRooms: value => dispatch(getRooms(value.target.value)),
	actionCloseModal: () => dispatch(setModal('', false)),
	actionCreateReservation: (
		comment,
		client,
		purchaseRequest,
		room,
		days,
		quantity,
		paginationPage,
		createReservationMutation,
	) => dispatch(createReservation(
		comment,
		client,
		purchaseRequest,
		room,
		days,
		quantity,
		paginationPage,
		createReservationMutation,
	)),
});

export default compose(
	graphql(CREATE_RESERVATION, { name: 'createReservationMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ReservationCreate);
