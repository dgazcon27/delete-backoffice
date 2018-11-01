import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/Menu/MenuItem';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { Field } from 'redux-form';
import Select from 'material-ui/Select';
import './styles.css';
import { required } from '../validations/validations';
import { renderSelectField } from '../RenderFields/renderFields';
import { GET_COUNTRYS } from '../../queries/users';
import { changeState } from '../../actions/users/actionsCreators';

const Countrys = ({ actionChangeState, state }) => (
	<Query query={GET_COUNTRYS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='citizenship'
						type='select'
						label='Ciudadanía'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) return 'Error!';
			return (
				<div>
					<Select
						value={1}
						fullWidth
						type='select'
						className='container'
						onClick={() => { actionChangeState(1); }}
					>
						{data.countrys.map(country => (
							<MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
						))}
					</Select>
					<Select
						value={1}
						fullWidth
						type='select'
						className='container'
					>
						{state.map(states => (
							<MenuItem key={states.id} value={states.id}>{states.name}</MenuItem>
						))}
					</Select>
				</div>
			);
		}}
	</Query>
);

const mapStateToProps = state => ({
	state: state.ReducerUser.state,
});

Countrys.propTypes = {
	actionChangeState: PropTypes.func.isRequired,
	state: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
	actionChangeState: countryId => dispatch(changeState(countryId)),
});

const country = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Countrys);

export default country;
