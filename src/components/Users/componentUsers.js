import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Users from './users';
import { setSearchUsers } from '../../actions/Search/actionCreatorSearchRoles';
import styles from './usersCss';

const ComponentUsers = ({
	query,
	actionSetSearchUsers,
	classes,
}) => (
	<div>
		<h5 className={classes.title}>
			Usuarios
		</h5>

		<div className={classes.search}>
			<h5 className={classes.searchAlignRigth}>
				<Link to='/users-create' href='/users-create' >
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
				onChange={actionSetSearchUsers}
				placeholder='Buscar'
				value={query}
			/>
		</div>
		<Users query={query} />
	</div>
);

ComponentUsers.propTypes = {
	query: PropTypes.string.isRequired,
	actionSetSearchUsers: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	query: state.ReducerSearchUsers.query,
});

const mapDispatchToProps = dispatch => ({
	actionSetSearchUsers: e => dispatch(setSearchUsers(e.target.value)),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ComponentUsers);
