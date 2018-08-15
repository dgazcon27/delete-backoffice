import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserType from './userType';

const ComponentUserType = () => (
	<div>
		<h3>
			Roles
		</h3>
		<h5>
			<Link to='/user-type-create' href='/user-type-create' >
				Agregar Nuevo
			</Link>
		</h5>

		<TextField
			id='search'
			label='Search field'
			type='search'
			margin='normal'
		/>

		<Button variant='raised' color='primary' >
			Primary
		</Button>

		<UserType isSearching={false} />
	</div>
);

export default ComponentUserType;
