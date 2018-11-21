import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Payment from '@material-ui/icons/Payment';
import VpnKey from '@material-ui/icons/VpnKey';
import List from '@material-ui/icons/List';
import Visibility from '@material-ui/icons/Visibility';
import { compose } from 'react-apollo';

import {
	Switch,
	Tooltip,
	TableCell,
	IconButton,

} from '@material-ui/core';

import styles from './userTypeCss';

const Options = ({
	classes,
	active,
	actions,
	rowData,
	urls,
}) => (
	<TableCell className={classes.alignRight}>
		{active[0] && urls.list.type === 'viewList' &&
			<Tooltip
				enterDelay={200}
				id='tooltip-controlled'
				leaveDelay={100}
				placement='top'
				title='Listar'
			>
				<Link to={{ pathname: `${urls.list.path}/${rowData.id}` }}>
					<IconButton>
						<List />
					</IconButton>
				</Link>
			</Tooltip>
		}

		{active[0] && urls.list.type === 'viewModal' &&
			<Tooltip
				enterDelay={200}
				id='tooltip-controlled'
				leaveDelay={100}
				placement='top'
				title='Listar'
			>
				<IconButton onClick={() => actions.openModal('pagos', rowData)}>
					<List />
				</IconButton>
			</Tooltip>
		}

		{active[1] &&
			<Tooltip
				enterDelay={200}
				id='tooltip-controlled'
				leaveDelay={100}
				placement='top'
				title='Pagar'
			>
				<Link to={`${urls.payment}`} href={`${urls.payment}`}>
					<IconButton>
						<Payment />
					</IconButton>
				</Link>
			</Tooltip>
		}

		{active[2] &&
			<Tooltip
				enterDelay={200}
				id='tooltip-controlled'
				leaveDelay={100}
				placement='top'
				title='Visualizar'
			>
				<Link to={`${urls.edit}/${rowData.id}`} href={`${urls.edit}/${rowData.id}`}>
					<IconButton>
						<Visibility />
					</IconButton>
				</Link>
			</Tooltip>
		}

		{active[3] &&
			<Tooltip
				enterDelay={200}
				id='tooltip-controlled'
				leaveDelay={100}
				placement='top'
				title='Editar'
			>
				<Link to={`${urls.edit}/${rowData.id}`} href={`${urls.edit}/${rowData.id}`}>
					<IconButton>
						<Edit />
					</IconButton>
				</Link>
			</Tooltip>
		}
		{active[4] &&
			<Tooltip
				enterDelay={200}
				id='tooltip-controlled'
				leaveDelay={100}
				placement='top'
				title='Eliminar'
			>
				<IconButton>
					<Delete onClick={() => actions.openModal('delete', rowData)} />
				</IconButton>
			</Tooltip>
		}
		{active[5] &&
			<Tooltip
				enterDelay={200}
				id='tooltip-controlled'
				leaveDelay={100}
				placement='top'
				title='Bloquear / Desbloquear'
			>
				<Switch
					onClick={() => actions.openModal('block', rowData)}
					checked={!rowData.active}
					value='checked'
				/>
			</Tooltip>
		}
		{active[6] &&
			<Tooltip
				enterDelay={200}
				id='tooltip-controlled'
				leaveDelay={100}
				placement='top'
				title='Cambiar Contraseña'
			>
				<IconButton onClick={() => actions.openModal('password', rowData)}>
					<VpnKey />
				</IconButton>
			</Tooltip>
		}
	</TableCell>
);

Options.propTypes = {
	classes: PropTypes.object.isRequired,
	active: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
	rowData: PropTypes.object.isRequired,
	urls: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	active: ownProps.activeButtons,
	actions: ownProps.actions,
	rowData: ownProps.rowData,
	urls: ownProps.urls,
});

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, null),
)(Options);

// onClick={() => actions.edit(rowData.id, rowData.name, rowData.description)}
