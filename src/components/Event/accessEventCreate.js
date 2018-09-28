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
import { CREATE_ACCESS_EVENT } from '../../queries/event';
import {
	setWithRooms,
	setWithTickets,
	closeAlert,
	createAccessEvent,
} from '../../actions/Event/Access/actionsCreators';

import { Access } from '../commonComponent';

let AccessEventCreate = ({
	event,
	classes,
	withRoom,
	myValues,
	alertOpen,
	alertType,
	withTickets,
	submitting,
	handleSubmit,
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
							valor={22}
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
						label='Número de Tickets'
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
						label='Número de Tickets'
						className='yourclass'
						disabled
						valor={0}
					/>
				</div>
				}
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionCreateAccessEvent(withRoom, withTickets, myValues.numberRooms, myValues.numberTickets, myValues.price, event, myValues.access, paginationPage, createAccessEventMutation))} disabled={submitting} >
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
	event: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	withRoom: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	submitting: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	withTickets: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionChangeRoom: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionChangeTicket: PropTypes.func.isRequired,
	actionCreateAccessEvent: PropTypes.func.isRequired,
	createAccessEventMutation: PropTypes.func.isRequired,
};

AccessEventCreate = reduxForm({
	form: 'AccessEventCreate',
})(AccessEventCreate);

const selector = formValueSelector('AccessEventCreate');

const mapStateToProps = state => ({
	event: state.ReducerEventAccess.event,
	withRoom: state.ReducerEventAccess.withRoom,
	withTickets: state.ReducerEventAccess.withTickets,
	alertType: state.ReducerEventAccess.alertType,
	alertOpen: state.ReducerEventAccess.alertOpen,
	paginationPage: state.ReducerEventAccess.paginationPage,
	myValues: selector(state, 'withRoom', 'withTickets', 'numberRooms', 'numberTickets', 'price', 'access'),
});

const mapDispatchToProps = dispatch => ({
	actionChangeRoom: value => dispatch(setWithRooms(value.target.value)),
	actionChangeTicket: value => dispatch(setWithTickets(value.target.value)),
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCreateAccessEvent: (
		withRoom,
		withTickets,
		numberRooms,
		numberTickets,
		price,
		event,
		access,
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
		paginationPage,
		createAccessEventMutation,
	)),
});

export default compose(
	graphql(CREATE_ACCESS_EVENT, { name: 'createAccessEventMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(AccessEventCreate);
