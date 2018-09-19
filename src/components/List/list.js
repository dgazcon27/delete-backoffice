/* eslint prefer-destructuring: 'off' */

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

import styles from './userTypeCss';
import Options from './options';

/*
 * @param {Object} obj - Es un objeto que contiene toda la informacion de la fila
 * @param {String} jsonPath - Es un string que contiene la ruta a acceder
 * en el Object (Primer parametro).
*/

const getValue = (obj, jsonPath) => {
	let value = obj;
	const arrayJsonPath = jsonPath.split('.');

	if (arrayJsonPath.length > 1) {
		for (let i = 0; i < arrayJsonPath.length; i += 1) {
			value = Object.getOwnPropertyDescriptor(value, arrayJsonPath[i]).value;
		}
		return value;
	}
	return obj[arrayJsonPath[0]];
};

const getIdElement = (idRow, idColumn) => (
	String(idRow) + String(idColumn)
);

const List = ({ data, titles, classes }) => {
	const arrayActive = [true, true, true, true];
	return (
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
										<Options buttonsActives={arrayActive} />
									</TableRow>
								))
							}
						</TableBody>
					</Table>
				</Paper>
			</div>
		</div>
	);
};


List.propTypes = {
	data: PropTypes.array.isRequired,
	titles: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	data: ownProps.dataToShow,
	titles: ownProps.titlesColumns,
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, null),
)(List);
