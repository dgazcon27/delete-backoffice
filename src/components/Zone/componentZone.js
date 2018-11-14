import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Zone from './zone';
import { setSearchZones } from '../../actions/Search/actionCreatorSearchRoles';
import BackButton from '../widget/BackButton';
import styles from '../Shared/sharedStyles';

const ComponentZone = ({
	query,
	actionSetSearch,
	classes,
}) => (
	<div>
		<h5 className={classes.title}>
			Zonas
			<div className={classes.backbutton}>
				<BackButton />
			</div>
		</h5>

		<div className={classes.search}>
			<h5 className={classes.searchAlignRigth}>
				<Link to='/Departments-create' href='/Departments-create' >
					<Button variant='extendedFab' aria-label='Delete' className={classes.addNew}>
						<Add className={classes.marginIcon} />
						Crear Zona
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
		<Zone query={query} />
	</div>
);

ComponentZone.propTypes = {
	query: PropTypes.string.isRequired,
	actionSetSearch: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	query: state.ReducerSearchZone.query,
});

const mapDispatchToProps = dispatch => ({
	actionSetSearch: e => dispatch(setSearchZones(e.target.value)),
});


export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ComponentZone);
