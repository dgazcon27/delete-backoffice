import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Location from './location';
import { setSearch } from '../../actions/Search/actionCreatorSearchRoles';
import styles from './locationCss';

const ComponentLocation = ({
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
				<Link to='/create-tables' href='/create-tables' >
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
				value={query}
			/>
		</div>
		<Location isSearching={searching} query={query} />
	</div>
);

ComponentLocation.propTypes = {
	query: PropTypes.string.isRequired,
	searching: PropTypes.bool.isRequired,
	actionSetSearch: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	query: state.ReducerSearchLocation.query,
	searching: state.ReducerSearchLocation.isSearching,
});

const mapDispatchToProps = dispatch => ({
	actionSetSearch: e => dispatch(setSearch(e.target.value)),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ComponentLocation);
