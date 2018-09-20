import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
	graphql,
	compose,
} from 'react-apollo';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import styles from './usersCss';
import './styles.css';
import {
	empty,
	required,
	email,
} from '../validations/validations';
import {
	renderTextField,
	renderDateField,
	renderPasswordField,
} from '../RenderFields/renderFields';
import { CREATE_USER } from '../../queries/users';
import {
	closeAlert,
	createUser,
} from '../../actions/users/actionsCreators';

import BackButton from '../widget/BackButton';
import {
	Roles,
	SelectCountry,
} from '../commonComponent';

let UsersCreate = ({
	userId,
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionCreateUser,
	createUserMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div><h3 className={classes.formTitle}>Usuario</h3>
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nuevo Usuario</h6>
				<div className='row'>
					<div className='input-field col s6'>
						<Field
							name='dni'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='CI/Pasaporte'
							className='yourclass'
						/>
					</div>
					<div className='input-field col s6' >
						<Field
							name='name'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Nombre'
						/>
					</div>
					<div className='input-field col s6 l6'>
						<Field
							name='lastName'
							type='text'
							component={renderTextField}
							validate={[required, empty]}
							label='Apellido'
							className='yourclass'
						/>
					</div>
					<div className='col s6 l6'>
						<Field
							name='birthDate'
							type='date'
							component={renderDateField}
							validate={required}
							label='Fecha de nacimiento'
							className='yourclass container date-label'
						/>
					</div>
					<div className='input-field col s6'>
						<Field
							name='email'
							type='text'
							component={renderTextField}
							validate={[required, email, empty]}
							label='Correo'
						/>
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
						<Roles />
					</div>
					<div className='input-field col s6'>
						<SelectCountry />
					</div>
					<div className='input-field col s6'>
						<Field
							name='password'
							type='password'
							component={renderPasswordField}
							validate={[required, empty]}
							label='Contraseña'
							className='yourclass'
						/>
					</div>

				</div>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionCreateUser(myValues, myValues.name, myValues.email, myValues.password, myValues.lastName, myValues.phone, myValues.dni, myValues.birthDate, Number(myValues.role), Number(myValues.citizenship), Number(userId), Number(userId), createUserMutation, paginationPage))} disabled={submitting} >
					Crear
				</button>
				<BackButton />
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
			message={<span id='message-id'>No puede crear un rol sin {alertType}</span>}
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
			message={<span id='message-id'>El Rol que intenta crear ya existe verifique el nombre he intente de nuevo.</span>}
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
			message={<span id='message-id'>No puede crear un rol sin {alertType}</span>}
		/>
		}
		{alertType === 'creado' &&
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={alertOpen}
			onClose={() => { setTimeout(actionCloseAlert, 100); }}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id='message-id'>El usuario fue creado con éxito.</span>}
		/>
		}
	</div>
);

UsersCreate.propTypes = {
	userId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreateUser: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createUserMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

UsersCreate = reduxForm({
	form: 'UsersCreate',
})(UsersCreate);

const selector = formValueSelector('UsersCreate');

const mapStateToProps = state => ({
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerUserType.alertType,
	alertOpen: state.ReducerUserType.alertOpen,
	paginationPage: state.ReducerUserType.paginationPage,
	myValues: selector(state, 'name', 'email', 'password', 'lastName', 'phone', 'dni', 'birthDate', 'role', 'citizenship'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCreateUser: (
		myValues,
		name,
		emaill,
		password,
		lastName,
		phone,
		dni,
		birthDate,
		role,
		citizenship,
		createdBy,
		updatedBy,
		createUserMutation,
		paginationPage,
	) => dispatch(createUser(
		myValues,
		name,
		emaill,
		password,
		lastName,
		phone,
		dni,
		birthDate,
		role,
		citizenship,
		createdBy,
		updatedBy,
		createUserMutation,
		paginationPage,
	)),
});

export default compose(
	graphql(CREATE_USER, { name: 'createUserMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UsersCreate);
