import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import IdleTimer from 'react-idle-timer';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SideBar from './components/sideBar/sideBar';
import Header from './components/Header/header';
import styles from './components/Header/headerCss';
import Main from './components/Main/main';
import Login from './components/Login/login';
import { requestLogout } from './actions/Login/actionsCreators';

const App = ({ auth, classes, actionLogout }) => (
	<div>
		{!auth &&
			<Login />
		}

		{auth &&
			<IdleTimer
				ref={(ref) => { this.idleTimer = ref; }}
				element={document}
				onIdle={() => actionLogout(localStorage.getItem('token'))}
				timeout={1000 * 60}
			>

				<div className={classes.root}>
					<Header />
					<SideBar />
					<Main class={classes} />
				</div>
			</IdleTimer>
		}
	</div>
);

App.propTypes = {
	classes: PropTypes.object.isRequired,
	auth: PropTypes.bool.isRequired,
	actionLogout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	auth: state.ReducerLogin.auth,
});

const mapDispatchToProps = dispatch => ({
	actionLogout: token => dispatch(requestLogout(token)),
});

export default compose(
	withRouter,
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(App);
