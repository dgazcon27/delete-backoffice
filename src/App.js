import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SideBar from './components/sideBar/sideBar';
import Header from './components/Header/header';
import styles from './components/Header/headerCss';
import Main from './components/Main/main';
import Login from './components/Login/login';

const App = ({ auth, classes }) => (
	<div>
		{!auth &&
			<Login />
		}

		{auth &&
			<div className={classes.root}>
				<Header />
				<SideBar />
				<Main class={classes} />
			</div>
		}
	</div>
);

App.propTypes = {
	classes: PropTypes.object.isRequired,
	auth: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	auth: state.ReducerLogin.auth,
});

export default compose(
	withRouter,
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, null),
)(App);
