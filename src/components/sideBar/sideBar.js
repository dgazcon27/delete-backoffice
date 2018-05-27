import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import	styles from '../Header/headerCss';
import Items from './Items';
import { closeSideBar } from '../../actions/Header/actionsCreators';

import {
	Drawer,
	List,
	Divider,
	IconButton,
} from '@material-ui/core';

const SideBar = ({ openDrawer, closeSideBar, classes }) => (
	<div>
		<Drawer variant="permanent" classes={{
			paper: classNames(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
		}}
		open={openDrawer} >
			<div className={classes.toolbar}>
			<IconButton onClick={closeSideBar}>
			{classes.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</ IconButton>
			</div>
			<Divider />
			<List>{ Items }</List>
		</Drawer>
	</div>

);

SideBar.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	openDrawer: state.ReducerHeader.openDrawer,
});

const mapDispatchToProps = dispatch => ({
	closeSideBar: () => dispatch(closeSideBar()),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(SideBar);
