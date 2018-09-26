import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';

import { getEventById } from '../../actions/Event/actionsCreators';
import { getUserById } from '../../actions/users/actionsCreators';
import { getUserTypeById } from '../../actions/userType/actionsCreators';
import { getLocationById } from '../../actions/location/actionsCreators';
import { getBankById } from '../../actions/Bank/actionsCreators';

import EventEdit from '../Event/eventEdit';
import UsersEdit from '../Users/usersEdit';
import UserTypeEdit from '../UserType/userTypeEdit';
import LocationEdit from '../Location/locationEdit';
import BankEdit from '../Bank/bankEdit';

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
		switch (type) {
			case 'Event':
				// statements_1
				this.props.dispatch(getEventById(id));
				this.setState({ tag: <EventEdit /> });
				break;
			case 'User':
				// statements_1
				this.props.dispatch(getUserById(id));
				this.setState({ tag: <UsersEdit /> });
				break;
			case 'UserType':
				// statements_1
				this.props.dispatch(getUserTypeById(id));
				this.setState({ tag: <UserTypeEdit /> });
				break;
			case 'Location':
				// statements_1
				this.props.dispatch(getLocationById(id));
				this.setState({ tag: <LocationEdit /> });
				break;
			case 'Bank':
				// statements_1
				this.props.dispatch(getBankById(id));
				this.setState({ tag: <BankEdit /> });
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
