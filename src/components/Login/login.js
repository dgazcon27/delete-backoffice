import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import logo from './logo-delete.svg';

import {
	setEmail,
	setPassword,
	requestLogin,
} from '../../actions/Login/actionsCreators';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	button: {
		margin: theme.spacing.unit,
	},
	login: {
		'border-radius': '0.3em',
		'-webkit-box-shadow': '1px 3px 8px 3px #8e8e8e73',
		'box-shadow': '1px 3px 8px 3px #8e8e8e73',
		border: '3px solid #455A64',
		padding: '54px',
		'text-align': 'left',
		'background-color': '#ffffff',
	},
	centerLogin: {
		display: 'flex',
		'justify-content': 'center',
		'align-items': 'center',
		height: '60vh',
	},
	enterButton: {
		float: 'right',
		'background-color': '#455A64 !important',
	},
	recoverPassword: {
		float: 'left',
		'margin-top': '0.7vh',
		color: '#90A4AE',
	},
	marginButtons: {
		'margin-top': '8vh',
	},
	centerLogo: {
		display: 'flex',
		'justify-content': 'center',
		'align-items': 'center',
		'margin-top': '15vh',
	},
	label: {
		'font-size': '14px',
	},
	inputs: {
		'font-size': '16px !important',
		'border-bottom': '2px solid #455A64 !important',
	},
});

const Login = ({
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
			</Grid>
		</div>
	);
};

Login.propTypes = {
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	actionLogin: PropTypes.func.isRequired,
	actionSetEmail: PropTypes.func.isRequired,
	actionSetPassword: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
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

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Login);
