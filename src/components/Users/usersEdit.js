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
	empty,
	required,
} from '../validations/validations';
import {
	renderTextField,
	renderDateField,
} from '../RenderFields/renderFields';
import { EDIT_USER } from '../../queries/users';
import {
	closeAlert,
	editUser,
} from '../../actions/users/actionsCreators';
import Title from '../Shared/title';
import BackButton from '../widget/BackButton';
import {
	Roles,
	Citizenship,
} from '../commonComponent';

let UsersEdit = ({
	userId,
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionEditUser,
	editUserMutation,
	paginationPage,
	initialValues,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div>
		<Title title='Usuarios' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Editar Usuario</h6>
				<div className='row'>
					<div className='input-field col s6'>
						<Field
							name='dni'
							type='number'
							component={renderTextField}
							validate={[required, empty]}
							label='CI/Pasaporte'
							className='yourclass'
						/>
					</div>

					<div className='input-field col s6'>
						<Field
							name='name'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Nombre'
						/>
					</div>
					<div className='input-field col s6'>
						<Field
							name='lastName'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Apellido'
							className='yourclass'
						/>
					</div>
					<div className='input-field col s6'>
						<Field
							name='birthDate'
							type='date'
							component={renderDateField}
							validate={required}
							label='Fecha de Nacimiento'
							className='yourclass container'
						/>
					</div>
					<div className='input-field col s6'>
						<Roles name='role' />
					</div>
					<div className='input-field col s6'>
						<Field
							name='phone'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Teléfono'
						/>
					</div>
					<div className='input-field col s6'>
						<Citizenship />
					</div>
					<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionEditUser(myValues, initialValues.id, myValues.name, myValues.lastName, myValues.phone, myValues.dni, myValues.birthDate, Number(myValues.role), Number(myValues.citizenship), Number(userId), editUserMutation, paginationPage))} disabled={submitting} >
						Guardar
					</button>
					<BackButton />
				</div>
			</form>
		</Paper>
		{alertType === 'editado' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>El usuario fue editado con éxito.</span>}
		/>
		}
	</div>
);

UsersEdit.propTypes = {
	userId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionEditUser: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	editUserMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.object.isRequired,
};

UsersEdit = reduxForm({
	form: 'UsersEdit',
	enableReinitialize: true,
})(UsersEdit);

const selector = formValueSelector('UsersEdit');

const mapStateToProps = state => ({
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerUser.alertType,
	alertOpen: state.ReducerUser.alertOpen,
	paginationPage: state.ReducerPagination.paginationPage,
	initialValues: state.ReducerUser,
	myValues: selector(state, 'name', 'password', 'lastName', 'phone', 'dni', 'birthDate', 'role', 'citizenship'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionEditUser: (
		myValues,
		id,
		name,
		lastName,
		phone,
		dni,
		birthDate,
		role,
		citizenship,
		updatedBy,
		editUserMutation,
		paginationPage,
	) => dispatch(editUser(
		myValues,
		id,
		name,
		lastName,
		phone,
		dni,
		birthDate,
		role,
		citizenship,
		updatedBy,
		editUserMutation,
		paginationPage,
	)),
});

export default compose(
	graphql(EDIT_USER, { name: 'editUserMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UsersEdit);
