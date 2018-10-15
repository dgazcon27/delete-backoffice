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
import styles from './roomCss';
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
import { EDIT_ROOM } from '../../queries/room';
import { GET_HOTELS } from '../../queries/event';
import { GET_EVENTSS } from '../../queries/common';
import {
	closeAlert,
	editRoom,
	getHotels,
} from '../../actions/Room/actionsCreators';

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
		<h3 className={classes.formTitle}>Editar Habitación</h3>
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
						name='capacity'
						type='number'
						component={renderNumberField}
						validate={[required]}
						label='Capacidad'
						className='yourclass'
					/>
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
						type='date'
						component={renderNumberField}
						validate={[required]}
						label='Inicio de la estancia'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='endNumbering'
						type='date'
						component={renderNumberField}
						validate={[required]}
						label='Fin de la estancia'
						className='yourclass'
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
							myValues.capacity,
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
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
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
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
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
})(RoomEdit);

const selector = formValueSelector('RoomEdit');

const mapStateToProps = state => ({
	id: state.ReducerRoom.id,
	event: state.ReducerRoom.event,
	initialValues: state.ReducerRoom,
	alertType: state.ReducerRoom.alertType,
	alertOpen: state.ReducerRoom.alertOpen,
	paginationPage: state.ReducerRoom.paginationPage,
	myValues: selector(
		state,
		'name',
		'type',
		'capacity',
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
		capacity,
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
		capacity,
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
