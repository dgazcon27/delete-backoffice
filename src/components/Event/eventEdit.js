import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/Menu/MenuItem';
import {
	compose,
	Query,
	graphql,
} from 'react-apollo';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import styles from '../Shared/userTypeCss';
import { required, empty } from '../validations/validations';
import {
	renderTextField,
	renderSelectField,
	renderDateField,
	renderDateMaxField,
} from '../RenderFields/renderFields';
import { editEvent, closeAlert, cleanState } from '../../actions/Event/actionsCreators';
import GET_COUNTRIES from '../../queries/country';
import GET_STATUS from '../../queries/status';
import { EDIT_EVENT } from '../../queries/event';

const validate = (values) => {
	const errors = {};
	var presaleStart = new Date(values.presaleStart);
	var presaleClosure = new Date(values.presaleClosure);
	var eventStart = new Date(values.eventStart);
	var eventClosure = new Date(values.eventClosure);

	if ( presaleStart.getTime() <= presaleClosure.getTime() ) {
		errors.presaleClosure = false;
	} else {
		errors.presaleClosure = true;
	}

	if ( eventStart.getTime() <= eventClosure.getTime() ) {
		errors.eventClosure = false;
	} else {
		errors.eventClosure = true;
	}


	return errors;
};

const warn = (values) => {
	const warnings = {};
	var presaleStart = new Date(values.presaleStart);
	var presaleClosure = new Date(values.presaleClosure);
	var eventStart = new Date(values.eventStart);
	var eventClosure = new Date(values.eventClosure);

	if ( ( presaleStart.getTime() <= presaleClosure.getTime() )  ||
		( ( values.presaleClosure === undefined ) && values.presaleStart === undefined ) ) {
		warnings.presaleClosure = 'Este campo es obligatorio';
	} else if ( values.presaleClosure === undefined ) {
		warnings.presaleClosure = 'Este campo es obligatorio';
	} else {
		warnings.presaleClosure = 'La fecha final supera a la fecha de Inicio';
	}

	if ( ( eventStart.getTime() <= eventClosure.getTime() )  ||
		( ( values.eventClosure === undefined ) && values.eventStart === undefined ) ) {
		warnings.eventClosure = 'Este campo es obligatorio';
	} else if ( values.eventClosure === undefined ) {
		warnings.eventClosure = 'Este campo es obligatorio';
	} else {
		warnings.eventClosure = 'La fecha final supera a la fecha de Inicio';
	}
	return warnings;
};

const SelectStatus = () => (
	<Query query={GET_STATUS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='status'
						type='select'
						label='Estatus'
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
					name='status'
					type='select'
					label='Estatus'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.statuss.map(status => (
						<MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

const SelectCountry = () => (
	<Query query={GET_COUNTRIES}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='state'
						type='select'
						label='País'
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
					name='state'
					type='select'
					label='País'
					placeholder='País'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.countrys.map(country => (
						<MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);
let EventEdit = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionEditEvent,
	editEventMutation,
	actionCleanState,
	myValues,
	submitting,
	handleSubmit,
	userId,
}) => (
	<div>
		<h3 className={classes.formTitle}>Eventos</h3>
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
					<SelectCountry />
				</div>
				<div className={classes.formStyle}>
					<SelectStatus />
				</div>
				<div className={classes.formStyle}>
					<Field
						name='presaleStart'
						type='text'
						component={renderDateField}
						validate={[required, empty]}
						label='Inicio de preventa'
						className='yourclass container'
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
				<Link to='/events' href='/events' className={classes.returnButton} onClick={() => actionCleanState()}>
					Regresar
				</Link>
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
	userId: PropTypes.number.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	actionEditEvent: PropTypes.func.isRequired,
	editEventMutation: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	actionCleanState: PropTypes.func.isRequired,
	myValues: PropTypes.object.isRequired,
};

EventEdit = reduxForm({
	form: 'EventEdit',
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
		'status',
		'state',
	),
});


const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCleanState: () => dispatch(cleanState()),
	actionEditEvent: (event, updatedBy, editEventMutation) =>
		dispatch(editEvent(event, updatedBy, editEventMutation)),
});

export default compose(
	graphql(EDIT_EVENT, { name: 'editEventMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(EventEdit);
