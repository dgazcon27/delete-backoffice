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
import styles from '../Shared/sharedStyles';
import './styles.css';
import {
	empty,
	required,
	email,
} from '../validations/validations';
import {
	renderTextField,
	renderDateField,
	renderNumberField,
} from '../RenderFields/renderFields';
import { NEW_CREATE_USER } from '../../queries/users';
import {
	closeAlert,
	newCreateUser,
} from '../../actions/users/actionsCreators';
import Title from '../Shared/title';
import BackButton from '../widget/BackButton';
import { Citizenship } from '../commonComponent';

let NewUsersCreate = ({
	userId,
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionNewCreateUser,
	createNewUserMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div>
		<Title title='Ventas' />
		<Paper className={classes.createContainer}>
			<form>
				<h6 className={classes.formTitle}>Nuevo Usuario</h6>
				<div className='row'>
					<div className='input-field col s6'>
						<Field
							name='dni'
							type='number'
							component={renderNumberField}
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
						<Citizenship />
					</div>
				</div>
				<div className={classes.centered}>
					<button
						className={classes.createButton}
						type='submit'
						onClick={handleSubmit(() => actionNewCreateUser(
							myValues,
							myValues.name,
							myValues.email,
							myValues.lastName,
							myValues.phone,
							myValues.dni,
							myValues.birthDate,
							Number(myValues.citizenship),
							Number(userId),
							Number(userId),
							createNewUserMutation,
							paginationPage,
						))}
						disabled={submitting}
					>
						Crear
					</button>
					<BackButton />
				</div>
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

NewUsersCreate.propTypes = {
	userId: PropTypes.number.isRequired,
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionNewCreateUser: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createNewUserMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

NewUsersCreate = reduxForm({
	form: 'NewUsersCreate',
})(NewUsersCreate);

const selector = formValueSelector('NewUsersCreate');

const mapStateToProps = state => ({
	userId: state.ReducerLogin.userId,
	alertType: state.ReducerUser.alertType,
	alertOpen: state.ReducerUser.alertOpen,
	paginationPage: state.ReducerUser.paginationPageUsers,
	myValues: selector(state, 'name', 'email', 'password', 'lastName', 'phone', 'dni', 'citizenship'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionNewCreateUser: (
		myValues,
		name,
		emaill,
		lastName,
		phone,
		dni,
		citizenship,
		createdBy,
		updatedBy,
		createNewUserMutation,
		paginationPage,
	) => dispatch(newCreateUser(
		myValues,
		name,
		emaill,
		lastName,
		phone,
		dni,
		citizenship,
		createdBy,
		updatedBy,
		createNewUserMutation,
		paginationPage,
	)),
});

export default compose(
	graphql(NEW_CREATE_USER, { name: 'createNewUserMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(NewUsersCreate);
