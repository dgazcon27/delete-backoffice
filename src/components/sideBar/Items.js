import React from 'react';
import { Link } from 'react-router-dom';
import Security from '@material-ui/icons/Security';
import People from '@material-ui/icons/People';
// import DeleteIcon from '@material-ui/icons/Delete';
// import ReportIcon from '@material-ui/icons/Report';
// import Apps from '@material-ui/icons/Apps';
import Weekend from '@material-ui/icons/Weekend';
// import Wc from '@material-ui/icons/Wc';
import Event from '@material-ui/icons/Event';
// import Album from '@material-ui/icons/Album';
// import Work from '@material-ui/icons/Work';
import ContactPhone from '@material-ui/icons/ContactPhone';
import GroupWork from '@material-ui/icons/GroupWork';
import AttachMoney from '@material-ui/icons/AttachMoney';
import AccountBalance from '@material-ui/icons/AccountBalance';
import AccountBalanceWallet from '@material-ui/icons/AccountBalanceWallet';

import {
	ListItem,
	ListItemIcon,
	ListItemText,
	// Divider,
} from '@material-ui/core/';

const Items = (
	<div>
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

		<Link to='/tables' href='/tables'>
			<ListItem button>
				<ListItemIcon>
					<Weekend />
				</ListItemIcon>
				<ListItemText primary='Mesas' />
			</ListItem>
		</Link>

		<Link to='/access' href='/access'>
			<ListItem button>
				<ListItemIcon>
					<ContactPhone />
				</ListItemIcon>
				<ListItemText primary='Accesos' />
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

		<Link to='/zones' href='/zones'>
			<ListItem button>
				<ListItemIcon>
					<GroupWork />
				</ListItemIcon>
				<ListItemText primary='Zonas' />
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

		<Link to='/users' href='/users'>
			<ListItem button>
				<ListItemIcon>
					<People />
				</ListItemIcon>
				<ListItemText primary='Usuarios' />
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
	</div>
);

export default Items;
