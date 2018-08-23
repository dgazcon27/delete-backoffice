import React from 'react';
import { Link } from 'react-router-dom';
import Security from '@material-ui/icons/Security';
import People from '@material-ui/icons/People';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import Apps from '@material-ui/icons/Apps';
import Weekend from '@material-ui/icons/Weekend';
import Wc from '@material-ui/icons/Wc';
import Event from '@material-ui/icons/Event';
import Album from '@material-ui/icons/Album';
import Work from '@material-ui/icons/Work';
import ContactPhone from '@material-ui/icons/ContactPhone';
import GroupWork from '@material-ui/icons/GroupWork';
import AttachMoney from '@material-ui/icons/AttachMoney';

import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from '@material-ui/core/';

const Items = (
	<div>
		<Link to='/' href='/'>
			<ListItem button>
				<ListItemIcon>
					<Apps />
				</ListItemIcon>
				<ListItemText primary='Dashboard' />
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

		<Link to='/tables' href='/tables'>
			<ListItem button>
				<ListItemIcon>
					<Weekend />
				</ListItemIcon>
				<ListItemText primary='Mesas' />
			</ListItem>
		</Link>

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

		<Link to='/departments' href='/Departments'>
			<ListItem button>
				<ListItemIcon>
					<GroupWork />
				</ListItemIcon>
				<ListItemText primary='Departamentos' />
			</ListItem>
		</Link>

		<Link to='/pre-sale' href='/pre-sale'>
			<ListItem button>
				<ListItemIcon>
					<AttachMoney />
				</ListItemIcon>
				<ListItemText primary='Pre-Venta' />
			</ListItem>
		</Link>

		<Link to='/bank' href='/bank'>
			<ListItem button>
				<ListItemIcon>
					<AttachMoney />
				</ListItemIcon>
				<ListItemText primary='Bank' />
			</ListItem>
		</Link>

		<Link to='/bank-account' href='/bank-account'>
			<ListItem button>
				<ListItemIcon>
					<AttachMoney />
				</ListItemIcon>
				<ListItemText primary='Bank-Account' />
			</ListItem>
		</Link>

		<Link to='/staff' href='/staff'>
			<ListItem button>
				<ListItemIcon>
					<ContactPhone />
				</ListItemIcon>
				<ListItemText primary='Staff' />
			</ListItem>
		</Link>

		<Divider />

		<ListItem button>
			<ListItemIcon>
				<DeleteIcon />
			</ListItemIcon>
			<ListItemText primary='Trash' />
		</ListItem>

		<ListItem button>
			<ListItemIcon>
				<ReportIcon />
			</ListItemIcon>
			<ListItemText primary='Spam' />
		</ListItem>
	</div>
);

export default Items;
