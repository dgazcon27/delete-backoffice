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
import Snackbar from '@material-ui/core/Snackbar';
import RadioGroup from 'material-ui/Radio/RadioGroup';
import Radio from 'material-ui/Radio/Radio';
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
} from '../RenderFields/renderFields';
import { EDIT_ACCESS_EVENT } from '../../queries/event';
import {
	setWithRooms,
	setWithTickets,
	closeAlert,
	editAccessEvent,
} from '../../actions/Event/Access/actionsCreators';

import { Access } from '../commonComponent';

let AccessEventEdit = ({
	id,
	event,
	withRoom,
	withTickets,
	classes,
	alertOpen,
	alertType,
	actionChangeRoom,
	actionChangeTicket,
	actionCloseAlert,
	actionEditAccessEvent,
	editAccessEventMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
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
							valor={0}
						/>
					</div>
				}
				{ withRoom === 'false' &&
					<div className={classes.formStyle}>
						<Field
							name='numberRooms'
							type='text'
							component={renderNumberField}
							label='Número de Habitaciones'
							className='yourclass'
							disabled
							valor={0}
						/>
					</div>
				}
				<RadioGroup
					aria-label='withTickets'
					name='with_tickets'
					className={classes.group}
					value={withTickets}
					onChange={actionChangeTicket}
				>
					<FormControlLabel value='true' control={<Radio />} label='Con Habitaciones' />
					<FormControlLabel value='false' control={<Radio />} label='Sin Habitaciones' />
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
						component={renderNumberField}
						label='Número de Entradas'
						className='yourclass'
						disabled
						valor={0}
					/>
				</div>
				}
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditAccessEvent(id, withRoom, withTickets, myValues.numberRooms, myValues.numberTickets, myValues.price, event, myValues.access, paginationPage, editAccessEventMutation))} disabled={submitting} >
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
	withRoom: PropTypes.string.isRequired,
	withTickets: PropTypes.string.isRequired,
	event: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionEditAccessEvent: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionChangeRoom: PropTypes.func.isRequired,
	actionChangeTicket: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	editAccessEventMutation: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

AccessEventEdit = reduxForm({
	form: 'AccessEventEdit',
})(AccessEventEdit);

const selector = formValueSelector('AccessEventEdit');

const mapStateToProps = state => ({
	id: state.ReducerEvent.id,
	event: state.ReducerEventAccess.event,
	withRoom: state.ReducerEventAccess.withRoom,
	withTickets: state.ReducerEventAccess.withTickets,
	alertType: state.ReducerEventAccess.alertType,
	alertOpen: state.ReducerEventAccess.alertOpen,
	paginationPage: state.ReducerEventAccess.paginationPage,
	initialValues: state.ReducerEventAccess,
	myValues: selector(state, 'withRoom', 'withTickets', 'numberRooms', 'numberTickets', 'price', 'access'),
});

const mapDispatchToProps = dispatch => ({
	actionChangeRoom: value => dispatch(setWithRooms(value.target.value)),
	actionChangeTicket: value => dispatch(setWithTickets(value.target.value)),
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditAccessEvent: (
		id,
		withRoom,
		withTickets,
		numberRooms,
		numberTickets,
		price,
		event,
		access,
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
		paginationPage,
		editAccessEventMutation,
	)),
});

export default compose(
	graphql(EDIT_ACCESS_EVENT, { name: 'editAccessEventMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(AccessEventEdit);
