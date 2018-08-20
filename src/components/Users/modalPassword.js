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
import {
	empty,
	required,
} from '../validations/validations';
import { SET_PASSWORD } from '../../queries/users';
import { renderPasswordField } from '../RenderFields/renderFields';
import {
	closeAlert,
	closeModal,
	setPassword,
} from '../../actions/users/actionsCreators';

let ModalPassword = ({
	id,
	classes,
	myValues,
	submitting,
	handleSubmit,
	paginationPage,
	actionCloseModal,
	actionSetPassword,
	resetPasswordIdUserMutation,
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
			<button className={classes.createButton} type='submit' onClick={handleSubmit(() => actionSetPassword(id, myValues.password, myValues.confirmation, paginationPage, resetPasswordIdUserMutation))} disabled={submitting} >
				Confirmar
			</button>

			<Link to='/users' href='/users' onClick={actionCloseModal} className={classes.returnButton} >
				Cancelar
			</Link>
		</form>
	</div>
);

ModalPassword.propTypes = {
	id: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	submitting: PropTypes.bool.isRequired,
	myValues: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	actionCloseModal: PropTypes.func.isRequired,
	paginationPage: PropTypes.number.isRequired,
	actionSetPassword: PropTypes.func.isRequired,
	resetPasswordIdUserMutation: PropTypes.func.isRequired,
};

ModalPassword = reduxForm({
	form: 'ModalPassword',
})(ModalPassword);

const selector = formValueSelector('ModalPassword');

const mapStateToProps = state => ({
	id: state.ReducerUserType.id,
	paginationPage: state.ReducerUserType.paginationPage,
	myValues: selector(state, 'password', 'confirmation'),
});

const mapDispatchToProps = dispatch => ({
	actionCloseAlert: () => dispatch(closeAlert()),
	actionCloseModal: () => dispatch(closeModal()),
	actionSetPassword: (
		id,
		password,
		confirmation,
		paginationPage,
		setPasswordMutation,
	) => dispatch(setPassword(
		id,
		password,
		confirmation,
		paginationPage,
		setPasswordMutation,
	)),
});

export default compose(
	graphql(SET_PASSWORD, { name: 'resetPasswordIdUserMutation' }),
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ModalPassword);

