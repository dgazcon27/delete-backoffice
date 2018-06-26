import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import styles from './css/loginCss';
import logo from './image/logo-delete.svg';

import {
	setEmail,
	setPassword,
	requestLogin,
} from '../../actions/Login/actionsCreators';

const Login = ({
	error,
	email,
	password,
	actionLogin,
	actionSetEmail,
	actionSetPassword,
	classes,
}) => {
	const html = document.querySelector('html');
	html.setAttribute('style', 'background-color: #eceff1');

	return (
		<div>
			<Grid container className={classes.centerLogo}>
				<img src={logo} alt='Logo Delete' width='500px' />
			</Grid>

			<Grid container className={classes.centerLogin}>
				<div className={`${classes.paper} ${classes.login}`}>
					<label className={classes.label} htmlFor='Email'>
						Usuario o email
						<input
							className={classes.inputs}
							type='email'
							defaultValue={email}
							onChange={actionSetEmail}
							placeholder='Email'
						/>
					</label>

					<label className={classes.label} htmlFor='password'>
						Contraseña
						<input
							className={classes.inputs}
							type='password'
							defaultValue={password}
							onChange={actionSetPassword}
							placeholder='Contraseña'
						/>
					</label>

					<div className={classes.marginButtons}>
						<a href='/' className={classes.recoverPassword}>Olvidé mi contraseña</a>
						<Button
							className={classes.enterButton}
							color='primary'
							onClick={() => actionLogin(email, password)}
							variant='raised'
						>
							Ingresar
						</Button>
					</div>
				</div>
				{error &&
					<div className={classes.error}>
						Usuario y contraseña no concuerdan
					</div>
				}
			</Grid>
		</div>
	);
};

Login.propTypes = {
	error: PropTypes.bool.isRequired,
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	actionLogin: PropTypes.func.isRequired,
	actionSetEmail: PropTypes.func.isRequired,
	actionSetPassword: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	error: state.ReducerLogin.error,
	email: state.ReducerLogin.email,
	password: state.ReducerLogin.password,
});

const mapDispatchToProps = dispatch => ({
	actionLogin: (email, password) => dispatch(requestLogin(email, password)),
	actionSetEmail: e => dispatch(setEmail(e.target.value)),
	actionSetPassword: e => dispatch(setPassword(e.target.value)),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Login);
