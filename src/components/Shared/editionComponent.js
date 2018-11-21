import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';

import { getEventById } from '../../actions/Event/actionsCreators';
import { getUserById } from '../../actions/users/actionsCreators';
import { getUserTypeById } from '../../actions/userType/actionsCreators';
import { getLocationById } from '../../actions/location/actionsCreators';
import { getBankById, getAccountById } from '../../actions/BankAccount/actionsCreators';
import { getAccessById } from '../../actions/Access/actionsCreators';
import { getPurchaseById } from '../../actions/PurchaseRequest/actionsCreators';
import { getPaymentById } from '../../actions/Payment/actionsCreators';
import { getZoneById } from '../../actions/zone/actionsCreators';
import { getGuestById } from '../../actions/Guest/actionsCreators';
import { getHotelById } from '../../actions/Hotel/actionsCreators';
import { getReservationById } from '../../actions/Reservation/actionsCreators';

import EventEdit from '../Event/eventEdit';
import UsersEdit from '../Users/usersEdit';
import UserTypeEdit from '../UserType/userTypeEdit';
import LocationEdit from '../Location/locationEdit';
import BankEdit from '../Bank/bankEdit';
import BankAccountEdit from '../Bank/bankAccountEdit';
import AccessEdit from '../Access/accessEdit';
import PurchaseRequestEdit from '../PurchaseRequest/PurchaseReqEdit';
import PaymentEdit from '../Payment/paymentEdit';
import ZoneEdit from '../Zone/zoneEdit';
import UpdateGuest from '../Guest/editGuest';
import EditHotel from '../Hotel/HotelEdit';
import ReservationEdit from '../Reservation/reservationEdit';

class EditionComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = { tag: null };
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		const type = this.props.match.url.split('/')[1];
		this.initialize(id, type);
	}

	initialize(id, type) {
		let fk = {};
		switch (type) {
			case 'users-edit':
				this.props.dispatch(getUserById(id));
				this.setState({ tag: <UsersEdit /> });
				break;
			case 'user-type-edit':
				this.props.dispatch(getUserTypeById(id));
				this.setState({ tag: <UserTypeEdit /> });
				break;
			case 'edit-tables':
				this.props.dispatch(getLocationById(id));
				this.setState({ tag: <LocationEdit /> });
				break;
			case 'guest-edit':
				this.props.dispatch(getGuestById(id));
				this.setState({ tag: <UpdateGuest /> });
				break;
			case 'event-edit':
				this.props.dispatch(getEventById(id));
				this.setState({ tag: <EventEdit /> });
				break;
			case 'bank-edit':
				this.props.dispatch(getBankById(id));
				this.setState({ tag: <BankEdit /> });
				break;
			case 'bank-account-edit':
				this.props.dispatch(getAccountById(id));
				this.setState({ tag: <BankAccountEdit /> });
				break;
			case 'access-edit':
				this.props.dispatch(getAccessById(id));
				this.setState({ tag: <AccessEdit /> });
				break;
			case 'purchase-request-edit':
				this.props.dispatch(getPurchaseById(id));
				this.setState({ tag: <PurchaseRequestEdit /> });
				break;
			case 'pre-sale-edit':
				({ fk } = this.props.match.params);
				this.props.dispatch(getPaymentById(id));
				this.setState({ tag: <PaymentEdit /> });
				break;
			case 'Departments-edit':
				this.props.dispatch(getZoneById(id));
				this.setState({ tag: <ZoneEdit /> });
				break;
			case 'hotel-edit':
				this.props.dispatch(getHotelById(id));
				this.setState({ tag: <EditHotel /> });
				break;
			case 'reservation-edit':
				this.props.dispatch(getReservationById(id));
				this.setState({ tag: <ReservationEdit /> });
				break;
			default:
				break;
		}
	}

	render() {
		return (this.state.tag);
	}
}

EditionComponent.propTypes = {
	dispatch: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
};

export default compose(connect())(EditionComponent);
