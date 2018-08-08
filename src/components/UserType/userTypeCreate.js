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
}) => (
	<div>
		<h4>Nuevo Rol</h4>
		<div className={classes.createContainer}>
			<Field
				name='name'
				label='Name'
				type='text'
				component='input'
				placeholder='Name'
			/>
			<Field
				name='rolDescription'
				type='text'
				label='rolDescription'
				component='input'
				placeholder='Descripcion'
			/>
			<Link to='/user-type' href='/user-type' className={classes.createButton} type='submit' onClick={e => e.preventDefault(actionCreateRol(myValues.name, myValues.rolDescription, paginationPage, createRolMutation))}>
			Crear
			</Link>
			<Link to='/user-type' href='/user-type' className={classes.createButton} >
			Regresar
			</Link>
			{alertType === 'name' &&
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={alertOpen}
					onClose={() => { setTimeout(actionCloseAlert, 100); }}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={<span id='message-id'>No puede crear un rol sin nombre.</span>}
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
