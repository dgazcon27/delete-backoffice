import React from 'react';

import { Link } from 'react-router-dom';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import VpnKey from '@material-ui/icons/VpnKey';

import {
	Switch,
	Tooltip,
	TableCell,
	IconButton,

} from '@material-ui/core';

const Options = () => (
	<TableCell>
		{
			<Tooltip
				enterDelay={200}
				id='tooltip-controlled'
				leaveDelay={100}
				placement='top'
				title='Editar Rol.'
			>
				<Link to='/user-type-edit' href='/user-type-edit'>
					<IconButton>
						<Edit />
					</IconButton>
				</Link>
			</Tooltip>
		}
		{
			<Tooltip
				enterDelay={200}
				id='tooltip-controlled'
				leaveDelay={100}
				placement='top'
				title='Eliminar Rol'
			>
				<IconButton>
					<Delete />
				</IconButton>
			</Tooltip>
		}
		{
			<Tooltip
				enterDelay={200}
				id='tooltip-controlled'
				leaveDelay={100}
				placement='top'
				title='Bloquear / Desbloquear'
			>
				<Switch />
			</Tooltip>
		}
		{
			<Tooltip
				enterDelay={200}
				id='tooltip-controlled'
				leaveDelay={100}
				placement='top'
				title='Cambiar Contraseña'
			>
				<IconButton>
					<VpnKey />
				</IconButton>
			</Tooltip>
		}
	</TableCell>
);

export default Options;
