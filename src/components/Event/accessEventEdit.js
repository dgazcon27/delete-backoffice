import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	compose,
	graphql,
} from 'react-apollo';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import Paper from '@material-ui/core/Paper';
import Radio from 'material-ui/Radio/Radio';
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
	renderNumbValDefaultField,
} from '../RenderFields/renderFields';
import { EDIT_ACCESS_EVENT } from '../../queries/event';
import {
	getRooms,
	closeAlert,
	setWithRooms,
	setWithTickets,
	editAccessEvent,
	getEventAccessById,
	setNumberTickets,
	setNumberRooms,
} from '../../actions/Event/Access/actionsCreators';

import { Access } from '../commonComponent';
import {
	Hotels,
	Rooms,
	AlertModal,
} from './accessEventCreate';

let AccessEventEdit = class ClassAccessEventEdit extends React.Component {
	componentDidMount() {
		const { fk } = this.props.match.params;
		this.props.dispatch(getEventAccessById(fk));
	}

	render() {
		const { id } = this.props.match.params;
		const event = parseInt(id, 10);
		const { classes } = this.props;
		const { hotel } = this.props;
		const { withTickets } = this.props;
		const { withRoom } = this.props;
		const { actionChangeTicket } = this.props;
		const { actionChangeRoom } = this.props;
		const { actionGetRoom } = this.props;
		const { handleSubmit } = this.props;
		const { actionEditAccessEvent } = this.props;
		const { myValues } = this.props;
		const { paginationPage } = this.props;
		const { editAccessEventMutation } = this.props;
		const { submitting } = this.props;
		const { actionCloseAlert } = this.props;
		const { actionSetNumberTicket } = this.props;
		const { actionSetNumberRoom } = this.props;
		const { alertType } = this.props;
		const { alertOpen } = this.props;

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
									onChange={actionSetNumberTicket}
								/>
							</div>
						}
						{ withTickets === 'false' &&
							<div className={classes.formStyle}>
								<Field
									name='numberTickets'
									type='text'
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
									label='Número de Habitaciones'
									className='yourclass'
									disabled={false}
									onChange={actionSetNumberRoom}
								/>
							</div>
						}
						{ withRoom === 'true' &&
							<div className={classes.formStyle}>
								<Field
									name='days'
									type='text'
									component={renderNumberField}
									validate={[required]}
									label='Días'
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
						{ withRoom === 'false' &&
							<div className={classes.formStyle}>
								<Field
									name='days'
									type='text'
									component={renderNumbValDefaultField}
									label='Días'
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
						<button
							className={classes.createButton}
							type='submit'
							onClick={
								handleSubmit(() =>
									actionEditAccessEvent(myValues, event, paginationPage, editAccessEventMutation))}
							disabled={submitting}
						>
							Guardar
						</button>
						<Link to={{ pathname: `/event-access/${event}` }} className={classes.returnButton} >
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
						message='El Acceso fue editado con éxito.'
						open={alertOpen}
						close={actionCloseAlert}
					/>
				}
			</div>
		);
	}
};

AccessEventEdit.propTypes = {
	id: PropTypes.number.isRequired,
	hotel: PropTypes.number.isRequired,
	match: PropTypes.object.isRequired,
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
	actionSetNumberTicket: PropTypes.func.isRequired,
	actionSetNumberRoom: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
};

AccessEventEdit = reduxForm({
	form: 'AccessEventEdit',
	enableReinitialize: true,
})(AccessEventEdit);

const selector = formValueSelector('AccessEventEdit');

const mapStateToProps = state => ({
	id: state.ReducerEvent.id,
	hotel: state.ReducerEventAccess.hotel,
	initialValues: state.ReducerEventAccess,
	withRoom: state.ReducerEventAccess.withRoom,
	alertType: state.ReducerEventAccess.alertType,
	alertOpen: state.ReducerEventAccess.alertOpen,
	withTickets: state.ReducerEventAccess.withTickets,
	paginationPage: state.ReducerEventAccess.paginationPage,
	myValues: selector(state, 'id', 'withRoom', 'withTickets', 'days', 'numberRooms', 'numberTickets', 'price', 'access', 'hotel', 'room'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionGetRoom: value => dispatch(getRooms(value.target.value)),
	actionChangeRoom: value => dispatch(setWithRooms(value.target.value, dispatch)),
	actionChangeTicket: value => dispatch(setWithTickets(value.target.value, dispatch)),
	actionEditAccessEvent: (myValues, event, paginationPage, editAccessEventMutation) =>
		dispatch(editAccessEvent(myValues, event, paginationPage, editAccessEventMutation)),
	actionSetNumberTicket: value =>
		dispatch(setNumberTickets(value.target.value)),
	actionSetNumberRoom: value =>
		dispatch(setNumberRooms(value.target.value)),
});

export default compose(
	graphql(EDIT_ACCESS_EVENT, { name: 'editAccessEventMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(AccessEventEdit);
