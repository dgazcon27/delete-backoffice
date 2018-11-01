import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	compose,
	graphql,
	Query,
} from 'react-apollo';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from 'material-ui/Menu/MenuItem';
import styles from './reservationCss';
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
} from '../../actions/Reservation/actionsCreators';

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
							key={hotel.provider.id}
							value={hotel.provider.id}
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
	actionCreateReservation,
	createReservationMutation,
}) => (
	<div>
		<h3 className={classes.formTitle}>Nueva Reservación</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nueva Reservación</h6>
				<div className={classes.formStyle}>
					<Field
						name='client'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Cliente'
						className='yourclass'
					/>
				</div>
				<button onClick={(event) => { event.preventDefault(actionUserByDNI(myValues.client)); }} >
					lupita
				</button>
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
						name='purchaseRequest'
						type='text'
						component={renderTextDefaultValueField}
						label='Compra'
						className='yourclass'
						valor={purchaseRequest}
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='comment'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
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
						label='Cantidad'
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
				<Link to='/reservation' href='/reservation' className={classes.returnButton} >
					Regresar
				</Link>
			</form>
		</Paper>
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
	hotel: PropTypes.number.isRequired,
	client: PropTypes.number.isRequired,
	eventId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	myValues: PropTypes.object.isRequired,
	submitting: PropTypes.bool.isRequired,
	lastName: PropTypes.string.isRequired,
	alertType: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	actionGetRooms: PropTypes.func.isRequired,
	actionUserByDNI: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
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
	hotel: state.ReducerReservation.hotel,
	client: state.ReducerReservation.client,
	eventId: state.ReducerReservation.event,
	lastName: state.ReducerReservation.lastName,
	alertType: state.ReducerReservation.alertType,
	alertOpen: state.ReducerReservation.alertOpen,
	paginationPage: state.ReducerReservation.paginationPage,
	purchaseRequest: state.ReducerReservation.purchaseRequest,
	myValues: selector(state, 'client', 'purchaseRequest', 'comment', 'days', 'quantity', 'room'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionUserByDNI: client => dispatch(getUserByDNI(parseInt(client, 10))),
	actionGetRooms: value => dispatch(getRooms(value.target.value)),
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
