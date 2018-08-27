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
} from '../RenderFields/renderFields';
import {
	EDIT_LOCATION,
	GET_STATUS,
} from '../../queries/location';
import {
	closeAlert,
	editLocation,
} from '../../actions/location/actionsCreators';

const Status = () => (
	<Query query={GET_STATUS}>
		{({ loading, error, data }) => {
			if (loading || error) {
				return (
					<Field
						name='status'
						type='select'
						component={renderSelectField}
						validate={required}
						label='status'
					>
						<MenuItem />
					</Field>
				);
			}
			return (
				<div>
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
				</div>
			);
		}}
	</Query>
);

let LocationEdit = ({
	userId,
	classes,
	alertOpen,
	alertType,
	initialValues,
	actionCloseAlert,
	actionEditLocation,
	editLocationMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div>
		<h3 className={classes.formTitle}>Nueva Ubicación</h3>
		<Paper className={classes.createContainer}>
			<h6 className={classes.formTitle}>Editar Ubicación</h6>
			<form>
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
						name='locationDescription'
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
				<div className={classes.formStyle}>
					<Status />
				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditLocation(initialValues.id, myValues.name, myValues.locationDescription, Number(myValues.fullcapacity), Number(myValues.capacity), Number(myValues.status), userId, paginationPage, editLocationMutation))} disabled={submitting} >
					Guardar
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
		{alertType === 'edit' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>La Ubicación {myValues.name} fue editado con éxito.</span>}
		/>
		}
	</div>
);

LocationEdit.propTypes = {
	userId: PropTypes.string.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionEditLocation: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	editLocationMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.object.isRequired,
};

LocationEdit = reduxForm({
	form: 'LocationEdit',
})(LocationEdit);

const selector = formValueSelector('LocationEdit');

const mapStateToProps = state => ({
	id: state.ReducerLocation.id,
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerLocation.alertType,
	alertOpen: state.ReducerLocation.alertOpen,
	paginationPage: state.ReducerLocation.paginationPage,
	myValues: selector(state, 'name', 'locationDescription', 'fullcapacity', 'capacity', 'status'),
	initialValues: state.ReducerLocation,
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditLocation: (
		id,
		name,
		locationDescription,
		fullcapacity,
		capacity,
		status,
		updatedBy,
		paginationPage,
		editLocationMutation,
	) => dispatch(editLocation(
		id,
		name,
		locationDescription,
		fullcapacity,
		capacity,
		status,
		updatedBy,
		paginationPage,
		editLocationMutation,
	)),
});

export default compose(
	graphql(EDIT_LOCATION, { name: 'editLocationMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(LocationEdit);
