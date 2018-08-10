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
import Snackbar from '@material-ui/core/Snackbar';
import styles from './userTypeCss';
import './styles.css';
import {
	required,
	empty,
} from '../validations/validations';
import { renderTextField }
	from '../RenderFields/renderFields';
import { CREATE_ROL } from '../../queries/userType';
import {
	closeAlert,
	setName,
	setDescription,
	createRol,
} from '../../actions/userType/actionsCreators';

let UserTypeCreate = ({
	classes,
	alertOpen,
	alertType,
	actionCloseAlert,
	actionCreateRol,
	createRolMutation,
	paginationPage,
	myValues,
	submitting,
	handleSubmit,
}) => (
	<div>
		<h4>Nuevo Rol</h4>
		<div className={classes.createContainer}>
			<form>
				<Field
					name='name'
					type='text'
					component={renderTextField}
					validate={[required, empty]}
					label='name'
				/>
				<Field
					name='rolDescription'
					type='text'
					component={renderTextField}
					validate={[required, empty]}
					label='description'
					className='yourclass'
				/>
				<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionCreateRol(myValues.name, myValues.rolDescription, paginationPage, createRolMutation))} disabled={submitting} >
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

UserTypeCreate.propTypes = {
	alertOpen: PropTypes.bool.isRequired,
	alertType: PropTypes.string.isRequired,
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionCreateRol: PropTypes.func.isRequired,
	actionCloseAlert: PropTypes.func.isRequired,
	createRolMutation: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	submitting: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

UserTypeCreate = reduxForm({
	form: 'UserTypeCreate',
})(UserTypeCreate);

const selector = formValueSelector('UserTypeCreate');

const mapStateToProps = state => ({
	alertType: state.ReducerUserType.alertType,
	alertOpen: state.ReducerUserType.alertOpen,
	name: state.ReducerUserType.name,
	descripcion: state.ReducerUserType.descripcion,
	paginationPage: state.ReducerUserType.paginationPage,
	myValues: selector(state, 'name', 'rolDescription'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionSetName: e => dispatch(setName(e.target.value)),
	actionSetDescription: e => dispatch(setDescription(e.target.value)),
	actionCreateRol: (name, descripcion, paginationPage, createRolMutation) =>
		dispatch(createRol(name, descripcion, paginationPage, createRolMutation)),
});

export default compose(
	graphql(CREATE_ROL, { name: 'createRolMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(UserTypeCreate);
