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
	// Divider,
} from '@material-ui/core/';
// import DeleteIcon from '@material-ui/icons/Delete';
// import ReportIcon from '@material-ui/icons/Report';
// import Apps from '@material-ui/icons/Apps';
import Weekend from '@material-ui/icons/Weekend';
import Wc from '@material-ui/icons/Wc';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Collapse from '@material-ui/core/Collapse';
import collapseItem from '../../actions/SideBar/actionsCreators';

const Items = ({
	open,
	actionCollapse,
}) => (
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
			<ListItem button>
				<ListItemIcon>
					<AttachMoney />
				</ListItemIcon>
				<ListItemText primary='Taquilla' />
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
		{/* <Link to='/' href='/'>
			<ListItem button>
				<ListItemIcon>
					<Apps />
				</ListItemIcon>
				<ListItemText primary='Dashboard' />
			</ListItem>
		</Link>
		*/}
		<Link to='/guests' href='/guests'>
			<ListItem button>
				<ListItemIcon>
					<Wc />
				</ListItemIcon>
				<ListItemText primary='Invitados' />
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

		{/*
		<Link to='/djs' href='/djs'>
			<ListItem button>
				<ListItemIcon>
					<Album />
				</ListItemIcon>
				<ListItemText primary='DJS' />
			</ListItem>
		</Link>

		<Link to='/categories' href='/categories'>
			<ListItem button>
				<ListItemIcon>
					<Work />
				</ListItemIcon>
				<ListItemText primary='Categorías' />
			</ListItem>
		</Link>
		*/}
		<ListItem button onClick={() => { actionCollapse(!open); }}>
			<ListItemIcon >
				<InboxIcon />
			</ListItemIcon>
			<ListItemText inset primary='Configuración' />
			{open ? <ExpandLess /> : <ExpandMore />}
		</ListItem>
		<Collapse in={open} timeout='auto' unmountOnExit>
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
						<ListItemText primary='Areas' />
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
	open: PropTypes.bool.isRequired,
	actionCollapse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	open: state.ReducerSideBar.open,
});


const mapDispatchToProps = dispatch => ({
	actionCollapse: open =>
		dispatch(collapseItem(open)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Items);
