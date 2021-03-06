import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
	compose,
	graphql,
} from 'react-apollo';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import styles from '../Shared/sharedStyles';
import { required, empty } from '../validations/validations';
import { renderTextField, renderDateField, renderDateMaxField } from '../RenderFields/renderFields';
import {
	editEvent,
	closeAlert,
	setCountriesStates,
	setDate,
} from '../../actions/Event/actionsCreators';
import { EDIT_EVENT } from '../../queries/event';

import {
	SelectCountry,
	SelectState,
} from '../commonComponent';
import Title from '../Shared/title';
import BackButton from '../widget/BackButton';


const validate = (values) => {
	const errors = {};
	const presaleStart = new Date(values.presaleStart);
	const presaleClosure = new Date(values.presaleClosure);
	const eventStart = new Date(values.eventStart);
	const eventClosure = new Date(values.eventClosure);

	if (presaleStart.getTime() <= presaleClosure.getTime()) {
		errors.presaleClosure = false;
	} else {
		errors.presaleClosure = true;
	}

	if (eventStart.getTime() <= eventClosure.getTime()) {
		errors.eventClosure = false;
	} else {
		errors.eventClosure = true;
	}


	return errors;
};

const warn = (values) => {
	const warnings = {};
	const presaleStart = new Date(values.presaleStart);
	const presaleClosure = new Date(values.presaleClosure);
	const eventStart = new Date(values.eventStart);
	const eventClosure = new Date(values.eventClosure);

	if ((presaleStart.getTime() <= presaleClosure.getTime()) ||
		((values.presaleClosure === undefined) && values.presaleStart === undefined)) {
		warnings.presaleClosure = 'Este campo es obligatorio';
	} else if (values.presaleClosure === undefined) {
		warnings.presaleClosure = 'Este campo es obligatorio';
	} else {
		warnings.presaleClosure = 'La fecha final supera a la fecha de Inicio';
	}

	if ((eventStart.getTime() <= eventClosure.getTime()) ||
		((values.eventClosure === undefined) && values.eventStart === undefined)) {
		warnings.eventClosure = 'Este campo es obligatorio';
	} else if (values.eventClosure === undefined) {
		warnings.eventClosure = 'Este campo es obligatorio';
	} else {
		warnings.eventClosure = 'La fecha final supera a la fecha de Inicio';
	}
	return warnings;
};

let EventEdit = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionEditEvent,
	editEventMutation,
	myValues,
	submitting,
	handleSubmit,
	userId,
	states,
	actionSelectCountry,
	actionSetDate,
}) => (
	<div>
		<Title title='Eventos' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nuevo Evento</h6>
				<div className={classes.formStyle}>
					<Field
						name='name'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Nombre de Evento'
						data-set='SET_EVENT_NAME'
						onChange={actionSetDate}
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='description'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Descripción'
						className='yourclass'
						onChange={actionSetDate.bind(this, 'SET_EVENT_DESCRIPTION', 'description')}
					/>
				</div>
				<div className={classes.formStyle}>
					<SelectCountry actionSelectCountry={actionSelectCountry} />
				</div>
				<div className={classes.formStyle}>
					<SelectState states={states} />
				</div>
				<div className={classes.formStyle}>
					<Field
						name='presaleStart'
						type='text'
						component={renderDateField}
						validate={[required, empty]}
						label='Inicio de preventa'
						className='yourclass container'
						onChange={actionSetDate.bind(this, 'SET_PRESALE', 'presaleStart')}
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='presaleClosure'
						type='text'
						component={renderDateMaxField}
						validate={[required, empty]}
						label='Fin de preventa'
						className='yourclass container'
						onChange={actionSetDate.bind(this, 'SET_CLOSE_PRESALE', 'presaleClosure')}
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='eventStart'
						type='text'
						component={renderDateField}
						validate={[required, empty]}
						label='Inicio de evento'
						className='yourclass container'
						onChange={actionSetDate.bind(this, 'SET_EVENT_START', 'eventStart')}
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='eventClosure'
						type='text'
						component={renderDateMaxField}
						validate={[required, empty]}
						label='Fin de evento'
						className='yourclass container'
						onChange={actionSetDate.bind(this, 'SET_EVENT_CLOSE', 'eventClosure')}
					/>
				</div>
				<button
					className={classes.createButton}
					type='submit'
					disabled={submitting}
					onClick={handleSubmit(() => actionEditEvent(myValues, userId, editEventMutation))}
				>
					Guardar
				</button>
				<BackButton />
			</form>
		</Paper>
		{alertType === 'edit' &&
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={alertOpen}
				onClose={() => { setTimeout(actionCloseAlert, 100); }}
				ContentProps={{ 'aria-describedby': 'message-id' }}
				message={<span id='message-id'>El evento {myValues.name} fue editado con exito.</span>}
			/>
		}
	</div>
);

EventEdit.propTypes = {
	submitting: PropTypes.bool.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	myValues: PropTypes.object.isRequired,
	userId: PropTypes.number.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	actionEditEvent: PropTypes.func.isRequired,
	editEventMutation: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionSelectCountry: PropTypes.func.isRequired,
	actionSetDate: PropTypes.func.isRequired,
	states: PropTypes.array.isRequired,
};

EventEdit = reduxForm({
	form: 'EventEdit',
	enableReinitialize: true,
	validate,
	warn,
})(EventEdit);

const selector = formValueSelector('EventEdit');


const mapStateToProps = state => ({
	id: state.ReducerEvent.id,
	alertType: state.ReducerEvent.alertType,
	alertOpen: state.ReducerEvent.alertOpen,
	initialValues: state.ReducerEvent,
	userId: state.ReducerLogin.userId,
	states: state.ReducerEvent.states,
	name: state.ReducerEvent.name,
	myValues: selector(
		state,
		'id',
		'name',
		'description',
		'presaleStart',
		'presaleClosure',
		'eventStart',
		'eventClosure',
		'state',
		'country',

	),
});


const mapDispatchToProps = dispatch => ({
	actionSelectCountry: (event, id) => dispatch(setCountriesStates(event, id)),
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditEvent: (event, updatedBy, editEventMutation) =>
		dispatch(editEvent(event, updatedBy, editEventMutation)),
	actionSetDate: (desState, input, ev, value) => dispatch(setDate(desState, input, ev, value)),
});

export default compose(
	graphql(EDIT_EVENT, { name: 'editEventMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(EventEdit);
