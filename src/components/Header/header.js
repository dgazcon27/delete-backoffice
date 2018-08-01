/* eslint no-extra-boolean-cast: "off" */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	MenuItem,
	Menu,
} from '@material-ui/core';

import styles from './headerCss';
import { requestLogout } from '../../actions/Login/actionsCreators';
import {
	openProfile,
	closeProfile,
	openSideBar,
} from '../../actions/Header/actionsCreators';

// import logo from './images/logo.svg';

const Header = ({
	classes,
	openMenuProfile,
	openDrawer,
	actionOpenProfile,
	actionLogout,
	actionOpenSideBar,
	actionCloseProfile,
}) => (
	<div>
		<AppBar	position='absolute'	className={classNames(classes.appBar, openDrawer && classes.appBarShift)}>
			<Toolbar disableGutters={!openDrawer}>
				<IconButton	color='inherit'	aria-label='open drawer' onClick={actionOpenSideBar} className={classNames(classes.menuButton, openDrawer && classes.hide)}>
					<MenuIcon />
				</IconButton>

				<Typography variant='title' color='inherit' className={classes.flex} noWrap>
					logo
				</Typography>

				<div>
					<IconButton	aria-owns={Boolean(openMenuProfile) ? 'menu-appbar' : null} onClick={actionOpenProfile} color='inherit'>
						<AccountCircle />
					</IconButton>
					<Menu id='menu-appbar' anchorEl={openMenuProfile} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top',	horizontal: 'right' }}	open={Boolean(openMenuProfile)}	onClose={actionCloseProfile}>
						<MenuItem onClick={actionCloseProfile}>Profile</MenuItem>
						<MenuItem onClick={actionLogout}>Logout</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	</div>
);


Header.propTypes = {
	classes: PropTypes.object.isRequired,
	openMenuProfile: PropTypes.object,
	openDrawer: PropTypes.bool.isRequired,
	actionOpenSideBar: PropTypes.func.isRequired,
	actionOpenProfile: PropTypes.func.isRequired,
	actionCloseProfile: PropTypes.func.isRequired,
	actionLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
	openMenuProfile: null,
};

const mapStateToProps = state => ({
	token: state.ReducerLogin.token,
	openDrawer: state.ReducerHeader.openDrawer,
	openMenuProfile: state.ReducerHeader.openMenuProfile,
});

const mapDispatchToProps = dispatch => ({
	actionOpenSideBar: () => dispatch(openSideBar()),
	actionOpenProfile: event => dispatch(openProfile(event)),
	actionCloseProfile: () => dispatch(closeProfile()),
	actionLogout: (event, token) => dispatch(requestLogout(token)),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Header);
