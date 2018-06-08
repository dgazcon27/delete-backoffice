import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Login/login';
import { Dashboard, Presale, BoxOffice } from '../hola';
import UserType from '../UserType/userType';

const Main = (props) => {
	const classes = props.class;

	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<Switch>
				<Route exact path='/' component={Login} />
				<Route path='/dashboard' component={Dashboard} />
				<Route path='/pre-sale' component={Presale} />
				<Route path='/box-office' component={BoxOffice} />
				<Route path='/user-type' component={UserType} />
			</Switch>
		</main>
	);
};

export default Main;
