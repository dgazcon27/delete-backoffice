import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './headerCss';
import { openSideBar, openProfile, closeProfile } from '../../actions/Header/actionsCreators';

import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	MenuItem,
	Menu,
} from '@material-ui/core';


const Header = ({
	actionOpenSideBar,
	openMenuProfile,
	openDrawer,
	actionOpenProfile,
	actionCloseProfile,
	classes,
}) => (
	<div>
		<AppBar	position='absolute'	className={classNames(classes.appBar, openDrawer && classes.appBarShift)}>
			<Toolbar disableGutters={!openDrawer}>
				<IconButton	color='inherit'	aria-label='open drawer' onClick={actionOpenSideBar} className={classNames(classes.menuButton, openDrawer && classes.hide)}>
					<MenuIcon />
				</IconButton>

				<Typography variant='title' color='inherit' className={classes.flex} noWrap>
					Logo
				</Typography>

				<div>
					<IconButton	aria-owns={openMenuProfile ? 'menu-appbar' : null} onClick={actionOpenProfile} color='inherit'>
						<AccountCircle />
					</IconButton>
					<Menu id='menu-appbar' anchorEl={openMenuProfile} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top',	horizontal: 'right' }}	open={openMenuProfile}	onClose={actionCloseProfile}>
						<MenuItem onClick={closeProfile}>Profile</MenuItem>
						<MenuItem onClick={closeProfile}>Logout</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	</div>
);


Header.propTypes = {
	classes: PropTypes.object.isRequired,
	actionOpenSideBar: PropTypes.func.isRequired,
	openMenuProfile: PropTypes.element.isRequired,
	openDrawer: PropTypes.bool.isRequired,
	actionOpenProfile: PropTypes.func.isRequired,
	actionCloseProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	openDrawer: state.ReducerHeader.openDrawer,
	openMenuProfile: state.ReducerHeader.openMenuProfile,
});

const mapDispatchToProps = dispatch => ({
	actionOpenSideBar: () => dispatch(openSideBar()),
	actionOpenProfile: event => dispatch(openProfile(event)),
	actionCloseProfile: () => dispatch(closeProfile()),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Header);
