import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Security from '@material-ui/icons/Security';
import People from '@material-ui/icons/People';
import Weekend from '@material-ui/icons/Weekend';
import Wc from '@material-ui/icons/Wc';
import Event from '@material-ui/icons/Album';
import Hotel from '@material-ui/icons/Hotel';
import ContactPhone from '@material-ui/icons/ContactPhone';
import GroupWork from '@material-ui/icons/GroupWork';
import AttachMoney from '@material-ui/icons/AttachMoney';
import AccountBalance from '@material-ui/icons/AccountBalance';
import AccountBalanceWallet from '@material-ui/icons/AccountBalanceWallet';
import RoomService from '@material-ui/icons/RoomService';

import {
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core/';

import { resetPagination } from '../../actions/List/actionsCreators';

const Items = ({ actionResetPagination }) => (
	<div>
		<Link to='/hotel' href='/hotel'>
			<ListItem button>
				<ListItemIcon>
					<Hotel />
				</ListItemIcon>
				<ListItemText primary='Hotel' />
			</ListItem>
		</Link>
		<Link to='/' href='/'>
			<ListItem button onClick={() => actionResetPagination()} >
				<ListItemIcon>
					<AttachMoney />
				</ListItemIcon>
				<ListItemText primary='Taquilla' />
			</ListItem>
		</Link>
		<Link to='/payment' href='/payment' >
			<ListItem button onClick={() => actionResetPagination()}>
				<ListItemIcon>
					<AttachMoney />
				</ListItemIcon>
				<ListItemText primary='Pagos' />
			</ListItem>
		</Link>

		<Link to='/tables' href='/tables' >
			<ListItem button onClick={() => actionResetPagination()}>
				<ListItemIcon>
					<Weekend />
				</ListItemIcon>
				<ListItemText primary='Mesas' />
			</ListItem>
		</Link>

		<Link to='/access' href='/access' >
			<ListItem button onClick={() => actionResetPagination()}>
				<ListItemIcon>
					<ContactPhone />
				</ListItemIcon>
				<ListItemText primary='Accesos' />
			</ListItem>
		</Link>
		<Link to='/guests' href='/guests'>
			<ListItem button onClick={() => actionResetPagination()}>
				<ListItemIcon>
					<Wc />
				</ListItemIcon>
				<ListItemText primary='Invitados' />
			</ListItem>
		</Link>
		<Link to='/events' href='/events'>
			<ListItem button onClick={() => actionResetPagination()}>
				<ListItemIcon>
					<Event />
				</ListItemIcon>
				<ListItemText primary='Eventos' />
			</ListItem>
		</Link>

		<Link to='/zones' href='/zones' >
			<ListItem button onClick={() => actionResetPagination()}>
				<ListItemIcon>
					<GroupWork />
				</ListItemIcon>
				<ListItemText primary='Zonas' />
			</ListItem>
		</Link>

		<Link to='/bank' href='/bank' >
			<ListItem button onClick={() => actionResetPagination()}>
				<ListItemIcon>
					<AccountBalance />
				</ListItemIcon>
				<ListItemText primary='Bancos' />
			</ListItem>
		</Link>

		<Link to='/bank-account' href='/bank-account' >
			<ListItem button onClick={() => actionResetPagination()}>
				<ListItemIcon>
					<AccountBalanceWallet />
				</ListItemIcon>
				<ListItemText primary='Cuentas Bancarias' />
			</ListItem>
		</Link>

		<Link to='/users' href='/users' >
			<ListItem button onClick={() => actionResetPagination()}>
				<ListItemIcon>
					<People />
				</ListItemIcon>
				<ListItemText primary='Usuarios' />
			</ListItem>
		</Link>
		<Link to='/user-type' href='/user-type' >
			<ListItem button onClick={() => actionResetPagination()}>
				<ListItemIcon>
					<Security />
				</ListItemIcon>
				<ListItemText primary='Tipos de Usuario' />
			</ListItem>
		</Link>

		<Link to='/reservation' href='/reservation'>
			<ListItem button>
				<ListItemIcon>
					<RoomService />
				</ListItemIcon>
				<ListItemText primary='Paquetes' />
			</ListItem>
		</Link>

		<Link to='/room' href='/room'>
			<ListItem button>
				<ListItemIcon>
					<ContactPhone />
				</ListItemIcon>
				<ListItemText primary='Habitaciones' />
			</ListItem>
		</Link>
	</div>
);

Items.propTypes = {
	actionResetPagination: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	actionResetPagination: () => dispatch(resetPagination()),
});

export default connect(null, mapDispatchToProps)(Items);
