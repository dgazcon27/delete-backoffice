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
import styles from './locationCss';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import {
	renderTextField,
	renderNumberField,
	renderSelectField,
	renderNumberMaxField,
} from '../RenderFields/renderFields';
import {
	CREATE_LOCATION,
	GET_STATUS,
} from '../../queries/location';
import {
	closeAlert,
	createLocation,
} from '../../actions/location/actionsCreators';

const validate = (values) => {
	const errors = {};

	if ((Number(values.fullcapacity) >= Number(values.capacity))) {
		errors.capacity = false;
	} else {
		errors.capacity = true;
	}
	return errors;
};

const warn = (values) => {
	const warnings = {};

	if ((Number(values.fullcapacity) >= Number(values.capacity)) ||
		(values.fullcapacity === undefined && values.capacity === undefined)) {
		warnings.capacity = 'Este campo es obligatorio';
	} else if (values.capacity === undefined) {
		warnings.capacity = 'Este campo es obligatorio';
	} else {
		warnings.capacity = 'La cantidad supera la capacidad máxima';
	}
	return warnings;
};

const Status = () => (
	<Query query={GET_STATUS}>
		{({ loading, error, data }) => {
			if (loading || error) {
				return (
					<div className='formStyle'>
						<Field
							name='status'
							type='select'
							component={renderSelectField}
							validate={required}
							label='status'
						>
							<MenuItem />
						</Field>
					</div>
				);
			}
			return (
				<Field
					name='status'
					type='select'
					label='status'
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

let LocationCreate = ({
	userId,
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionCreateLocation,
	createLocationMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div>
		<h3 className={classes.formTitle}>Nueva Ubicación</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nuevo Ubicación</h6>
				<div className={classes.formStyle}>
					<Field
						name='name'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='name'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='description'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='description'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='fullcapacity'
						type='text'
						component={renderNumberField}
						validate={[required, empty]}
						label='Capacidad Máxima'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='capacity'
						type='text'
						component={renderNumberMaxField}
						validate={[required, empty]}
						label='Capacidad'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Status />
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionCreateLocation(myValues.name, myValues.description, Number(myValues.fullcapacity), Number(myValues.capacity), Number(myValues.status), Number(userId), Number(userId), paginationPage, createLocationMutation))} disabled={submitting} >
					Crear
				</button>
				<Link to='/tables' href='/tables' className={classes.returnButton} >
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
			message={<span id='message-id'>La Ubicación que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'creado' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>La Ubicación {myValues.name} fue creada con éxito.</span>}
		/>
		}
	</div>
);

LocationCreate.propTypes = {
	userId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreateLocation: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createLocationMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

LocationCreate = reduxForm({
	form: 'LocationCreate',
	validate,
	warn,
})(LocationCreate);

const selector = formValueSelector('LocationCreate');

const mapStateToProps = state => ({
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerLocation.alertType,
	alertOpen: state.ReducerLocation.alertOpen,
	paginationPage: state.ReducerLocation.paginationPage,
	myValues: selector(state, 'name', 'description', 'fullcapacity', 'capacity', 'status'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCreateLocation: (
		name,
		descripcion,
		fullcapacity,
		capacity,
		status,
		createdBy,
		updatedBy,
		paginationPage,
		createLocationMutation,
	) => dispatch(createLocation(
		name,
		descripcion,
		fullcapacity,
		capacity,
		status,
		createdBy,
		updatedBy,
		paginationPage,
		createLocationMutation,
	)),
});

export default compose(
	graphql(CREATE_LOCATION, { name: 'createLocationMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(LocationCreate);
