import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import AccessC from './accessEventCreate';
import { setIdAccessEventCreate } from '../../actions/Event/actionsCreators';

class PreAccessCreate extends React.Component {
	constructor(props) {
		super(props);
		this.id = 0;
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.dispatch(setIdAccessEventCreate(parseInt(id, 10)));
	}

	render() {
		return (<AccessC />);
	}
}

PreAccessCreate.propTypes = {
	dispatch: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
};

export default compose(connect())(PreAccessCreate);
