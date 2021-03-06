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
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import styles from '../Shared/sharedStyles';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import {
	renderTextField,
	renderDateField,
	renderDateMaxField,
} from '../RenderFields/renderFields';
import { CREATE_EVENT } from '../../queries/event';
import {
	closeAlert,
	createEvent,
	setCountriesStates,
} from '../../actions/Event/actionsCreators';
import Title from '../Shared/title';
import BackButton from '../widget/BackButton';


import { SelectCountry, SelectState } from '../commonComponent';

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


let EventCreate = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionCreateEvent,
	createEventMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
	userId,
	actionSelectCountry,
	states,
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
						className='yourclass date-label container'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='presaleClosure'
						type='text'
						component={renderDateMaxField}
						validate={[required, empty]}
						label='Fin de preventa'
						className='yourclass date-label container'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='eventStart'
						type='text'
						component={renderDateField}
						validate={[required, empty]}
						label='Inicio de evento'
						className='yourclass date-label container'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='eventClosure'
						type='text'
						component={renderDateMaxField}
						validate={[required, empty]}
						label='Fin de evento'
						className='yourclass date-label container'
					/>
				</div>
				<div className={classes.centered}>
					<button
						className={classes.createButton}
						type='submit'
						onClick={
							handleSubmit(() => actionCreateEvent(
								myValues,
								paginationPage,
								userId,
								userId,
								createEventMutation,
							))

						}
						disabled={submitting}
					>
					Crear
					</button>
					<BackButton />
				</div>
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
				message={<span id='message-id'>El evento que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
			/>
		}
		{alertType === 'creado' &&
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={alertOpen}
				onClose={() => { setTimeout(actionCloseAlert, 100); }}
				ContentProps={{ 'aria-describedby': 'message-id' }}
				message={<span id='message-id'>El evento {myValues.name} fue creado con exito.</span>}
			/>
		}
	</div>
);

EventCreate.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreateEvent: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createEventMutation: PropTypes.func.isRequired,
	actionSelectCountry: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	userId: PropTypes.number.isRequired,
	states: PropTypes.array.isRequired,
};

EventCreate = reduxForm({
	form: 'EventCreate',
	validate,
	warn,
})(EventCreate);

const selector = formValueSelector('EventCreate');

const mapStateToProps = state => ({
	alertType: state.ReducerEvent.alertType,
	alertOpen: state.ReducerEvent.alertOpen,
	states: state.ReducerEvent.states,
	paginationPage: state.ReducerEvent.paginationPageEv,
	userId: state.ReducerLogin.userId,
	myValues: selector(
		state,
		'name',
		'description',
		'presaleStart',
		'presaleClosure',
		'eventStart',
		'eventClosure',
		'state',
	),
});

const mapDispatchToProps = dispatch => ({
	actionSelectCountry: (event, id) => dispatch(setCountriesStates(event, id)),
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCreateEvent: (myValues, paginationPage, createdBy, updatedBy, createEventMutation) =>
		dispatch(createEvent(myValues, paginationPage, createdBy, updatedBy, createEventMutation)),
});

export default compose(
	graphql(CREATE_EVENT, { name: 'createEventMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(EventCreate);
