import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
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
	getTokenMutation,

}) => (
	<div>
		Email <input type='email' defaultValue={email} onChange={actionSetEmail} />
		password <input type='password' defaultValue={password}  onChange={actionSetPassword} />
		<button type='submit' onClick={() => actionLogin(email, password, getTokenMutation)}> Enviar </button>
	</div>

);

const GET_TOKEN_LOGIN = gql`
	mutation getTokenLoginMutation($email: String!, $password: String!) {
		createToken(email: $email, password: $password) {
			token
		}
	}
`;


const mapStateToprops = state => ({
	email: state.ReducerLogin.email,
	password: state.ReducerLogin.password,
});

const mapDispatchToProps = dispatch => ({
	actionLogin: (email, password, getTokenMutation) => dispatch(requestLogin(email, password, getTokenMutation)),
	actionLogout: () => dispatch(logout()),
	actionSetEmail: (e) => dispatch(setEmail(e.target.value)),
	actionSetPassword: (e) => dispatch(setPassword(e.target.value)),
});

/* graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
export default (Login); */

export default compose (
	graphql(GET_TOKEN_LOGIN, { name: 'getTokenMutation' }),
	connect(mapStateToprops, mapDispatchToProps)
)(Login);