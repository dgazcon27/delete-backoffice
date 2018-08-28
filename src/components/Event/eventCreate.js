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
import { renderTextField, renderSelectField, renderDateField } from '../RenderFields/renderFields';
import { CREATE_EVENT } from '../../queries/event';
import {
	closeAlert,
	createEvent,
} from '../../actions/Event/actionsCreators';

import GET_COUNTRIES from '../../queries/country';
import GET_STATUS from '../../queries/status';


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
						label=''
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='presaleClosure'
						type='text'
						component={renderDateField}
						validate={[required, empty]}
						label=''
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='eventStart'
						type='text'
						component={renderDateField}
						validate={[required, empty]}
						label=''
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='eventClosure'
						type='text'
						component={renderDateField}
						validate={[required, empty]}
						label=''
						className='yourclass'
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
		{alertType === 'nombre' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id='message-id'>No puede crear un evento sin {alertType}</span>}
		/>
		}
		{alertType === 'validation' &&
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				Bank={alertOpen}
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
