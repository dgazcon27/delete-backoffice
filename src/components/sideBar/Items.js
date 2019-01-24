import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Security from '@material-ui/icons/Security';
import People from '@material-ui/icons/People';
import { compose } from 'react-apollo';
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from '@material-ui/core/';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
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
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Settings from '@material-ui/icons/Settings';
import Collapse from '@material-ui/core/Collapse';
import LocationOn from '@material-ui/icons/LocationOn';
import Work from '@material-ui/icons/Work';
import collapseItem from '../../actions/SideBar/actionsCreators';
import { resetPagination } from '../../actions/List/actionsCreators';
import {
	SB_COLLAPSE_CONFIG,
	SB_COLLAPSE_TRACKER,
	SB_COLLAPSE_ADMINISTRATION,
} from '../../actions/SideBar/actionsTypes';

const localRole = window.localStorage.getItem('actualRole');
const Items = ({
	openConfig,
	openTracker,
	openAdmin,
	actionCollapse,
	actionResetPagination,
}) => (
	<div>
		{ localRole === 'VENTA' &&
		<div>

			<Link to='/' href='/'>
				<ListItem button>
					<ListItemIcon>
						<AttachMoney />
					</ListItemIcon>
					<ListItemText primary='Ventas' />
				</ListItem>
			</Link>
			<Link to='/presale' href='/presale'>
				<ListItem button onClick={() => actionResetPagination()}>
					<ListItemIcon>
						<People />
					</ListItemIcon>
					<ListItemText primary='Preventa' />
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
		</div>
		}
		{ localRole === 'TAQUILLA' &&
		<div>

			<Link to='/' href='/'>
				<ListItem button>
					<ListItemIcon>
						<AttachMoney />
					</ListItemIcon>
					<ListItemText primary='Ventas' />
				</ListItem>
			</Link>
			<Link to='/ticket' href='/ticket'>
				<ListItem button onClick={() => actionResetPagination()}>
					<ListItemIcon>
						<People />
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
		</div>
		}
		{ localRole === 'MESAS' &&
		<div>

			<Link to='/' href='/'>
				<ListItem button>
					<ListItemIcon>
						<AttachMoney />
					</ListItemIcon>
					<ListItemText primary='Ventas' />
				</ListItem>
			</Link>
			<Link to='/table' href='/table'>
				<ListItem button onClick={() => actionResetPagination()}>
					<ListItemIcon>
						<People />
					</ListItemIcon>
					<ListItemText primary='Mesas' />
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
		</div>
		}
		{ localRole === 'ADM' &&
		<div>

			<Link to='/' href='/'>
				<ListItem button>
					<ListItemIcon>
						<AttachMoney />
					</ListItemIcon>
					<ListItemText primary='Ventas' />
				</ListItem>
			</Link>
			<Link to='/ticket' href='/ticket'>
				<ListItem button onClick={() => actionResetPagination()}>
					<ListItemIcon>
						<People />
					</ListItemIcon>
					<ListItemText primary='Taquilla' />
				</ListItem>
			</Link>
			<Link to='/table' href='/table'>
				<ListItem button onClick={() => actionResetPagination()}>
					<ListItemIcon>
						<People />
					</ListItemIcon>
					<ListItemText primary='Mesas' />
				</ListItem>
			</Link>
			<Link to='/presale' href='/presale'>
				<ListItem button onClick={() => actionResetPagination()}>
					<ListItemIcon>
						<People />
					</ListItemIcon>
					<ListItemText primary='Preventa' />
				</ListItem>
			</Link>

			<Link to='/reservation' href='/reservation'>
				<ListItem button onClick={() => actionResetPagination()}>
					<ListItemIcon>
						<RoomService />
					</ListItemIcon>
					<ListItemText primary='Paquetes' />
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

			<ListItem button onClick={() => { actionCollapse(!openTracker, SB_COLLAPSE_TRACKER); }}>
				<ListItemIcon >
					<LocationOn />
				</ListItemIcon>
				<ListItemText inset primary='Localizadores' />
				{openTracker ? <ExpandMore /> : <ChevronLeft />}
			</ListItem>
			<Collapse in={openTracker} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					<Link to='/tokens' href='/tokens'>
						<ListItem button onClick={() => actionResetPagination()}>
							<ListItemIcon>
								<AttachMoney />
							</ListItemIcon>
							<ListItemText primary='Ventas' />
						</ListItem>
					</Link>
					<Link to='/tokens-reservation' href='/tokens-reservation'>
						<ListItem button onClick={() => actionResetPagination()}>
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
				<ListItem button onClick={() => actionResetPagination()}>
					<ListItemIcon>
						<Hotel />
					</ListItemIcon>
					<ListItemText primary='Hoteles por Evento' />
				</ListItem>
			</Link>
			<Link to='/room' href='/room'>
				<ListItem button onClick={() => actionResetPagination()}>
					<ListItemIcon>
						<ContactPhone />
					</ListItemIcon>
					<ListItemText primary='Habitaciones' />
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
			<ListItem button onClick={() => { actionCollapse(!openConfig, SB_COLLAPSE_CONFIG); }}>
				<ListItemIcon >
					<Settings />
				</ListItemIcon>
				<ListItemText inset primary='Configuración' />
				{openConfig ? <ExpandMore /> : <ChevronLeft />}
			</ListItem>
			<Collapse in={openConfig} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					<Link to='/access' href='/access'>
						<ListItem button onClick={() => actionResetPagination()}>
							<ListItemIcon>
								<ContactPhone />
							</ListItemIcon>
							<ListItemText primary='Accesos' />
						</ListItem>
					</Link>
					<Link to='/tables' href='/tables'>
						<ListItem button onClick={() => actionResetPagination()}>
							<ListItemIcon>
								<Weekend />
							</ListItemIcon>
							<ListItemText primary='Áreas' />
						</ListItem>
					</Link>
					<Link to='/bank' href='/bank'>
						<ListItem button onClick={() => actionResetPagination()}>
							<ListItemIcon>
								<AccountBalance />
							</ListItemIcon>
							<ListItemText primary='Bancos' />
						</ListItem>
					</Link>
					<Link to='/bank-account' href='/bank-account'>
						<ListItem button onClick={() => actionResetPagination()}>
							<ListItemIcon>
								<AccountBalanceWallet />
							</ListItemIcon>
							<ListItemText primary='Cuentas Bancarias' />
						</ListItem>
					</Link>
					<Link to='/user-type' href='/user-type'>
						<ListItem button onClick={() => actionResetPagination()}>
							<ListItemIcon>
								<Security />
							</ListItemIcon>
							<ListItemText primary='Tipos de Usuario' />
						</ListItem>
					</Link>
					<Link to='/zones' href='/zones'>
						<ListItem button onClick={() => actionResetPagination()}>
							<ListItemIcon>
								<GroupWork />
							</ListItemIcon>
							<ListItemText primary='Ubicación' />
						</ListItem>
					</Link>
					<Link to='/users' href='/users'>
						<ListItem button onClick={() => actionResetPagination()}>
							<ListItemIcon>
								<People />
							</ListItemIcon>
							<ListItemText primary='Usuarios' />
						</ListItem>
					</Link>
					<Link to='/providers' href='/Proveedor'>
						<ListItem button onClick={() => actionResetPagination()}>
							<ListItemIcon>
								<People />
							</ListItemIcon>
							<ListItemText primary='Proveedor' />
						</ListItem>
					</Link>
					<Divider />
				</List>
			</Collapse>
			<ListItem button onClick={() => { actionCollapse(!openAdmin, SB_COLLAPSE_ADMINISTRATION); }}>
				<ListItemIcon >
					<Work />
				</ListItemIcon>
				<ListItemText inset primary='Administración' />
				{openAdmin ? <ExpandMore /> : <ChevronLeft />}
			</ListItem>
			<Collapse in={openAdmin} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					<Link to='/income' href='/income'>
						<ListItem button onClick={() => actionResetPagination()}>
							<ListItemIcon>
								<ArrowUpward />
							</ListItemIcon>
							<ListItemText primary='Ingresos por Evento' />
						</ListItem>
					</Link>
					<Link to='/expenses' href='/expenses'>
						<ListItem button onClick={() => actionResetPagination()}>
							<ListItemIcon>
								<ArrowDownward />
							</ListItemIcon>
							<ListItemText primary='Gastos por Evento' />
						</ListItem>
					</Link>
					<Link to='/movement/income/create'>
						<ListItem button onClick={() => actionResetPagination()}>
							<ListItemIcon>
								<People />
							</ListItemIcon>
							<ListItemText primary='Reportar ingreso' />
						</ListItem>
					</Link>
					<Link to='/movement/expenses/create'>
						<ListItem button onClick={() => actionResetPagination()}>
							<ListItemIcon>
								<People />
							</ListItemIcon>
							<ListItemText primary='Reportar gasto' />
						</ListItem>
					</Link>
					<Divider />
				</List>
			</Collapse>
		</div>
		}
	</div>
);

Items.propTypes = {
	actionResetPagination: PropTypes.func.isRequired,
	openConfig: PropTypes.bool.isRequired,
	openTracker: PropTypes.bool.isRequired,
	openAdmin: PropTypes.bool.isRequired,
	actionCollapse: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
	openConfig: state.ReducerSideBar.openConfig,
	openTracker: state.ReducerSideBar.openTracker,
	openAdmin: state.ReducerSideBar.openAdmin,
});

const mapDispatchToProps = dispatch => ({
	actionResetPagination: () => dispatch(resetPagination()),
	actionCollapse: (open, type) =>
		dispatch(collapseItem(open, type)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Items);
