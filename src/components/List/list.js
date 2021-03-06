import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';

import {
	Paper,
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
} from '@material-ui/core';

import { getValue, getIdElement } from './commonFunctions';
import styles from './userTypeCss';
import Options from './options';
import Pagination from './pagination';
import ModalsOptions from './modal';

/*
 * @param {Object} obj - Es un objeto que contiene toda la informacion de la fila
 * @param {String} jsonPath - Es un string que contiene la ruta a acceder
 * en el Object (Primer parametro).
*/

const List = ({
	data,
	titles,
	activeOptions,
	urls,
	total,
	classes,
	actions,
	modal,
	id,
}) => (
	<div>
		<div>
			<Paper>
				<Table>
					<TableHead>
						<TableRow>
							{
								titles.map(title => (
									<TableCell key={title.id}>{ title.columName }</TableCell>
								))
							}
							{activeOptions.includes(true) &&
								<TableCell className={classes.alignRightOption} >Opciones</TableCell>
							}
						</TableRow>
					</TableHead>
					<TableBody>
						{
							data.map(obj => (
								<TableRow key={getValue(obj, id)}>
									{
										titles.map((column, index) => (
											<TableCell key={getIdElement(getValue(obj, id), index)}>
												{getValue(obj, column.jsonPath)}
											</TableCell>
										))
									}
									{activeOptions.includes(true) &&
										<Options
											activeButtons={activeOptions}
											actions={actions}
											rowData={obj}
											urls={urls}
										/>
									}
								</TableRow>
							))
						}
						{activeOptions.includes(true) &&
							<ModalsOptions
								componentState={modal}
								actions={actions}
							/>
						}
					</TableBody>
					<Pagination total={total} />
				</Table>
			</Paper>
		</div>
	</div>
);

List.propTypes = {
	data: PropTypes.array.isRequired,
	titles: PropTypes.array.isRequired,
	activeOptions: PropTypes.array.isRequired,
	urls: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	total: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	modal: PropTypes.shape({
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
};

const mapStateToProps = (state, ownProps) => ({
	data: ownProps.dataToShow,
	titles: ownProps.titlesColumns,
	activeOptions: ownProps.activeOptions,
	urls: ownProps.urlsOptions,
	id: ownProps.keyId,
	total: ownProps.itemTotal,
	actions: ownProps.actions,
	modal: ownProps.propsModalComponent,
	query: state.ReducerSearch.query,
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, null),
)(List);
