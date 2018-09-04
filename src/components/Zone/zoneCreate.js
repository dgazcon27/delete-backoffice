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
import styles from './zoneCss';
import {
	required,
	empty,
} from '../validations/validations';
import {
	renderTextField,
	renderNumberField,
	renderNumberMaxField,
} from '../RenderFields/renderFields';
import { CREATE_ZONE } from '../../queries/zone';
import {
	closeAlert,
	createZone,
} from '../../actions/zone/actionsCreators';

const validate = (values) => {
	const errors = {};

	if ((Number(values.maxcapacity) >= Number(values.capacity))) {
		errors.capacity = false;
	} else {
		errors.capacity = true;
	}
	return errors;
};

const warn = (values) => {
	const warnings = {};

	if ((Number(values.fullcapacity) >= Number(values.capacity)) ||
		(values.maxcapacity === undefined && values.capacity === undefined)) {
		warnings.capacity = 'Este campo es obligatorio';
	} else if (values.capacity === undefined) {
		warnings.capacity = 'Este campo es obligatorio';
	} else {
		warnings.capacity = 'La cantidad supera la capacidad máxima';
	}
	return warnings;
};

let ZoneCreate = ({
	userId,
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionCreateZone,
	createZoneMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div>
		<h3 className={classes.formTitle}>Zonas</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nueva Zona</h6>
				<div className={classes.formStyle}>
					<Field
						name='name'
						type='text'
						component={renderTextField}
						validate={[required, empty]}
						label='Nombre'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='maxcapacity'
						type='text'
						component={renderNumberField}
						validate={required}
						label='Capacidad Máxima'
						className='yourclass'
					/>
				</div>
				<div className={classes.formStyle}>
					<Field
						name='capacity'
						type='text'
						component={renderNumberMaxField}
						validate={required}
						label='Capacidad'
						className='yourclass'
					/>
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionCreateZone(myValues.name, Number(myValues.capacity), Number(myValues.maxcapacity), Number(userId), userId, paginationPage, createZoneMutation))} disabled={submitting} >
					Crear
				</button>
				<Link to='/Departments' href='/Departments' className={classes.returnButton} >
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
			message={<span id='message-id'>No puede crear una Zona sin {alertType}</span>}
		/>
		}
		{alertType === 'validation' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id='message-id'>La Zona que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'rolDescription' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id='message-id'>No puede crear una Zona sin {alertType}</span>}
		/>
		}
		{alertType === 'creado' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>La Zona {myValues.name} fue creada con éxito.</span>}
		/>
		}
	</div>
);

ZoneCreate.propTypes = {
	userId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreateZone: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createZoneMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

ZoneCreate = reduxForm({
	form: 'ZoneCreate',
	validate,
	warn,
})(ZoneCreate);

const selector = formValueSelector('ZoneCreate');

const mapStateToProps = state => ({
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerZone.alertType,
	alertOpen: state.ReducerZone.alertOpen,
	paginationPage: state.ReducerZone.paginationPage,
	myValues: selector(state, 'name', 'maxcapacity', 'capacity'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCreateZone: (
		name,
		capacity,
		maxcapacity,
		createdBy,
		updatedBy,
		paginationPage,
		createZoneMutation,
	) => dispatch(createZone(
		name,
		capacity,
		maxcapacity,
		createdBy,
		updatedBy,
		paginationPage,
		createZoneMutation,
	)),
});

export default compose(
	graphql(CREATE_ZONE, { name: 'createZoneMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ZoneCreate);
