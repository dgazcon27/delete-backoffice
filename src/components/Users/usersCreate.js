import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	graphql,
	compose,
	Query,
} from 'react-apollo';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
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
	renderSelectField,
	renderPasswordField,
} from '../RenderFields/renderFields';
import {
	GET_ROLES,
	CREATE_USER,
	GET_COUNTRYS,
} from '../../queries/users';
import {
	closeAlert,
	createUser,
} from '../../actions/users/actionsCreators';

const Roles = () => (
	<Query query={GET_ROLES}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='role'
						type='select'
						label='Tipo de Usuario'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) return 'Error!';
			return (
				<Field
					name='role'
					type='select'
					label='Tipo de Usuario'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.roless.map(role => (
						<MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

const Countrys = () => (
	<Query query={GET_COUNTRYS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='citizenship'
						type='select'
						label='Citizenship'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) return 'Error!';
			return (
				<Field
					name='citizenship'
					type='select'
					label='Citizenship'
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

let UsersCreate = ({
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
	<div><h4>Nuevo Usuario</h4>
		<div className={classes.createContainer}>
			<form>
				<Field
					name='dni'
					type='text'
					component={renderTextField}
					validate={[required, empty]}
					label='CI/Pasaporte'
					className='yourclass'
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
					validate={required}
					label='Fecha de Nacimiento'
					className='yourclass container'
				/>
				<Field
					name='email'
					type='text'
					component={renderTextField}
					validate={[required, email, empty]}
					label='Correo'
				/>
				<Roles />
				<Field
					name='phone'
					type='text'
					component={renderTextField}
					validate={[required, empty]}
					label='Teléfono'
				/>
				<Countrys />
				<Field
					name='password'
					type='password'
					component={renderPasswordField}
					validate={[required, empty]}
					label='Contraseña'
					className='yourclass'
				/>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionCreateUser(myValues, myValues.name, myValues.email, myValues.password, myValues.lastName, myValues.phone, myValues.dni, myValues.birthDate, Number(myValues.role), Number(myValues.citizenship), createUserMutation, paginationPage))} disabled={submitting} >
					Crear
				</button>
				<Link to='/users' href='/users' className={classes.returnButton} >
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
					message={<span id='message-id'>El usuario fue creado con éxito.</span>}
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
	paginationPage: PropTypes.number.isRequired,
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
		createUserMutation,
		paginationPage,
	)),
});

export default compose(
	graphql(CREATE_USER, { name: 'createUserMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UsersCreate);
