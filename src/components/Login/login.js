import React from 'react';
import { connect } from 'react-redux';

import {
	login,
	logout,
} from '../../actions/Login/actionsCreators';

const handleSubmit = (event) => {
	event.preventDefault();
	console.log(event.target);
}

const Login = ({
	email,
	password,
	actionLogin,
	actionLogout,

}) => (
	<form onSubmit={actionLogin}>
		Email <input type='email' value={email} />
		password <input type='password' value={password} />
		<button type='submit'> Enviar </button>
	</form>
);

const mapStateToprops = state => ({
	email: state.reducerLogin.email,
	password: state.reducerLogin.password,
});

const mapDispatchToProps = dispatch => ({
	actionLogin: () => dispatch(login()),
	actionLogout: () => dispatch(logout()),
});

export default Login;