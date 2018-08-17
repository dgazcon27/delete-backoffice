import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import UserType from './userType';
import { setSearch } from '../../actions/Search/actionCreatorSearchRoles';
import styles from './userTypeCss';

const ComponentUserType = ({
	query,
	searching,
	actionSetSearch,
	classes,
}) => (
	<div>
		<h5 className={classes.title}>
			Roles
		</h5>

		<div className={classes.search}>
			<h5 className={classes.searchAlignRigth}>
				<Link to='/user-type-create' href='/user-type-create' >
					<Button variant='extendedFab' aria-label='Delete' className={classes.addNew}>
						<Add className={classes.marginIcon} />
						Agregar Nuevo
					</Button>
				</Link>
			</h5>
			<input
				id='search'
				className={classes.searchSize}
				type='search'
				onChange={actionSetSearch}
				placeholder='Buscar'
			/>
		</div>
		<UserType isSearching={searching} query={query} />
	</div>
);

ComponentUserType.propTypes = {
	query: PropTypes.string.isRequired,
	searching: PropTypes.bool.isRequired,
	actionSetSearch: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	query: state.ReducerSearchRoles.query,
	searching: state.ReducerSearchRoles.isSearching,
});

const mapDispatchToProps = dispatch => ({
	actionSetSearch: e => dispatch(setSearch(e.target.value)),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ComponentUserType);
