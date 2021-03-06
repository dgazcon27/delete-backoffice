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
import { EDIT_ZONE } from '../../queries/zone';
import {
	closeAlert,
	editZone,
} from '../../actions/zone/actionsCreators';
import BackButton from '../widget/BackButton';
import Title from '../Shared/title';

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

	if ((Number(values.maxcapacity) >= Number(values.capacity)) ||
		(values.maxcapacity === undefined && values.capacity === undefined)) {
		warnings.capacity = 'Este campo es obligatorio';
	} else if (values.capacity === undefined) {
		warnings.capacity = 'Este campo es obligatorio';
	} else {
		warnings.capacity = 'La cantidad supera la capacidad máxima';
	}
	return warnings;
};

let ZoneEdit = ({
	userId,
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
}) => (
	<div>
		<Title title='Zonas' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar Zona</h6>
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
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditZone(myValues, userId, paginationPage, editZoneMutation))} disabled={submitting} >
					Guardar
				</button>
				<BackButton />
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
			message={<span id='message-id'>La Zona que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
		/>
		}
		{alertType === 'edit' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>La Zona {myValues.name} fue editada con éxito.</span>}
		/>
		}
	</div>
);

ZoneEdit.propTypes = {
	userId: PropTypes.number.isRequired,
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
};

ZoneEdit = reduxForm({
	form: 'ZoneEdit',
	enableReinitialize: true,
	validate,
	warn,
})(ZoneEdit);

const selector = formValueSelector('ZoneEdit');

const mapStateToProps = state => ({
	initialValues: state.ReducerZone,
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerZone.alertType,
	alertOpen: state.ReducerZone.alertOpen,
	paginationPage: state.ReducerZone.paginationPageZone,
	myValues: selector(state, 'id', 'name', 'maxcapacity', 'capacity'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditZone: (
		zone,
		updatedBy,
		paginationPage,
		editZoneMutation,
	) => dispatch(editZone(
		zone,
		updatedBy,
		paginationPage,
		editZoneMutation,
	)),
});

export default compose(
	graphql(EDIT_ZONE, { name: 'editZoneMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ZoneEdit);
