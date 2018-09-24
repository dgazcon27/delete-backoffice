import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	TableRow,
	TableFooter,
	TablePagination,
} from '@material-ui/core';

import {
	changePage,
	changePageSearch,
} from '../../actions/List/actionsCreators';

const Pagination = ({
	total,
	query,
	paginationPage,
	currentPage,
	currentPageSearch,
	actionChangePage,
	actionChangePageSearch,
}) => (
	<TableFooter>
		<TableRow>
			{query.length > 0 &&
				<TablePagination
					count={total}
					rowsPerPage={10}
					page={currentPageSearch}
					rowsPerPageOptions={[10]}
					colSpan={3}
					onChangePage={(event, nextPage) => {
						actionChangePageSearch(currentPageSearch, nextPage);
					}}
				/>
			}

			{ query.length === 0 &&
				<TablePagination
					count={total}
					rowsPerPage={10}
					page={paginationPage}
					rowsPerPageOptions={[10]}
					colSpan={6}
					onChangePage={(event, nextPage) => {
						actionChangePage(currentPage, nextPage);
					}}
				/>
			}
		</TableRow>
	</TableFooter>
);

Pagination.defaultProps = {
	query: '',
};

Pagination.propTypes = {
	total: PropTypes.number.isRequired,
	query: PropTypes.string,
	paginationPage: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	currentPageSearch: PropTypes.number.isRequired,
	actionChangePage: PropTypes.func.isRequired,
	actionChangePageSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	total: ownProps.total,
	query: state.ReducerSearch.query,
	paginationPage: state.ReducerPagination.paginationPage,
	paginationPageSearch: state.ReducerPagination.paginationPageSearch,
	currentPage: state.ReducerPagination.currentPage,
	currentPageSearch: state.ReducerPagination.currentPageSearch,

});

const mapDispatchToProps = dispatch => ({
	actionChangePage: (currentPage, paginationPage) =>
		dispatch(changePage(currentPage, paginationPage)),
	actionChangePageSearch: (currentPage, paginationPage) =>
		dispatch(changePageSearch(currentPage, paginationPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
