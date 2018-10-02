import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
	compose,
	Query,
} from 'react-apollo';

import { getValue } from './commonFunctions';

import styles from './userTypeCss';
import List from './list';

import Loading from '../Loading/loading';

const ContainerList = ({
	objectQuery,
	objectList,
	objectModal,
	objectPath,
	objectAction,
	query,
	paginationPage,
	currentPageSearch,
}) => {
	// Consulta por default del component
	const QUERY_COMPONENT = objectQuery.queryComponent;

	// Consulta utilizando el buscador
	const QUERY_SEARCH = objectQuery.querySearch;

	const params = query.length > 0 ?
		{ query: QUERY_SEARCH, variables: { query, currentPageSearch } } :
		{ query: QUERY_COMPONENT, variables: { paginationPage } };

	// Ruta para obtener la data y el total del json de la consulta QUERY_COMPONENT
	const { dataPath, totalPath } = objectPath.currentComponent;

	// Ruta para obtener la data y el total del json de la consulta QUERY_SEARCH
	const dataSearchPath = objectPath.searchComponent.dataPath;
	const totalSearchPath = objectPath.searchComponent.totalPath;

	// titlesColumns es un array de objetos que representas las columnas
	// arrayActive es un vector de tipo booleno que indica que botones estan activos
	const { titlesColumns, arrayActive } = objectList;

	return (
		<Query {...params}>
			{({ loading, error, data }) => {
				if (loading) {
					return (
						<div>
							<Loading />
						</div>
					);
				}
				if (error) {
					return (
						<div> Error :( </div>
					);
				}

				const response = query.length > 0 ?
					getValue(data, dataSearchPath) :
					getValue(data, dataPath);
				const total = query.length > 0 ?
					getValue(data, totalSearchPath) :
					getValue(data, totalPath);

				return (
					<div>
						<List
							dataToShow={response}
							titlesColumns={titlesColumns}
							activeOptions={arrayActive}
							itemTotal={total}
							actions={objectAction}
							propsModalComponent={objectModal}
						/>
					</div>
				);
			}}
		</Query>
	);
};

ContainerList.propTypes = {
	objectQuery: PropTypes.object.isRequired,
	objectSearch: PropTypes.shape({
		showButton: PropTypes.bool,
		showSearch: PropTypes.bool,
		titleButton: PropTypes.string,
		url: PropTypes.string,
	}).isRequired,
	objectList: PropTypes.shape({
		titlesColumns: PropTypes.arrayOf(PropTypes.object),
		arrayActive: PropTypes.arrayOf(PropTypes.bool),
	}).isRequired,
	objectModal: PropTypes.shape({
		componentState: PropTypes.object.isRequired,
		paginationPage: PropTypes.number.isRequired,
		messages: PropTypes.shape({
			edit: PropTypes.shape({
				title: PropTypes.string,
			}),
			block: PropTypes.shape({
				titleStatus1: PropTypes.string,
				msgStatus1: PropTypes.string,
				titleStatus2: PropTypes.string,
				msgStatus2: PropTypes.string,
			}),
			delete: PropTypes.shape({
				title: PropTypes.string,
				msg: PropTypes.string,
			}),
		}).isRequired,
	}).isRequired,
	objectPath: PropTypes.shape({
		currentComponent: PropTypes.shape({
			dataPath: PropTypes.string.isRequired,
			totalPath: PropTypes.string.isRequired,
		}),
		searchComponent: PropTypes.shape({
			dataPath: PropTypes.string.isRequired,
			totalPath: PropTypes.string.isRequired,
		}),
	}).isRequired,

	objectAction: PropTypes.object.isRequired,
	query: PropTypes.string.isRequired,
	paginationPage: PropTypes.number.isRequired,
	currentPageSearch: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	objectQuery: ownProps.queries,
	objectSearch: ownProps.propsSearchComponent,
	objectList: ownProps.propsListComponent,
	objectModal: ownProps.propsModalComponent,
	objectPath: ownProps.objectPath,
	objectAction: ownProps.actions,
	query: state.ReducerSearch.query,
	paginationPage: state.ReducerPagination.paginationPage,
	currentPageSearch: state.ReducerPagination.currentPageSearch,
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, null),
)(ContainerList);
