import React from 'react';
import PropTypes from 'prop-types';

import Block from '@material-ui/icons/Block';
import Edit from '@material-ui/icons/Edit';
import Cancel from '@material-ui/icons/Cancel';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
} from '@material-ui/core';


const UserType = ({ data: { loading, user } }) => (
	<div>
		{!loading &&
			<div>
				<h3>
					Tipo de Usuario graphql
					{user.name}
				</h3>

				<h5>
					Agregar Nuevo
				</h5>

				<Paper >
					<Table >
						<TableHead>
							<TableRow>
								<TableCell>Nombre</TableCell>
								<TableCell>Opciones</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							<TableRow>
								<TableCell>Nombre</TableCell>
								<TableCell>
									<Edit /> <Cancel />	<Block />
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Paper>
			</div>
		}
	</div>
);

UserType.protype = {
	data: PropTypes.object.isRequired,
};

const user = gql`
	query {
		user(id: 1) {
			name
			birthDate
			dni
			email
		}
	}
`;
export default graphql(user)(UserType);
