import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CsvDownloader from 'react-csv-downloader';
import {
	compose,
	Query,
} from 'react-apollo';

import { GET_ALL_PAYMENTS } from '../../queries/payment';
import { getValue } from './commonFunctions';
import { preSCV, ExportModal } from '../commonComponent';
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
	classes,
}) => {
	// Consulta por default del component
	const QUERY_COMPONENT = objectQuery.queryComponent;
	const path = window.location.pathname;
	// const exp = /\/expense-per-event\/[1-9]*/g;
	// const exp2 = /\/income-per-event\/[1-9]*/g;

	// const showExport = !!((path.match(exp) || path.match(exp2)));
	const showExport = false;
	const showExport2 = (path === '/payment');
	/*
		Parametros adicionales de la Consulta por default
		Esto se utiliza cuando una query ademas de esperar la
		el numero de pagina espera uno o mas valores adicionales
	*/
	let paramsGetComponent = '';
	if (objectQuery.paramsQueryComponent !== undefined &&
		Object.keys(objectQuery.paramsQueryComponent).length > 0) {
		paramsGetComponent = objectQuery.paramsQueryComponent;
	}

	// Consulta utilizando el buscador
	const QUERY_SEARCH = objectQuery.querySearch;
	const params = query.length > 0 ?
		{ query: QUERY_SEARCH, variables: { query, currentPageSearch } } :
		{ query: QUERY_COMPONENT, variables: { paginationPage, ...paramsGetComponent } };
	// Ruta para obtener la data y el total del json de la consulta QUERY_COMPONENT
	const { dataPath, totalPath } = objectPath.currentComponent;

	// Ruta para obtener la data y el total del json de la consulta QUERY_SEARCH
	const dataSearchPath = objectPath.searchComponent.dataPath;
	const totalSearchPath = objectPath.searchComponent.totalPath;

	// titlesColumns es un array de objetos que representas las columnas
	// arrayActive es un vector de tipo booleno que indica que botones estan activos
	const { titlesColumns, arrayActive, urls } = objectList;
	const keyId = !objectList.keyId ? 'id' : objectList.keyId;
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
				let datas = [];
				datas = preSCV(response, showExport2);
				return (
					<div>
						{ showExport &&
						<Button variant='extendedFab' aria-label='Import' className={classes.exportButton}>
							<CsvDownloader datas={datas} filename={`${path}`} >
								<p className={classes.searchAlignRigth}>
									Exportar como Excel
								</p>
							</CsvDownloader>
						</Button>
						}
						{ showExport2 &&
						<Button variant='extendedFab' aria-label='Import' className={classes.exportPurchaseReq}>
							<ExportModal pass={GET_ALL_PAYMENTS} />
						</Button>
						}
						<List
							dataToShow={response}
							titlesColumns={titlesColumns}
							activeOptions={arrayActive}
							urlsOptions={urls}
							keyId={keyId}
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
		urls: PropTypes.object,
		keyId: PropTypes.string,
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
	classes: PropTypes.object.isRequired,
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
