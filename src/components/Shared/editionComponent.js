import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { getEventById } from '../../actions/Event/actionsCreators';
import EventEdit from '../Event/eventEdit';

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
