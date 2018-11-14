import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { setSearchPurchase } from '../../actions/Search/actionCreatorSearchRoles';
import PurchaseRequest from './PurchaseRequest';
import styles from '../Shared/sharedStyles';
import BackButton from '../widget/BackButton';

const ComponentInvited = ({
	query,
	actionSearchInvited,
	classes,
}) => (
	<div>
		<h5 className={classes.title}>
			Ventas
			<div className={classes.backbutton}>
				<BackButton />
			</div>
		</h5>

		<div className={classes.search}>
			<h5 className={classes.searchAlignRigth}>
				<Link to='/purchase-request-create'>
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
				onChange={actionSearchInvited}
				placeholder='Buscar'
				value={query}
			/>
		</div>
		<PurchaseRequest query={query} />
	</div>
);

ComponentInvited.propTypes = {
	query: PropTypes.string.isRequired,
	actionSearchInvited: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	query: state.ReducerPurchaseRequest.query,
});

const mapDispatchToProps = dispatch => ({
	actionSearchInvited: e => dispatch(setSearchPurchase(e.target.value)),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ComponentInvited);
