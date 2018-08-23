import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
	graphql,
	compose,
} from 'react-apollo';
import {
	Field,
	reduxForm,
	formValueSelector,
} from 'redux-form';
import styles from './usersCss';
import './styles.css';
import {
	empty,
	required,
} from '../validations/validations';
import { SET_PASSWORD } from '../../queries/users';
import { renderPasswordField } from '../RenderFields/renderFields';
import {
	closeAlert,
	setPassword,
} from '../../actions/users/actionsCreators';

let ModalPassword = ({
	classes,
	myValues,
	submitting,
	handleSubmit,
	actionSetPassword,
	setPasswordMutation,
}) => (
	<div><h4>Cambiar Contraseña</h4>
		<form>
			<Field
				name='password'
				type='password'
				component={renderPasswordField}
				validate={[required, empty]}
				label='Contraseña'
				className='yourclass'
			/>
			<Field
				name='confirmation'
				type='password'
				component={renderPasswordField}
				validate={[required, empty]}
				label='Confirmación'
				className='yourclass'
			/>
			<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionSetPassword(myValues.password, myValues.confirmation, setPasswordMutation))} disabled={submitting} >
				Crear
			</button>
			<Link to='/users' href='/users' className={classes.returnButton} >
				Regresar
			</Link>
		</form>
	</div>
);

ModalPassword.propTypes = {
	myValues: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionSetPassword: PropTypes.func.isRequired,
	setPasswordMutation: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
};

ModalPassword = reduxForm({
	form: 'ModalPassword',
})(ModalPassword);

const selector = formValueSelector('ModalPassword');

const mapStateToProps = state => ({
	paginationPage: state.ReducerUserType.paginationPage,
	myValues: selector(state, 'password', 'confirmation'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionSetPassword: (
		password,
		confirmation,
		setPasswordMutation,
	) => dispatch(setPassword(
		password,
		confirmation,
		setPasswordMutation,
	)),
});

export default compose(
	graphql(SET_PASSWORD, { name: 'setPasswordMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ModalPassword);

