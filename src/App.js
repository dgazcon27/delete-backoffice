import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header/header';
import SideBar from './components/sideBar/sideBar';
import { withStyles } from '@material-ui/core/styles';
import styles from './components/Header/headerCss';
import Main from './components/Main/main';

const App = ({ classes }) => (
	<div className={classes.root}>
		<Header />
		<SideBar />
		<Main class={classes} />
	</div>
);

App.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
