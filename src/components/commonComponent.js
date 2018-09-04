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
						label='Estado'
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
					label='Estado'
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

