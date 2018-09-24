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

/*
 * @param {Object} obj - Es un objeto que contiene toda la informacion de la fila
 * @param {String} jsonPath - Es un string que contiene la ruta a acceder
 * en el Object (Primer parametro).
*/

const List = ({
	data,
	titles,
	activeOptions,
	total,
	classes,
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
							<TableCell className={classes.alignRightOption} >Opciones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							data.map(obj => (
								<TableRow key={getValue(obj, 'id')}>
									{
										titles.map((column, index) => (
											<TableCell key={getIdElement(getValue(obj, 'id'), index)}>{getValue(obj, column.jsonPath)}</TableCell>
										))
									}
									<Options activeButtons={activeOptions} />
								</TableRow>
							))
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
	total: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	data: ownProps.dataToShow,
	titles: ownProps.titlesColumns,
	activeOptions: ownProps.activeOptions,
	total: ownProps.itemTotal,
	query: state.ReducerSearch.query,
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, null),
)(List);
