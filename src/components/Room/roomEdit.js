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
	renderTextField,
	renderDateField,
	renderNumberField,
	renderSelectField,
	renderDateMaxField,
} from '../RenderFields/renderFields';
import { EDIT_ROOM } from '../../queries/room';
import { GET_HOTELS } from '../../queries/event';
import { GET_EVENTSS } from '../../queries/common';
import {
	closeAlert,
	editRoom,
	getHotels,
} from '../../actions/Room/actionsCreators';
import Title from '../Shared/title';

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

let RoomEdit = ({
	id,
	event,
	classes,
	myValues,
	alertOpen,
	alertType,
	submitting,
	handleSubmit,
	actionGetHotels,
	actionCloseAlert,
	actionEditRoom,
	editRoomMutation,
	paginationPage,
}) => (
	<div>
		<Title title='Habitaciones' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar Habitación</h6>
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
						handleSubmit(() => actionEditRoom(
							id,
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
							editRoomMutation,
						))
					}
					disabled={submitting}
				>
					Guardar
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
			message={<span id='message-id'>La Habitación {myValues.name} que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'creado' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			autoHideDuration={1000}
			onClose={actionCloseAlert}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>La Habitación {myValues.name} fue editada con éxito.</span>}
		/>
		}
	</div>
);

RoomEdit.propTypes = {
	id: PropTypes.number.isRequired,
	event: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionEditRoom: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionGetHotels: PropTypes.func.isRequired,
	editRoomMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

RoomEdit = reduxForm({
	form: 'RoomEdit',
	validate,
	warn,
})(RoomEdit);

const selector = formValueSelector('RoomEdit');

const mapStateToProps = state => ({
	id: state.ReducerRoom.id,
	event: state.ReducerRoom.event,
	initialValues: state.ReducerRoom,
	alertType: state.ReducerRoom.alertType,
	alertOpen: state.ReducerRoom.alertOpen,
	paginationPage: state.ReducerPagination.paginationPage,
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
	actionEditRoom: (
		id,
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
		editRoomMutation,
	) => dispatch(editRoom(
		id,
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
		editRoomMutation,
	)),
});

export default compose(
	graphql(EDIT_ROOM, { name: 'editRoomMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(RoomEdit);
