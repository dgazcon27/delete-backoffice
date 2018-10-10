import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';

import { getEventById } from '../../actions/Event/actionsCreators';
import { getUserById } from '../../actions/users/actionsCreators';
import { getUserTypeById } from '../../actions/userType/actionsCreators';
import { getLocationById } from '../../actions/location/actionsCreators';
import { getBankById, getAccountById } from '../../actions/Bank/actionsCreators';
import { getAccessById } from '../../actions/Access/actionsCreators';
import { getPurchaseById } from '../../actions/PurchaseRequest/actionsCreators';
import { getPaymentById } from '../../actions/Payment/actionsCreators';
import { getZoneById } from '../../actions/zone/actionsCreators';

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

class EditionComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = { tag: null };
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		this.initialize(id);
	}

	initialize(id) {
		const { type } = this.props.location.state;
		let fk = {};
		switch (type) {
			case 'Event':
				this.props.dispatch(getEventById(id));
				this.setState({ tag: <EventEdit /> });
				break;
			case 'User':
				this.props.dispatch(getUserById(id));
				this.setState({ tag: <UsersEdit /> });
				break;
			case 'UserType':
				this.props.dispatch(getUserTypeById(id));
				this.setState({ tag: <UserTypeEdit /> });
				break;
			case 'Location':
				this.props.dispatch(getLocationById(id));
				this.setState({ tag: <LocationEdit /> });
				break;
			case 'Bank':
				this.props.dispatch(getBankById(id));
				this.setState({ tag: <BankEdit /> });
				break;
			case 'Account':
				this.props.dispatch(getAccountById(id));
				this.setState({ tag: <BankAccountEdit /> });
				break;
			case 'Access':
				this.props.dispatch(getAccessById(id));
				this.setState({ tag: <AccessEdit /> });
				break;
			case 'Purchase':
				this.props.dispatch(getPurchaseById(id));
				this.setState({ tag: <PurchaseRequestEdit /> });
				break;
			case 'Payment':
				({ fk } = this.props.match.params);
				this.props.dispatch(getPaymentById(id, fk));
				this.setState({ tag: <PaymentEdit /> });
				break;
			case 'Zone':
				this.props.dispatch(getZoneById(id));
				this.setState({ tag: <ZoneEdit /> });
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
	location: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
};

export default compose(connect())(EditionComponent);
