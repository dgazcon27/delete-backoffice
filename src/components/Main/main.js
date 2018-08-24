import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import ComponentUserType from '../UserType/componentUserType';
import Bank from '../Bank/bank';
import BankCreate from '../Bank/bankCreate';
import BankAccount from '../Bank/bankAccount';
import BankAccountCreate from '../Bank/bankAccountCreate';
import BankEdit from '../Bank/bankEdit';
import BankAccountEdit from '../Bank/bankAccountEdit';
import UserTypeCreate from '../UserType/userTypeCreate';
import UserTypeEdit from '../UserType/userTypeEdit';
import Users from '../Users/users';
import UsersCreate from '../Users/usersCreate';
import UsersEdit from '../Users/usersEdit';
import Zone from '../Zone/zone';
import ZoneCreate from '../Zone/zoneCreate';
import ZoneEdit from '../Zone/zoneEdit';
import {
	Dashboard,
	Presale,
	Tables,
	Guests,
	Events,
	Djs,
	Categories,
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
				<Route path='/users-create' component={UsersCreate} />
				<Route path='/users-edit' component={UsersEdit} />
				<Route path='/user-type' component={ComponentUserType} />
				<Route path='/user-type-edit' component={UserTypeEdit} />
				<Route path='/user-type-create' component={UserTypeCreate} />
				<Route path='/tables' component={Tables} />
				<Route path='/guests' component={Guests} />
				<Route path='/events' component={Events} />
				<Route path='/djs' component={Djs} />
				<Route path='/categories' component={Categories} />
				<Route path='/Departments' component={Zone} />
				<Route path='/Departments-create' component={ZoneCreate} />
				<Route path='/Departments-edit' component={ZoneEdit} />
				<Route path='/pre-sale' component={Presale} />
				<Route path='/staff' component={Staff} />
				<Route path='/bank' component={Bank} />
				<Route path='/bank-account' component={BankAccount} />
				<Route path='/bank-create' component={BankCreate} />
				<Route path='/bank-account-create' component={BankAccountCreate} />
				<Route path='/bank-edit' component={BankEdit} />
				<Route path='/bank-account-edit' component={BankAccountEdit} />
			</Switch>
		</main>
	);
};

Main.propTypes = {
	class: PropTypes.object.isRequired,
};

export default Main;
