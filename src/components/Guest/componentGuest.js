import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { setSearchInvited } from '../../actions/Search/actionCreatorSearchRoles';
import Guest from './guest';
import styles from '../Shared/sharedStyles';
import BackButton from '../widget/BackButton';

const ComponentInvited = ({
	query,
	actionSearchInvited,
	classes,
}) => (
	<div>
		<h5 className={classes.title}>
			Invitados
			<div className={classes.backbutton}>
				<BackButton />
			</div>
		</h5>


		<div className={classes.search}>
			<h5 className={classes.searchAlignRigth}>
				<Link to='/guest-create' href='/guest-create' >
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
		<Guest query={query} />
	</div>
);

ComponentInvited.propTypes = {
	query: PropTypes.string.isRequired,
	actionSearchInvited: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	query: state.ReducerGuest.query,
});

const mapDispatchToProps = dispatch => ({
	actionSearchInvited: e => dispatch(setSearchInvited(e.target.value)),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(ComponentInvited);
