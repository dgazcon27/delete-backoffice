import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	setEmail,
	setPassword,
	requestLogin,
} from '../../actions/Login/actionsCreators';


const Login = ({
	email,
	password,
	actionLogin,
	actionSetEmail,
	actionSetPassword,

}) => (
	<div>
		Email <input type='email' defaultValue={email} onChange={actionSetEmail} />
		password <input type='password' defaultValue={password} onChange={actionSetPassword} />
		<button type='submit' onClick={() => actionLogin(email, password)}> Enviar </button>
	</div>
);

Login.propTypes = {
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	actionLogin: PropTypes.func.isRequired,
	actionSetEmail: PropTypes.func.isRequired,
	actionSetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	email: state.ReducerLogin.email,
	password: state.ReducerLogin.password,
});

const mapDispatchToProps = dispatch => ({
	actionLogin: (email, password) => dispatch(requestLogin(email, password)),
	actionSetEmail: e => dispatch(setEmail(e.target.value)),
	actionSetPassword: e => dispatch(setPassword(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
