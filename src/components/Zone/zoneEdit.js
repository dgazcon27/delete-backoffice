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
} from '../RenderFields/renderFields';
import { EDIT_ZONE } from '../../queries/zone';
import {
	closeAlert,
	editZone,
} from '../../actions/zone/actionsCreators';

let ZoneEdit = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionEditZone,
	editZoneMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
	initialValues,
}) => (
	<div>
		<h3 className={classes.formTitle}>Zona</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar Zona</h6>
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
						name='max_capacity'
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
						component={renderNumberField}
						validate={required}
						label='Capacidad'
						className='yourclass'
					/>
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditZone(initialValues.id, myValues.name, Number(myValues.capacity), Number(myValues.max_capacity), paginationPage, editZoneMutation))} disabled={submitting} >
					Guardar
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
			message={<span id='message-id'>La Zona {myValues.name} fue edita con éxito.</span>}
		/>
		}
	</div>
);

ZoneEdit.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionEditZone: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	editZoneMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.object.isRequired,
};

ZoneEdit = reduxForm({
	form: 'ZoneEdit',
})(ZoneEdit);

const selector = formValueSelector('ZoneEdit');

const mapStateToProps = state => ({
	alertType: state.ReducerZone.alertType,
	alertOpen: state.ReducerZone.alertOpen,
	paginationPage: state.ReducerZone.paginationPage,
	myValues: selector(state, 'name', 'max_capacity', 'capacity'),
	initialValues: state.ReducerZone,
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditZone: (
		id,
		name,
		capacity,
		maxCapacity,
		paginationPage,
		editZoneMutation,
	) => dispatch(editZone(
		id,
		name,
		capacity,
		maxCapacity,
		paginationPage,
		editZoneMutation,
	)),
});

export default compose(
	graphql(EDIT_ZONE, { name: 'editZoneMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ZoneEdit);
