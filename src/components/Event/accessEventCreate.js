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
	CREATE_ACCESS_EVENT,
} from '../../queries/event';
import {
	getRooms,
	closeAlert,
	setWithRooms,
	setWithTickets,
	createAccessEvent,
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
					onChange={actionGetRoom}
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
						name='room'
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
					name='room'
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

let AccessEventCreate = ({
	event,
	hotel,
	classes,
	withRoom,
	myValues,
	alertOpen,
	alertType,
	withTickets,
	submitting,
	handleSubmit,
	actionGetRoom,
	paginationPage,
	actionChangeRoom,
	actionCloseAlert,
	actionChangeTicket,
	actionCreateAccessEvent,
	createAccessEventMutation,
}) => (
	<div>
		<h3 className={classes.formTitle}>Evento/Acceso</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nuevo Evento/Acceso</h6>
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
					<FormControlLabel value='true' control={<Radio />} label='Con Entradas' />
					<FormControlLabel value='false' control={<Radio />} label='Sin Entradas' />
				</RadioGroup>
				{ withTickets === 'true' &&
				<div className={classes.formStyle}>
					<Field
						name='numberTickets'
						component={renderNumberField}
						validate={[required]}
						label='Número de Tickets'
						className='yourclass'
						disabled={false}
						valor={1}
					/>
				</div>
				}
				{ withTickets === 'false' &&
				<div className={classes.formStyle}>
					<Field
						name='numberTickets'
						component={renderNumbValDefaultField}
						label='Número de Entradas'
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
							label='Número de Entradas'
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
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionCreateAccessEvent(withRoom, withTickets, myValues.numberRooms, myValues.numberTickets, myValues.price, event, myValues.access, myValues.hotel, myValues.room, paginationPage, createAccessEventMutation))} disabled={submitting} >
					Agregar
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
			message={<span id='message-id'>El Acceso fue agredado con éxito.</span>}
		/>
		}
	</div>
);

AccessEventCreate.propTypes = {
	hotel: PropTypes.number.isRequired,
	event: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	withRoom: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	submitting: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	withTickets: PropTypes.string.isRequired,
	actionGetRoom: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionChangeRoom: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionChangeTicket: PropTypes.func.isRequired,
	actionCreateAccessEvent: PropTypes.func.isRequired,
	createAccessEventMutation: PropTypes.func.isRequired,
};

AccessEventCreate.defaultProps = {
	withRoom: 'true',
	withTickets: 'true',
};

AccessEventCreate = reduxForm({
	form: 'AccessEventCreate',
})(AccessEventCreate);

const selector = formValueSelector('AccessEventCreate');

const mapStateToProps = state => ({
	hotel: state.ReducerEventAccess.hotel,
	event: state.ReducerEventAccess.event,
	withRoom: state.ReducerEventAccess.withRoom,
	alertType: state.ReducerEventAccess.alertType,
	alertOpen: state.ReducerEventAccess.alertOpen,
	withTickets: state.ReducerEventAccess.withTickets,
	paginationPage: state.ReducerEventAccess.paginationPage,
	myValues: selector(state, 'withRoom', 'withTickets', 'numberRooms', 'numberTickets', 'price', 'access', 'hotel', 'room'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionGetRoom: value => dispatch(getRooms(value.target.value)),
	actionChangeRoom: value => dispatch(setWithRooms(value.target.value)),
	actionChangeTicket: value => dispatch(setWithTickets(value.target.value)),
	actionCreateAccessEvent: (
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
		createAccessEventMutation,
	) => dispatch(createAccessEvent(
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
		createAccessEventMutation,
	)),
});

export default compose(
	graphql(CREATE_ACCESS_EVENT, { name: 'createAccessEventMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(AccessEventCreate);
