import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import UserType from '../UserType/userType';
import UserTypeCreate from '../UserType/userTypeCreate';
import UserTypeEdit from '../UserType/userTypeEdit';
import Users from '../Users/users';
import {
	Dashboard,
	Presale,
	Tables,
	Guests,
	Events,
	Djs,
	Categories,
	Departments,
	Staff,
} from '../hola';

const Main = (props) => {
	const classes = props.class;
	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<Switch>
				<Route exact path='/' component={Dashboard} />
				<Route path='/users' component={Users} />
				<Route path='/user-type' component={UserType} />
				<Route path='/user-type-edit' component={UserTypeEdit} />
				<Route path='/user-type-create' component={UserTypeCreate} />
				<Route path='/tables' component={Tables} />
				<Route path='/guests' component={Guests} />
				<Route path='/events' component={Events} />
				<Route path='/djs' component={Djs} />
				<Route path='/categories' component={Categories} />
				<Route path='/Departments' component={Departments} />
				<Route path='/pre-sale' component={Presale} />
				<Route path='/staff' component={Staff} />
			</Switch>
		</main>
	);
};

Main.propTypes = {
	class: PropTypes.object.isRequired,
};

export default Main;
