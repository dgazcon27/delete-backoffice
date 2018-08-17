import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import UserType from './userType';
import { setSearch } from '../../actions/Search/actionCreatorSearchRoles';

const ComponentUserType = ({
	query,
	searching,
	actionSetSearch,
}) => (
	<div>
		<h3>
			Roles
		</h3>
		<h5>
			<Link to='/user-type-create' href='/user-type-create' >
				Agregar Nuevo
			</Link>
		</h5>

		<TextField
			id='search'
			label='Search field'
			type='search'
			margin='normal'
			onChange={actionSetSearch}
		/>

		<UserType isSearching={searching} query={query} />
	</div>
);

ComponentUserType.propTypes = {
	query: PropTypes.string.isRequired,
	searching: PropTypes.bool.isRequired,
	actionSetSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	query: state.ReducerSearchRoles.query,
	searching: state.ReducerSearchRoles.isSearching,
});

const mapDispatchToProps = dispatch => ({
	actionSetSearch: e => dispatch(setSearch(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComponentUserType);
