import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
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
	getTokenMutation,

}) => (
	<div>
		Email <input type='email' defaultValue={email} onChange={actionSetEmail} />
		password <input type='password' defaultValue={password} onChange={actionSetPassword} />
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

Login.propTypes = {
	email: PropTypes.object.isRequired,
	password: PropTypes.func.isRequired,
	actionLogin: PropTypes.func.isRequired,
	actionSetEmail: PropTypes.func.isRequired,
	actionSetPassword: PropTypes.func.isRequired,
	getTokenMutation: PropTypes.func.isRequired,
};

const mapStateToprops = state => ({
	email: state.ReducerLogin.email,
	password: state.ReducerLogin.password,
});

const mapDispatchToProps = dispatch => ({
	actionLogin: (email, password, getTokenMutation) => dispatch(requestLogin(email, password, getTokenMutation)),
	actionSetEmail: e => dispatch(setEmail(e.target.value)),
	actionSetPassword: e => dispatch(setPassword(e.target.value)),
});

export default compose(
	graphql(GET_TOKEN_LOGIN, { name: 'getTokenMutation' }),
	connect(mapStateToprops, mapDispatchToProps),
)(Login);
