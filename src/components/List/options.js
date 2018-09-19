import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import VpnKey from '@material-ui/icons/VpnKey';
import { compose } from 'react-apollo';

import {
	Switch,
	Tooltip,
	TableCell,
	IconButton,

} from '@material-ui/core';

import styles from './userTypeCss';

const Options = ({ classes, active }) => (
	<TableCell className={classes.alignRightOption}>
		{active[0] &&
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
		{active[1] &&
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
		{active[2] &&
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
		{active[3] &&
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

Options.propTypes = {
	classes: PropTypes.object.isRequired,
	active: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	active: ownProps.buttonsActives,
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, null),
)(Options);

