import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import BudgetList from './BudgetList';
import { addAccess } from '../../actions/Event/actionsCreators';

class PreBudgetList extends React.Component {
	constructor(props) {
		super(props);
		this.id = 0;
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.dispatch(addAccess(parseInt(id, 10)));
	}

	render() {
		return (<BudgetList />);
	}
}

PreBudgetList.propTypes = {
	dispatch: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
};

export default compose(connect())(PreBudgetList);
