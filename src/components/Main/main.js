import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Dashboard, Presale, BoxOffice } from '../hola';
import UserType from '../UserType/userType';
import UserTypeCreate from '../UserType/userTypeCreate';
import Users from '../Users/users';

const Main = (props) => {
	const classes = props.class;
	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<Switch>
				<Route exact path='/' component={Dashboard} />
				<Route path='/dashboard' component={Dashboard} />
				<Route path='/pre-sale' component={Presale} />
				<Route path='/box-office' component={BoxOffice} />
				<Route path='/user-type' component={UserType} />
				<Route path='/user-type-create' component={UserTypeCreate} />
				<Route path='/users' component={Users} />
			</Switch>
		</main>
	);
};

Main.propTypes = {
	class: PropTypes.object.isRequired,
};

export default Main;
