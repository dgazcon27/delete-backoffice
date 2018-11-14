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
import styles from '../Shared/sharedStyles';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import {
	renderDateField,
	renderTextField,
	renderNumberField,
	renderSelectField,
	renderDateMaxField,
} from '../RenderFields/renderFields';
import { CREATE_ROOM } from '../../queries/room';
import { GET_HOTELS } from '../../queries/event';
import { GET_EVENTSS } from '../../queries/common';
import {
	closeAlert,
	createRoom,
	getHotels,
} from '../../actions/Room/actionsCreators';
import BackButton from '../widget/BackButton';

const validate = (values) => {
	const errors = {};
	const startNumbering = new Date(values.startNumbering);
	const endNumbering = new Date(values.endNumbering);

	if (startNumbering.getTime() <= endNumbering.getTime()) {
		errors.endNumbering = false;
	} else {
		errors.endNumbering = true;
	}
	return errors;
};

const warn = (values) => {
	const warnings = {};
	const startNumbering = new Date(values.startNumbering);
	const endNumbering = new Date(values.endNumbering);

	if ((startNumbering.getTime() <= endNumbering.getTime()) ||
		((values.endNumbering === undefined) && values.startNumbering === undefined)) {
		warnings.endNumbering = 'Este campo es obligatorio';
	} else if (values.endNumbering === undefined) {
		warnings.endNumbering = 'Este campo es obligatorio';
	} else {
		warnings.endNumbering = 'La fecha deber mayor a la fecha de Inicio';
	}
	return warnings;
};

const Events = ({
	actionGetHotels,
}) => (
	<Query query={GET_EVENTSS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='event'
						type='select'
						label='Eventos'
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
					name='event'
					type='select'
					label='Eventos'
					component={renderSelectField}
					validate={required}
					className='container'
					onChange={actionGetHotels}
				>
					{data.eventss.map(event => (
						<MenuItem key={event.id} value={event.id}>{event.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

Events.propTypes = {
	actionGetHotels: PropTypes.func.isRequired,
};

const Hotels = ({
	event,
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
};

let RoomCreate = ({
	event,
	classes,
	myValues,
	alertOpen,
	alertType,
	submitting,
	handleSubmit,
	actionGetHotels,
	actionCloseAlert,
	actionCreateRoom,
	createRoomMutation,
	paginationPage,
}) => (
	<div>
		<h3 className={classes.formTitle}>Nueva Habitación
			<div className={classes.backbuttonCreation}>
				<BackButton />
			</div>
		</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nueva Habitación</h6>
				<div className={classes.formStyle}>
					<Field
						name='name'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Nombre'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='type'
						type='select'
						label='Tipo'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem key='Individual' value='Individual'>Individual</MenuItem>
						<MenuItem key='Double' value='Double'>Double</MenuItem>
						<MenuItem key='Triple' value='Triple'>Triple</MenuItem>
						<MenuItem key='Quadruple' value='Quadruple'>Quadruple</MenuItem>
					</Field>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='quantityAvailableSell'
						type='number'
						component={renderNumberField}
						validate={[required]}
						label='Cantidad Disponible'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='stockReserve'
						type='number'
						component={renderNumberField}
						validate={[required]}
						label='Stock para reservar'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='costPurchaseNight'
						type='number'
						component={renderNumberField}
						validate={[required]}
						label='Costo de pago de noche'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='costNight'
						type='number'
						component={renderNumberField}
						validate={[required]}
						label='Costo de la noche'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='startNumbering'
						type='text'
						component={renderDateField}
						validate={[required]}
						label='Inicio Estadía'
						className='yourclass date-label container'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='endNumbering'
						type='text'
						component={renderDateMaxField}
						validate={[required]}
						label='Fin Estadía'
						className='yourclass date-label container'
					/>
				</div>
				<div className={classes.formStyle}>
					<Events actionGetHotels={actionGetHotels} />
				</div>
				<div className={classes.formStyle}>
					<Hotels event={event} />
				</div>
				<button
					className={classes.createButton}
					type='submit'
					onClick={
						handleSubmit(() => actionCreateRoom(
							myValues.name,
							myValues.type,
							myValues.quantityAvailableSell,
							myValues.stockReserve,
							myValues.costPurchaseNight,
							myValues.costNight,
							myValues.startNumbering,
							myValues.endNumbering,
							myValues.hotel,
							myValues.event,
							paginationPage,
							createRoomMutation,
						))
					}
					disabled={submitting}
				>
					Crear
				</button>
				<Link to='/room' href='/room' className={classes.returnButton} >
					Regresar
				</Link>
			</form>
		</Paper>
		{alertType === 'validation' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			autoHideDuration={1000}
			onClose={actionCloseAlert}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id='message-id'>La Habitación que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'creado' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			autoHideDuration={1000}
			onClose={actionCloseAlert}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>La Habitación {myValues.name} fue creada con éxito.</span>}
		/>
		}
	</div>
);

RoomCreate.propTypes = {
	event: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreateRoom: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionGetHotels: PropTypes.func.isRequired,
	createRoomMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

RoomCreate = reduxForm({
	form: 'RoomCreate',
	validate,
	warn,
})(RoomCreate);

const selector = formValueSelector('RoomCreate');

const mapStateToProps = state => ({
	event: state.ReducerRoom.event,
	alertType: state.ReducerRoom.alertType,
	alertOpen: state.ReducerRoom.alertOpen,
	paginationPage: state.ReducerRoom.paginationPage,
	myValues: selector(
		state,
		'name',
		'type',
		'quantityAvailableSell',
		'stockReserve',
		'costPurchaseNight',
		'costNight',
		'startNumbering',
		'endNumbering',
		'hotel',
		'event',
	),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionGetHotels: value => dispatch(getHotels(value.target.value)),
	actionCreateRoom: (
		name,
		type,
		quantityAvailableSell,
		stockReserve,
		costPurchaseNight,
		costNight,
		startNumbering,
		endNumbering,
		hotel,
		event,
		paginationPage,
		createRoomMutation,
	) => dispatch(createRoom(
		name,
		type,
		quantityAvailableSell,
		stockReserve,
		costPurchaseNight,
		costNight,
		startNumbering,
		endNumbering,
		hotel,
		event,
		paginationPage,
		createRoomMutation,
	)),
});

export default compose(
	graphql(CREATE_ROOM, { name: 'createRoomMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(RoomCreate);
