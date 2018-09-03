import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/Menu/MenuItem';
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
import styles from './bankCss';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import {
	renderTextField,
	renderSelectField,
	renderDateField,
	renderDateMaxField,
} from '../RenderFields/renderFields';
import { CREATE_EVENT } from '../../queries/event';
import {
	closeAlert,
	createEvent,
} from '../../actions/Event/actionsCreators';

import GET_COUNTRIES from '../../queries/country';
import GET_STATUS from '../../queries/status';

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
				<Link to='/events' href='/events' className={classes.returnButton} >
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
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	userId: PropTypes.number.isRequired,
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
	paginationPage: state.ReducerEvent.paginationPage,
	userId: state.ReducerLogin.userId,
	myValues: selector(
		state,
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
	actionCreateEvent: (myValues, paginationPage, createdBy, updatedBy, createEventMutation) =>
		dispatch(createEvent(myValues, paginationPage, createdBy, updatedBy, createEventMutation)),
});

export default compose(
	graphql(CREATE_EVENT, { name: 'createEventMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(EventCreate);
