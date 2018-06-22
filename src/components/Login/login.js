import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
		border: '2px solid grey',
		padding: '54px',
	},
	centerLogin: {
		display: 'flex',
		'justify-content': 'center',
		'align-items': 'center',
		height: '100vh',
	},
	enterButton: {
		float: 'right',
	},
	recoverPassword: {
		float: 'left',
		'margin-top': '0.7vh',
	},
	marginButtons: {
		'margin-top': '8vh',
	},
});

const Login = ({
	email,
	password,
	actionLogin,
	actionSetEmail,
	actionSetPassword,
	classes,

}) => (
	<Grid container className={classes.centerLogin}>
		<div className={`${classes.paper} ${classes.login}`}>
			<label htmlFor='Email'>
				Usuario o email
				<input
					type='email'
					defaultValue={email}
					onChange={actionSetEmail}
					placeholder='Email'
				/>
			</label>

			<label htmlFor='password'>
				Contraseña
				<input
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
);

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
