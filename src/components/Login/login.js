import React from 'react';
import { connect } from 'react-redux';

import {
	logout,
	setEmail,
	setPassword,
	requestLogin,
} from '../../actions/Login/actionsCreators';


const Login = ({
	email,
	password,
	actionLogin,
	actionLogout,
	actionSetEmail,
	actionSetPassword,

}) => (
	<div>
		Email <input type='email' defaultValue={email} onChange={actionSetEmail} />
		password <input type='password' defaultValue={password}  onChange={actionSetPassword} />
		<button type='submit' onClick={() => actionLogin(email, password)}> Enviar </button>
	</div>

);

const mapStateToprops = state => ({
	email: state.ReducerLogin.email,
	password: state.ReducerLogin.password,
});

const mapDispatchToProps = dispatch => ({
	actionLogin: (email, password) => dispatch(requestLogin(email, password)),
	actionLogout: () => dispatch(logout()),
	actionSetEmail: (e) => dispatch(setEmail(e.target.value)),
	actionSetPassword: (e) => dispatch(setPassword(e.target.value)),
});


export default connect(mapStateToprops, mapDispatchToProps)(Login);
