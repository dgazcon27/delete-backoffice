import React from 'react';
import Block from '@material-ui/icons/Block';
import Edit from '@material-ui/icons/Edit';
import Cancel from '@material-ui/icons/Cancel';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
} from '@material-ui/core';

const UserType = () => (
	<div>
		<h3>
			Tipo de Usuario
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
						<TableCell> Nombre</TableCell>
						<TableCell>
							<Edit/> <Cancel/> <Block/>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Paper>
	</div>
);

export default UserType;
