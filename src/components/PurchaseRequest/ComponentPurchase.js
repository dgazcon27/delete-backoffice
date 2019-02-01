import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import PurchaseRequest from './PurchaseRequest';
import { setSearch } from '../../actions/Search/actionCreatorSearchRoles';
import styles from './userTypeCss';

const ComponentPurchase = ({
	query,
	actionSetSearch,
	classes,
}) => (
	<div>
		<h5 className={classes.title}>
			Ventas
		</h5>

		<div className={classes.search}>
			<h5 className={classes.searchAlignRigth}>
				<Link to='/purchase-request-create' href='/purchase-request-create' >
					<Button variant='extendedFab' aria-label='Delete' className={classes.addNew}>
						<Add className={classes.marginIcon} />
						Agregar nuevo
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
		<PurchaseRequest query={query} />
	</div>
);

ComponentPurchase.propTypes = {
	query: PropTypes.string.isRequired,
	actionSetSearch: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	query: state.ReducerSearch.query,
});

const mapDispatchToProps = dispatch => ({
	actionSetSearch: e => dispatch(setSearch(e.target.value)),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ComponentPurchase);
