import React from 'react';
import { Link } from 'react-router-dom';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';

import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from '@material-ui/core/';

const Items = (
	<div>
		<Link to='/'>
			<ListItem button>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
				<ListItemText primary="Inbox" />
			</ListItem>
		</Link>

		<Link to='/dashboard'>
			<ListItem button>
				<ListItemIcon>
					<StarIcon />
				</ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItem>
		</Link>

		<Link to='/pre-sale'>
			<ListItem button>
				<ListItemIcon>
					<SendIcon />
				</ListItemIcon>
				<ListItemText primary="Pre-Venta" />
			</ListItem>
		</Link>

		<Link to='/box-office'>
			<ListItem button>
				<ListItemIcon>
					<DraftsIcon />
				</ListItemIcon>
				<ListItemText primary="BoxOffice" />
			</ListItem>
		</Link>

		<Link to='/user-type'>
			<ListItem button>
				<ListItemIcon>
					<DraftsIcon />
				</ListItemIcon>
				<ListItemText primary="UserType" />
			</ListItem>
		</Link>
		<Divider />

		<ListItem button>
			<ListItemIcon>
				<MailIcon />
			</ListItemIcon>
			<ListItemText primary="All mail" />
		</ListItem>

		<ListItem button>
			<ListItemIcon>
			<DeleteIcon />
				</ListItemIcon>
			<ListItemText primary="Trash" />
		</ListItem>

		<ListItem button>
			<ListItemIcon>
				<ReportIcon />
			</ListItemIcon>
			<ListItemText primary="Spam" />
		</ListItem>
	</div>
);

export default Items;
