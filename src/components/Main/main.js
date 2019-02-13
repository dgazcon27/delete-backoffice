import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import UserType from '../UserType/userType';
import Bank from '../Bank/bank';
import BankCreate from '../Bank/bankCreate';
import BankAccount from '../Bank/bankAccount';
import BankAccountCreate from '../Bank/bankAccountCreate';
import UserTypeCreate from '../UserType/userTypeCreate';
import Users from '../Users/users';
import UsersCreate from '../Users/usersCreate';
import Zone from '../Zone/zone';
import NewUsersCreate from '../Users/newUsersCreate';
import ZoneCreate from '../Zone/zoneCreate';
import LocationCreate from '../Location/locationCreate';
import Location from '../Location/location';
import Event from '../Event/event';
import EventCreate from '../Event/eventCreate';
import Hotel from '../Hotel/Hotel';
import HotelCreate from '../Hotel/HotelCreate';
import EditHotel from '../Hotel/HotelEdit';
import PurchaseRequestCreate from '../PurchaseRequest/PurchaseReqCreate';
import ComponentPurchase from '../PurchaseRequest/ComponentPurchase';
import PayCreate from '../PurchaseRequest/PayCreate';
import Payment from '../Payment/payment';
import Access from '../Access/access';
import AccessCreate from '../Access/accessCreate';
import EditionComponent from '../Shared/editionComponent';
import CreateGuest from '../Guest/createGuest';
import Guest from '../Guest/guest';
import AccessEventCreate from '../Event/accessEventCreate';
import ClassAccessEventEdit from '../Event/accessEventEdit';
import PreAccessList from '../Event/preAccessList';
import Reservation from '../Reservation/reservation';
import ReservationCreate from '../Reservation/reservationCreate';
import ReservationPayment from '../Reservation/reservationPayment';
import Room from '../Room/room';
import RoomCreate from '../Room/roomCreate';
import Tokens from '../Tokens/tokens';
import TokensReservation from '../Tokens/tokensReservation';
import IncomeCreate from '../Movement/incomeCreate';
import ExpensesCreate from '../Movement/expensesCreate';
import IncomeUpdate from '../Movement/incomeUpdate';
import Income from '../Movement/income';
import Expenses from '../Movement/expenses';
import IncomePerEvent from '../Movement/IncomePerEvent';
import ExpensePerEvent from '../Movement/ExpensePerEvent';
import Provider from '../Provider/provider';
import ProviderCreate from '../Provider/providerCreate';
import Ticket from '../Ticket/ticket';
import AssignTicket from '../Ticket/AssignTicket';
import TicketCreate from '../Ticket/ticketCreate';
import Table from '../Table/table';
import TableCreate from '../Table/tableCreate';
import Presale from '../Presale/presale';
import PresaleCreate from '../Presale/presaleCreate';
import Currency from '../Currency/currency';
import CurrencyCreate from '../Currency/currencyCreate';
import CurrencyHasEventCreate from '../Currency/currencyHasEventCreate';
import CurrencyHasEvent from '../Currency/currencyHasEvent';
import ExchangeRate from '../ExchangeRate/exchangeRate';
import ExchangeRateCreate from '../ExchangeRate/exchangeRateCreate';

const Main = (props) => {
	const classes = props.class;
	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<Switch>
				<Route exact path='/' component={ComponentPurchase} />
				<Route exact path='/currency' component={Currency} />
				<Route path='/currency-create' component={CurrencyCreate} />
				<Route path='/currency-edit/:id' component={EditionComponent} />
				<Route path='/hotel' component={Hotel} />
				<Route path='/hotel-edit/:id' component={EditHotel} />
				<Route path='/hotel-create' component={HotelCreate} />
				<Route path='/payment' component={Payment} />
				<Route path='/users' component={Users} />
				<Route path='/users-create' component={UsersCreate} />
				<Route path='/new-users-create' component={NewUsersCreate} />
				<Route path='/users-edit/:id' component={EditionComponent} />
				<Route path='/user-type' component={UserType} />
				<Route path='/user-type-edit/:id' component={EditionComponent} />
				<Route path='/user-type-create' component={UserTypeCreate} />
				<Route path='/tables' component={Location} />
				<Route path='/create-tables' component={LocationCreate} />
				<Route path='/edit-tables/:id' component={EditionComponent} />
				<Route path='/events' component={Event} />
				<Route path='/events-create' component={EventCreate} />
				<Route path='/income' component={Income} />
				<Route path='/expenses' component={Expenses} />
				<Route path='/event-edit/:id' component={EditionComponent} />
				<Route path='/zones' component={Zone} />
				<Route path='/Departments-create' component={ZoneCreate} />
				<Route path='/Departments-edit/:id' component={EditionComponent} />
				<Route path='/purchase-request-create' component={PurchaseRequestCreate} />
				<Route path='/pay/:id' component={PayCreate} />
				<Route path='/purchase-request-edit/:id' component={EditionComponent} />
				<Route path='/bank' component={Bank} />
				<Route path='/bank-account' component={BankAccount} />
				<Route path='/bank-create' component={BankCreate} />
				<Route path='/bank-account-create' component={BankAccountCreate} />
				<Route path='/bank-edit/:id' component={EditionComponent} />
				<Route path='/bank-account-edit/:id' component={EditionComponent} />
				<Route path='/pre-sale' component={Payment} />
				<Route path='/pre-sale-edit/:id' component={EditionComponent} />
				<Route path='/access' component={Access} />
				<Route path='/access-create' component={AccessCreate} />
				<Route path='/access-edit/:id' component={EditionComponent} />
				<Route path='/guests' component={Guest} />
				<Route path='/guest-create' component={CreateGuest} />
				<Route path='/guest-edit/:id' component={EditionComponent} />
				<Route path='/event-access/:id' component={PreAccessList} />
				<Route path='/event-access-create/:id' component={AccessEventCreate} />
				<Route path='/event-access-edit/:id/:fk' component={ClassAccessEventEdit} />
				<Route path='/reservation' component={Reservation} />
				<Route path='/reservation-create' component={ReservationCreate} />
				<Route path='/reservation-edit/:id' component={EditionComponent} />
				<Route path='/reservation-payment/:id' component={ReservationPayment} />
				<Route path='/room' component={Room} />
				<Route path='/room-create' component={RoomCreate} />
				<Route path='/room-edit/:id' component={EditionComponent} />
				<Route path='/tokens' component={Tokens} />
				<Route path='/tokens-reservation' component={TokensReservation} />
				<Route path='/movement/income/create' component={IncomeCreate} />
				<Route path='/movement/income/event/create/:id' component={IncomeCreate} />
				<Route path='/movement/expenses/event/create/:id' component={ExpensesCreate} />
				<Route path='/movement/expenses/create' component={ExpensesCreate} />
				<Route path='/movement/income/update/:id' component={IncomeUpdate} />
				<Route path='/movement/expenses/update/:id' component={IncomeUpdate} />
				<Route path='/movement/income/show/:id' component={IncomeUpdate} />
				<Route path='/movement/expenses/show/:id' component={IncomeUpdate} />
				<Route path='/income-per-event/:id' component={IncomePerEvent} />
				<Route path='/expense-per-event/:id' component={ExpensePerEvent} />
				<Route path='/providers' component={Provider} />
				<Route path='/provider-create' component={ProviderCreate} />
				<Route path='/provider-edit/:id' component={EditionComponent} />
				<Route path='/provider-details/:id' component={EditionComponent} />
				<Route path='/Ticket' component={Ticket} />
				<Route path='/ticket-assign' component={AssignTicket} />
				<Route path='/ticket-create' component={TicketCreate} />
				<Route path='/table' component={Table} />
				<Route path='/table-create' component={TableCreate} />
				<Route path='/presale' component={Presale} />
				<Route path='/presale-create' component={PresaleCreate} />
				<Route exact path='/currency/events/create' component={CurrencyHasEventCreate} />
				<Route exact path='/currency/events' component={CurrencyHasEvent} />
				<Route path='/exchangeRate' component={ExchangeRate} />
				<Route path='/update-exchange-rate/:id' component={EditionComponent} />
				<Route path='/create-exchange' component={ExchangeRateCreate} />
			</Switch>
		</main>
	);
};

Main.propTypes = {
	class: PropTypes.object.isRequired,
};

export default Main;
