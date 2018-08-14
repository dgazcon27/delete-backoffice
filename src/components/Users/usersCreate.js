import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
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
import Snackbar from '@material-ui/core/Snackbar';
import styles from './usersCss';
import {
	required,
	empty,
} from '../validations/validations';
import {
	renderTextField,
	renderSelectField,
	renderDateField,
} from '../RenderFields/renderFields';
import {
	GET_ROLES,
	CREATE_USER,
} from '../../queries/users';
import {
	closeAlert,
	createUser,
} from '../../actions/users/actionsCreators';

let UsersCreate = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionCreateUser,
	createUserMutation,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div>
		<h4>Nuevo Rol</h4>
		<div className={classes.createContainer}>
			<form>
				<Field
					name='dni'
					type='text'
					component={renderTextField}
					validate={[required, empty]}
					label='CI/Pasaporte'
				/>
				<Field
					name='name'
					type='text'
					component={renderTextField}
					validate={[required, empty]}
					label='Nombre'
				/>
				<Field
					name='lastName'
					type='text'
					component={renderTextField}
					validate={[required, empty]}
					label='Apellido'
					className='yourclass'
				/>
				<Field
					name='birthDate'
					type='date'
					component={renderDateField}
					validate={[required, empty]}
					label='Fecha de Nacimiento'
					className='yourclass'
				/>
				<Field
					name='email'
					type='email'
					component={renderTextField}
					validate={required}
					label='Correo'
					className='yourclass'
				/>
				<Query query={GET_ROLES}>
					{({ loading, error, data }) => {
						if (loading) {
							return (
								<Field
									name='role'
									type='select'
									label='Tipo de Usuario'
									component={renderSelectField}
								>
									<MenuItem />
								</Field>
							);
						}
						if (error) return 'Error!';
						return (
							<Field
								name='roles'
								type='select'
								label='Tipo de Usuario'
								component={renderSelectField}
							>
								{data.roless.map(role => (
									<MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
								))}
							</Field>
						);
					}}
				</Query>
				<Field
					name='phone'
					type='text'
					component={renderTextField}
					validate={required}
					label='Teléfono'
					className='yourclass'
				/>
				<Field
					name='citizenship'
					type='text'
					component={renderTextField}
					validate={required}
					label='Citizenship'
					className='yourclass'
				/>
				<Field
					name='password'
					type='password'
					component={renderTextField}
					validate={[required, empty]}
					label='Password'
					className='yourclass'
				/>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionCreateUser(myValues, myValues.name, myValues.email, myValues.password, myValues.lastName, myValues.phone, myValues.dni, myValues.birthDate, 1, 1, createUserMutation, 1))} disabled={submitting} >
					Crear
				</button>
				<Link to='/user-type' href='/user-type' className={classes.returnButton} >
					Regresar
				</Link>
			</form>
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
					message={<span id='message-id'>El rol {myValues.name} fue creado con exito.</span>}
				/>
			}
		</div>
	</div>
);

UsersCreate.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreateUser: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createUserMutation: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

UsersCreate = reduxForm({
	form: 'UsersCreate',
})(UsersCreate);

const selector = formValueSelector('UsersCreate');

const mapStateToProps = state => ({
	alertType: state.ReducerUserType.alertType,
	alertOpen: state.ReducerUserType.alertOpen,
	myValues: selector(state, 'name', 'email', 'password', 'lastName', 'phone', 'dni', 'birthDate', 'role', 'citizenship'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCreateUser: (
		myValues,
		name,
		email,
		password,
		lastName,
		phone,
		dni,
		birthDate,
		role,
		citizenship,
		createUserMutation,
		paginationPage,
	) =>
		dispatch(createUser(
			myValues,
			name,
			email,
			password,
			lastName,
			phone,
			dni,
			birthDate,
			role,
			citizenship,
			createUserMutation,
			paginationPage,
		)),
});

export default compose(
	graphql(CREATE_USER, { name: 'createUserMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UsersCreate);
