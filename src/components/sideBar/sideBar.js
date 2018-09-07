import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Drawer, List, Divider,	IconButton } from '@material-ui/core';

import Items from './Items';
import { closeSideBar } from '../../actions/Header/actionsCreators';
import logo from './images/logo.svg';
import styles from './sidebarCss';

const SideBar = ({ openDrawer, actionCloseSideBar, classes }) => (
	<div>
		<Drawer variant='permanent' classes={{ paper: classNames(classes.drawerPaper, !openDrawer && classes.drawerPaperClose) }} open={openDrawer} >

			<div className={classes.toolbar}>
				<img src={logo} className={classes.logo} alt='Logo Delete' width='150px' />
				<IconButton onClick={actionCloseSideBar}>
					{classes.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</div>
			<Divider />
			<List>{ Items }</List>
		</Drawer>
	</div>
);

SideBar.propTypes = {
	classes: PropTypes.object.isRequired,
	openDrawer: PropTypes.bool.isRequired,
	actionCloseSideBar: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	openDrawer: state.ReducerHeader.openDrawer,
});

const mapDispatchToProps = dispatch => ({
	actionCloseSideBar: () => dispatch(closeSideBar()),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(SideBar);
