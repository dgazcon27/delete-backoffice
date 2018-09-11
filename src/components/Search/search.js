import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import styles from './styleCss';

import setSearch from '../../actions/Search/actionsCreators';

const Search = ({
	showButton,
	showSearch,
	titleButton,
	url,
	query,
	actionSetSearch,
	classes,
}) => (
	<div>
		<div className={classes.search}>
			<h5 className={classes.searchAlignRigth}>
				{ showButton &&
					<Link to={url} href={url} >
						<Button variant='extendedFab' aria-label='Delete' className={classes.addNew}>
							<Add className={classes.marginIcon} />
							{ titleButton }
						</Button>
					</Link>
				}
			</h5>

			{ showSearch &&
				<input
					id='search'
					className={classes.searchSize}
					type='search'
					onChange={actionSetSearch}
					placeholder='Buscar'
					value={query}
				/>
			}
		</div>
	</div>
);

Search.defaultProps = {
	showButton: true,
	showSearch: true,
	titleButton: '',
	url: '/',
};

Search.propTypes = {
	showButton: PropTypes.bool,
	showSearch: PropTypes.bool,
	titleButton: PropTypes.string,
	url: PropTypes.string,
	query: PropTypes.string.isRequired,
	actionSetSearch: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	showButton: ownProps.showButton,
	showSearch: ownProps.showSearch,
	titleButton: ownProps.titleButton,
	url: ownProps.url,
	query: state.ReducerSearch.query,
});

const mapDispatchToProps = dispatch => ({
	actionSetSearch: e => dispatch(setSearch(e.target.value)),
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps),
)(Search);
