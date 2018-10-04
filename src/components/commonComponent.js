import React from 'react';
import MenuItem from 'material-ui/Menu/MenuItem';
import { Query } from 'react-apollo';
import { Field } from 'redux-form';
import { required } from './validations/validations';
import { renderSelectField } from './RenderFields/renderFields';
import {
	GET_BANKSS,
	GET_USERSS,
	GET_ACCESSS,
	GET_EVENTSS,
	GET_STATUSS,
	GET_BANK_ACCOUNTS,
	GET_COUNTRIES,
	GET_ROLES,
	GET_TYPE_INVITED,
} from './../queries/common';

export const BankAccount = () => (
	<Query query={GET_BANK_ACCOUNTS}>
		{({ loading, error, data }) => {
			if (loading || error) {
				return (
					<Field
						name='bankAccount'
						type='select'
						component={renderSelectField}
						validate={required}
						label='Cuenta de Banco'
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			return (
				<div>
					<Field
						name='bankAccount'
						type='select'
						label='bankAccount'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						{data.bankAccountss.map(bankAccount => (
							<MenuItem
								key={bankAccount.id}
								value={bankAccount.id}
							>
								{`${bankAccount.accountNumber} - ${bankAccount.owner.name} ${bankAccount.owner.lastName}`}
							</MenuItem>
						))}
					</Field>
				</div>
			);
		}}
	</Query>
);

export const Banks = () => (
	<Query query={GET_BANKSS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='bank'
						type='select'
						label='Banco'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) {
				return ('Error!');
			}
			return (
				<Field
					name='bank'
					type='select'
					label='Banco'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.bankss.map(bank => (
						<MenuItem key={bank.id} value={bank.id}>{bank.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

export const Users = () => (
	<Query query={GET_USERSS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='user'
						type='select'
						label='Usuarios'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) {
				return ('Error!');
			}
			return (
				<Field
					name='user'
					type='select'
					label='Usuarios'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.userss.map(user => (
						<MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

export const Access = () => (
	<Query query={GET_ACCESSS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='access'
						type='select'
						label='Accesos'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) {
				return ('Error!');
			}
			return (
				<Field
					name='access'
					type='select'
					label='Accesos'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.accesss.map(access => (
						<MenuItem key={access.id} value={access.id}>{access.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

export const Events = () => (
	<Query query={GET_EVENTSS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='event'
						type='select'
						label='Eventos'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) {
				return ('Error!');
			}
			return (
				<Field
					name='event'
					type='select'
					label='Eventos'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.eventss.map(event => (
						<MenuItem key={event.id} value={event.id}>{event.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

export const Status = () => (
	<Query query={GET_STATUSS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='status'
						type='select'
						label='Estatus'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) {
				return ('Error!');
			}
			return (
				<Field
					name='status'
					type='select'
					label='Estatus'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.statuss.map(status => (
						<MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

export const Countries = fieldName => (
	<Query query={GET_COUNTRIES}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name={fieldName.name}
						type='select'
						label='Ciudadanía'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) {
				return ('Error!');
			}
			return (
				<Field
					name={fieldName.name}
					type='select'
					label='Ciudadanía'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.countrys.map(country => (
						<MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

export const Roles = fieldName => (
	<Query query={GET_ROLES}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name={fieldName.name}
						type='select'
						label={fieldName.label}
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) {
				return ('Error!');
			}
			return (
				<Field
					name={fieldName.name}
					type='select'
					label={fieldName.label}
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.roless.map(role => (
						<MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

export const TypeInvited = () => (
	<Query query={GET_TYPE_INVITED}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='typeInvited'
						type='select'
						label='Tipo de Invitado'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						<MenuItem />
					</Field>
				);
			}
			if (error) {
				return ('Error!');
			}
			return (
				<Field
					name='typeInvited'
					type='select'
					label='Tipo de Invitado'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.typeInvits.map(typeinvited => (
						<MenuItem key={typeinvited.id} value={typeinvited.id}>{typeinvited.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);
