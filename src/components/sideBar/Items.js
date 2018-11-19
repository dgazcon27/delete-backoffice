import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Security from '@material-ui/icons/Security';
import People from '@material-ui/icons/People';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from '@material-ui/core/';
import Weekend from '@material-ui/icons/Weekend';
import Event from '@material-ui/icons/Album';
import Hotel from '@material-ui/icons/Hotel';
import ContactPhone from '@material-ui/icons/ContactPhone';
import GroupWork from '@material-ui/icons/GroupWork';
import List from '@material-ui/core/List';
import AttachMoney from '@material-ui/icons/AttachMoney';
import AccountBalance from '@material-ui/icons/AccountBalance';
import AccountBalanceWallet from '@material-ui/icons/AccountBalanceWallet';
import RoomService from '@material-ui/icons/RoomService';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Settings from '@material-ui/icons/Settings';
import Collapse from '@material-ui/core/Collapse';
import LocationOn from '@material-ui/icons/LocationOn';
import collapseItem from '../../actions/SideBar/actionsCreators';
import { SB_COLLAPSE_CONFIG, SB_COLLAPSE_TRACKER } from '../../actions/SideBar/actionsTypes';

const Items = ({
	openConfig,
	openTracker,
	actionCollapse,
}) => (
	<div>
		<Link to='/' href='/'>
			<ListItem button>
				<ListItemIcon>
					<AttachMoney />
				</ListItemIcon>
				<ListItemText primary='Ventas' />
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
		<Link to='/payment' href='/payment'>
			<ListItem button>
				<ListItemIcon>
					<AttachMoney />
				</ListItemIcon>
				<ListItemText primary='Pagos' />
			</ListItem>
		</Link>

		<ListItem button onClick={() => { actionCollapse(!openTracker, SB_COLLAPSE_TRACKER); }}>
			<ListItemIcon >
				<LocationOn />
			</ListItemIcon>
			<ListItemText inset primary='Localizadores' />
			{openTracker ? <ExpandLess /> : <ExpandMore />}
		</ListItem>
		<Collapse in={openTracker} timeout='auto' unmountOnExit>
			<List component='div' disablePadding>
				<Link to='/tokens' href='/tokens'>
					<ListItem button>
						<ListItemIcon>
							<AttachMoney />
						</ListItemIcon>
						<ListItemText primary='Ventas' />
					</ListItem>
				</Link>
				<Link to='/tokens-reservation' href='/tokens-reservation'>
					<ListItem button>
						<ListItemIcon>
							<RoomService />
						</ListItemIcon>
						<ListItemText primary='Paquetes' />
					</ListItem>
				</Link>
				<Divider />
			</List>
		</Collapse>
		<Link to='/hotel' href='/hotel'>
			<ListItem button>
				<ListItemIcon>
					<Hotel />
				</ListItemIcon>
				<ListItemText primary='Hoteles por Evento' />
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
		<Link to='/events' href='/events'>
			<ListItem button>
				<ListItemIcon>
					<Event />
				</ListItemIcon>
				<ListItemText primary='Eventos' />
			</ListItem>
		</Link>
		<ListItem button onClick={() => { actionCollapse(!openConfig, SB_COLLAPSE_CONFIG); }}>
			<ListItemIcon >
				<Settings />
			</ListItemIcon>
			<ListItemText inset primary='Configuración' />
			{openConfig ? <ExpandLess /> : <ExpandMore />}
		</ListItem>
		<Collapse in={openConfig} timeout='auto' unmountOnExit>
			<List component='div' disablePadding>
				<Link to='/access' href='/access'>
					<ListItem button>
						<ListItemIcon>
							<ContactPhone />
						</ListItemIcon>
						<ListItemText primary='Accesos' />
					</ListItem>
				</Link>
				<Link to='/tables' href='/tables'>
					<ListItem button>
						<ListItemIcon>
							<Weekend />
						</ListItemIcon>
						<ListItemText primary='Áreas' />
					</ListItem>
				</Link>
				<Link to='/bank' href='/bank'>
					<ListItem button>
						<ListItemIcon>
							<AccountBalance />
						</ListItemIcon>
						<ListItemText primary='Bancos' />
					</ListItem>
				</Link>
				<Link to='/bank-account' href='/bank-account'>
					<ListItem button>
						<ListItemIcon>
							<AccountBalanceWallet />
						</ListItemIcon>
						<ListItemText primary='Cuentas Bancarias' />
					</ListItem>
				</Link>
				<Link to='/user-type' href='/user-type'>
					<ListItem button>
						<ListItemIcon>
							<Security />
						</ListItemIcon>
						<ListItemText primary='Tipos de Usuario' />
					</ListItem>
				</Link>
				<Link to='/zones' href='/zones'>
					<ListItem button>
						<ListItemIcon>
							<GroupWork />
						</ListItemIcon>
						<ListItemText primary='Ubicación' />
					</ListItem>
				</Link>
				<Link to='/users' href='/users'>
					<ListItem button>
						<ListItemIcon>
							<People />
						</ListItemIcon>
						<ListItemText primary='Usuarios' />
					</ListItem>
				</Link>
			</List>
		</Collapse>

	</div>
);

Items.propTypes = {
	openConfig: PropTypes.bool.isRequired,
	openTracker: PropTypes.bool.isRequired,
	actionCollapse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	openConfig: state.ReducerSideBar.openConfig,
	openTracker: state.ReducerSideBar.openTracker,
});


const mapDispatchToProps = dispatch => ({
	actionCollapse: (open, type) =>
		dispatch(collapseItem(open, type)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Items);
