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
import Radio from 'material-ui/Radio/Radio';
import MenuItem from 'material-ui/Menu/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import RadioGroup from 'material-ui/Radio/RadioGroup';
import FormControlLabel from 'material-ui/Form/FormControlLabel';
import styles from './userTypeCss';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import {
	renderTextField,
	renderNumberField,
	renderSelectField,
	renderNumbValDefaultField,
} from '../RenderFields/renderFields';
import {
	GET_ROOMS,
	GET_HOTELS,
	EDIT_ACCESS_EVENT,
} from '../../queries/event';
import {
	getRooms,
	closeAlert,
	setWithRooms,
	setWithTickets,
	editAccessEvent,
} from '../../actions/Event/Access/actionsCreators';

import { Access } from '../commonComponent';

const Hotels = ({
	event,
	actionGetRoom,
}) => (
	<Query query={GET_HOTELS} variables={{ event }}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='hotelE'
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
					name='hotelE'
					type='select'
					label='Hotel'
					component={renderSelectField}
					validate={required}
					className='container'
					onChange={actionGetRoom}
					algo={null}
				>
					{data.providerByEvent.map(hotel => (
						<MenuItem key={hotel.id} value={hotel.id}>{hotel.provider.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

Hotels.propTypes = {
	event: PropTypes.number.isRequired,
	actionGetRoom: PropTypes.func.isRequired,
};

const Rooms = ({
	hotel,
	event,
}) => (
	<Query query={GET_ROOMS} variables={{ hotel, event }}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='roomE'
						type='select'
						label='Habitaciones'
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
					name='roomE'
					type='select'
					label='Habitaciones'
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

Rooms.propTypes = {
	hotel: PropTypes.number.isRequired,
	event: PropTypes.number.isRequired,
};

let AccessEventEdit = ({
	id,
	event,
	hotel,
	classes,
	myValues,
	withRoom,
	alertOpen,
	alertType,
	submitting,
	withTickets,
	handleSubmit,
	actionGetRoom,
	paginationPage,
	actionChangeRoom,
	actionCloseAlert,
	actionChangeTicket,
	actionEditAccessEvent,
	editAccessEventMutation,
}) => (
	<div>
		<h3 className={classes.formTitle}>Evento/Acceso</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar Evento/Acceso</h6>
				<div className={classes.formStyle}>
					<Access />
				</div>
				<div className={classes.formStyle}>
					<Field
						name='price'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Precio'
						className='yourclass'
					/>
				</div>
				<RadioGroup
					aria-label='withTickets'
					name='with_tickets'
					className={classes.group}
					value={withTickets}
					onChange={actionChangeTicket}
				>
					<FormControlLabel value='true' control={<Radio />} label='Con Tickets' />
					<FormControlLabel value='false' control={<Radio />} label='Sin Tickets' />
				</RadioGroup>
				{ withTickets === 'true' &&
				<div className={classes.formStyle}>
					<Field
						name='numberTickets'
						type='text'
						component={renderNumberField}
						validate={[required]}
						label='Número de Entradas'
						className='yourclass'
						disabled={false}
					/>
				</div>
				}
				{ withTickets === 'false' &&
				<div className={classes.formStyle}>
					<Field
						name='numberTickets'
						type='text'
						component={renderNumbValDefaultField}
						label='Número de Tickets'
						className='yourclass'
						disabled
						valor={0}
					/>
				</div>
				}
				<RadioGroup
					aria-label='withRooms'
					name='withRoom'
					className={classes.group}
					value={withRoom}
					onChange={actionChangeRoom}
				>
					<FormControlLabel value='true' control={<Radio />} label='Con Habitaciones' />
					<FormControlLabel value='false' control={<Radio />} label='Sin Habitaciones' />
				</RadioGroup>
				{ withRoom === 'true' &&
					<div className={classes.formStyle}>
						<Field
							name='numberRooms'
							type='text'
							component={renderNumberField}
							validate={[required]}
							label='Número de Tickets'
							className='yourclass'
							disabled={false}
						/>
					</div>
				}
				{ withRoom === 'false' &&
					<div className={classes.formStyle}>
						<Field
							name='numberRooms'
							type='text'
							component={renderNumbValDefaultField}
							label='Número de Habitaciones'
							className='yourclass'
							disabled
							valor={0}
						/>
					</div>
				}
				{ withRoom === 'true' &&
					<div className={classes.formStyle}>
						<Hotels event={event} actionGetRoom={actionGetRoom} />
					</div>
				}

				{ withRoom === 'true' &&
					<div className={classes.formStyle}>
						<Rooms hotel={hotel} event={event} />
					</div>
				}
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditAccessEvent(id, withRoom, withTickets, myValues.numberRooms, myValues.numberTickets, myValues.price, event, myValues.access, myValues.hotelE, myValues.roomE, paginationPage, editAccessEventMutation))} disabled={submitting} >
					Guardar
				</button>
				<Link to='/event-access' href='/event-access' className={classes.returnButton} >
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
			message={<span id='message-id'>El Acceso que intenta agregar ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'creado' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>El Acceso fue editado con éxito.</span>}
		/>
		}
	</div>
);

AccessEventEdit.propTypes = {
	id: PropTypes.number.isRequired,
	hotel: PropTypes.number.isRequired,
	event: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	submitting: PropTypes.bool.isRequired,
	myValues: PropTypes.object.isRequired,
	withRoom: PropTypes.string.isRequired,
	alertType: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	withTickets: PropTypes.string.isRequired,
	actionGetRoom: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionChangeRoom: PropTypes.func.isRequired,
	actionChangeTicket: PropTypes.func.isRequired,
	actionEditAccessEvent: PropTypes.func.isRequired,
	editAccessEventMutation: PropTypes.func.isRequired,
};

AccessEventEdit = reduxForm({
	form: 'AccessEventEdit',
})(AccessEventEdit);

const selector = formValueSelector('AccessEventEdit');

const mapStateToProps = state => ({
	id: state.ReducerEvent.id,
	hotel: state.ReducerEventAccess.hotel,
	event: state.ReducerEventAccess.event,
	initialValues: state.ReducerEventAccess,
	withRoom: state.ReducerEventAccess.withRoom,
	alertType: state.ReducerEventAccess.alertType,
	alertOpen: state.ReducerEventAccess.alertOpen,
	withTickets: state.ReducerEventAccess.withTickets,
	paginationPage: state.ReducerEventAccess.paginationPage,
	myValues: selector(state, 'withRoom', 'withTickets', 'numberRooms', 'numberTickets', 'price', 'access', 'hotelE', 'roomE'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionGetRoom: value => dispatch(getRooms(value.target.value)),
	actionChangeRoom: value => dispatch(setWithRooms(value.target.value)),
	actionChangeTicket: value => dispatch(setWithTickets(value.target.value)),
	actionEditAccessEvent: (
		id,
		withRoom,
		withTickets,
		numberRooms,
		numberTickets,
		price,
		event,
		access,
		hotel,
		room,
		paginationPage,
		editAccessEventMutation,
	) => dispatch(editAccessEvent(
		id,
		withRoom,
		withTickets,
		numberRooms,
		numberTickets,
		price,
		event,
		access,
		hotel,
		room,
		paginationPage,
		editAccessEventMutation,
	)),
});

export default compose(
	graphql(EDIT_ACCESS_EVENT, { name: 'editAccessEventMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(AccessEventEdit);
