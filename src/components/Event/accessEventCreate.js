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

export const Hotels = ({
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

export const Rooms = ({
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

const Add = props => (
	<button
		className={props.classes.createButton}
		type='submit'
		onClick={props.handleSubmit(() =>
			props.action(props.parameters, props.paginationPage, props.mutation))
		}
		disabled={props.submitting}
	>
			Agregar
	</button>
);

Add.propTypes = {
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	mutation: PropTypes.func.isRequired,
	action: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	parameters: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

export const AlertModal = props => (
	<Snackbar
		anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		open={props.open}
		autoHideDuration={1000}
		onClose={props.close}
		ContentProps={{ 'aria-describedby': 'message-id' }}
		message={<span id='message-id'>{props.message}</span>}
	/>
);

AlertModal.propTypes = {
	message: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
};

let a = class AccessEventCreate extends React.Component {
	render() {
		const { id } = this.props.match.params;
		const event = parseInt(id, 10);
		const { classes } = this.props;
		const { withTickets } = this.props;
		const { actionChangeTicket } = this.props;
		const { withRoom } = this.props;
		const { actionChangeRoom } = this.props;
		const { hotel } = this.props;
		const { actionGetRoom } = this.props;
		const { alertType } = this.props;
		const { alertOpen } = this.props;
		const { actionCloseAlert } = this.props;
		const { myValues } = this.props;
		const { submitting } = this.props;
		const { handleSubmit } = this.props;
		const { paginationPage } = this.props;
		const { actionCreateAccessEvent } = this.props;
		const { createMutation } = this.props;

		return (
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
						<Add
							classes={classes}
							submitting={submitting}
							handleSubmit={handleSubmit}
							paginationPage={paginationPage}
							action={actionCreateAccessEvent}
							parameters={{
								...myValues,
								withRoom: (withRoom === 'true'),
								withTickets: (withTickets === 'true'),
								event,
							}}
							mutation={createMutation}

						/>
						<Link to={`/event-access/${event}`} className={classes.returnButton}>
							Regresar
						</Link>
					</form>
				</Paper>
				{alertType === 'validation' &&
					<AlertModal
						message='El Acceso que intenta agregar ya existe verifique el nombre he intente de nuevo.'
						open={alertOpen}
						close={actionCloseAlert}
					/>
				}
				{alertType === 'creado' &&
					<AlertModal
						message='El Acceso fue agregado con éxito.'
						open={alertOpen}
						close={actionCloseAlert}
					/>
				}
			</div>
		);
	}
};

a.propTypes = {
	hotel: PropTypes.number.isRequired,
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
	createMutation: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
};

a.defaultProps = {
	withRoom: 'true',
	withTickets: 'true',
};

a = reduxForm({
	form: 'AccessEventCreate',
})(a);

const selector = formValueSelector('AccessEventCreate');

const mapStateToProps = state => ({
	hotel: state.ReducerEventAccess.hotel,
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
	actionChangeRoom: value => dispatch(setWithRooms(value.target.value, dispatch)),
	actionChangeTicket: value => dispatch(setWithTickets(value.target.value, dispatch)),
	actionCreateAccessEvent: (data, paginationPage, create) =>
		dispatch(createAccessEvent(data, paginationPage, create)),
});

export default compose(
	graphql(CREATE_ACCESS_EVENT, { name: 'createMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(a);
