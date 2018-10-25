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
} from '../RenderFields/renderFields';
import {
	GET_ROOMS,
	GET_HOTELS,
	EDIT_RESERVATION,
} from '../../queries/reservation';
import {
	getRooms,
	closeAlert,
	editReservation,
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

let ReservationEdit = ({
	name,
	hotel,
	event,
	client,
	classes,
	lastName,
	myValues,
	alertOpen,
	alertType,
	submitting,
	handleSubmit,
	reservationId,
	paginationPage,
	actionGetRooms,
	purchaseRequest,
	actionCloseAlert,
	actionEditReservation,
	editReservationMutation,
}) => (
	<div>
		<h3 className={classes.formTitle}>Editar Reservación</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar Reservación</h6>
				<div className={classes.formStyle}>
					<Field
						name='client'
						type='text'
						component={renderTextField}
						validate={[required]}
						label='Cliente'
						className='yourclass'
						disabled
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='name'
						type='text'
						component={renderTextField}
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
						component={renderTextField}
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
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='days'
						type='text'
						component={renderNumberField}
						validate={[required]}
						label='Días'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='quantity'
						type='text'
						component={renderNumberField}
						validate={[required]}
						label='Cantidad'
						className='yourclass'
						valor
					/>
				</div>
				<div className={classes.formStyle}>
					<Hotel event={event} actionGetRooms={actionGetRooms} />
				</div>
				<div className={classes.formStyle}>
					<Room event={event} hotel={hotel} />
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditReservation(reservationId, myValues.comment, client, purchaseRequest, myValues.room, myValues.days, myValues.quantity, paginationPage, editReservationMutation))} disabled={submitting} >
					Guardar
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
		{alertType === 'edit' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>La Reservación fue editada con éxito.</span>}
		/>
		}
	</div>
);

ReservationEdit.propTypes = {
	name: PropTypes.string.isRequired,
	hotel: PropTypes.number.isRequired,
	event: PropTypes.number.isRequired,
	client: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	myValues: PropTypes.object.isRequired,
	submitting: PropTypes.bool.isRequired,
	lastName: PropTypes.string.isRequired,
	alertType: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	actionGetRooms: PropTypes.func.isRequired,
	reservationId: PropTypes.number.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	purchaseRequest: PropTypes.number.isRequired,
	actionEditReservation: PropTypes.func.isRequired,
	editReservationMutation: PropTypes.func.isRequired,
};

ReservationEdit = reduxForm({
	form: 'ReservationEdit',
})(ReservationEdit);

const selector = formValueSelector('ReservationEdit');

const mapStateToProps = state => ({
	name: state.ReducerReservation.name,
	hotel: state.ReducerReservation.hotel,
	event: state.ReducerReservation.event,
	client: state.ReducerReservation.client,
	initialValues: state.ReducerReservation,
	reservationId: state.ReducerReservation.id,
	lastName: state.ReducerReservation.lastName,
	alertType: state.ReducerReservation.alertType,
	alertOpen: state.ReducerReservation.alertOpen,
	paginationPage: state.ReducerReservation.paginationPage,
	purchaseRequest: state.ReducerReservation.purchaseRequest,
	myValues: selector(state, 'client', 'purchaseRequest', 'comment', 'days', 'quantity', 'room'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionGetRooms: value => dispatch(getRooms(value.target.value)),
	actionEditReservation: (
		id,
		comment,
		client,
		purchaseRequest,
		room,
		days,
		quantity,
		paginationPage,
		editReservationMutation,
	) => dispatch(editReservation(
		id,
		comment,
		client,
		purchaseRequest,
		room,
		days,
		quantity,
		paginationPage,
		editReservationMutation,
	)),
});

export default compose(
	graphql(EDIT_RESERVATION, { name: 'editReservationMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ReservationEdit);
