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
import {
	renderPasswordField,
	renderConfirmationField,
} from '../RenderFields/renderFields';
import {
	closeAlert,
	closeModal,
	setPassword,
} from '../../actions/users/actionsCreators';

const validate = (values) => {
	const errors = {};

	if ((values.password === values.confirmation)) {
		errors.confirmation = false;
	} else {
		errors.confirmation = true;
	}

	return errors;
};

const warn = (values) => {
	const warnings = {};

	if (values.password === values.confirmation) {
		warnings.confirmation = 'Este campo es obligatorio';
	} else {
		warnings.confirmation = 'Debe coincidir con la contraseña';
	}
	return warnings;
};

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
	<div className={classes.backgroundModal}><h4>Cambiar Contraseña</h4>
		<form>
			<Field
				name='password'
				type='password'
				component={renderPasswordField}
				label='Contraseña'
				className='yourclass'
				validate={[required, empty]}
			/>
			<Field
				name='confirmation'
				type='password'
				component={renderConfirmationField}
				label='Confirmación'
				className='yourclass'
				validate={[required, empty]}
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
	validate,
	warn,
})(ModalPassword);

const selector = formValueSelector('ModalPassword');

const mapStateToProps = state => ({
	id: state.ReducerUser.id,
	paginationPage: state.ReducerPagination.paginationPage,
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

