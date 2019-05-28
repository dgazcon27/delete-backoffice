/* eslint-disable no-underscore-dangle */
import React from 'react';
import MenuItem from 'material-ui/Menu/MenuItem';
import CsvDownloader from 'react-csv-downloader';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Field } from 'redux-form';
import { required } from './validations/validations';
import { renderSelectField } from './RenderFields/renderFields';

import {
	GET_PROVIDERS,
	GET_ROLESS,
	GET_BANKSS,
	GET_USERSS,
	GET_ACCESSS,
	GET_EVENTSS,
	GET_A_EVENTSS,
	GET_STATUSS,
	GET_BANK_ACCOUNTS,
	GET_LOCATIONS,
	GET_ZONES,
	GET_COUNTRIES,
	GET_TYPE_INVITED,
	GET_CATEGORIES,
	GET_CURRENCYS,
} from './../queries/common';


// referencia monto cuenta categoria
export function preSCV(arg, payments) {
	const alfa = [];
	let aux = {};
	arg.map((a) => {
		aux = Object.assign({}, a);

		if (a.bankAccount !== undefined) {
			if (payments) {
				delete aux.bankAccount;
				aux.bank = a.bankAccount.bank.name;
			} else {
				aux.bankAccount = a.bankAccount.accountNumber;
			}
		}
		if (a.category !== undefined) {
			aux.category = a.category.name;
		}
		if (a.user !== undefined) {
			aux.user = a.user.fullName;
		}
		if (a.event !== undefined) {
			aux.event = a.event.name;
		}
		if (a.access !== undefined) {
			aux.access = a.access.name;
		}
		if (a.state !== undefined) {
			aux.state = a.state.name;
		}
		delete aux.__typename;
		delete aux.type;
		delete aux.active;
		delete aux.id;
		alfa.push(aux);
		return alfa;
	});

	return (alfa);
}

export const ExportModal = pass => (
	<Query query={pass.pass}>
		{({ data }) => {
			const path = window.location.pathname;
			const showExport2 = (path === '/payment');
			let aux = [];
			if (showExport2) {
				aux = Object.assign([], data.allPayments);
				if (aux.length > 0) {
					aux = preSCV(aux, true);
				}
			} else {
				aux = Object.assign([], data.purchaseRequestss);
				if (aux.length > 0) {
					aux = preSCV(aux, false);
				}
			}

			return (
				<CsvDownloader datas={aux} filename='export' >
				Exportar como Excel
				</CsvDownloader>
			);
		}
		}
	</Query>
);


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
				<Field
					name='bankAccount'
					type='select'
					label='Cuenta de Banco'
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

export const SelectRoles = fieldName => (
	<Query query={GET_ROLESS}>
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

export const Roles = (props) => {
	Roles.defaultProps = {
		name: '',
	};
	Roles.propTypes = {
		name: PropTypes.string,
	};
	const inputName = props.name ? props.name : 'roles';
	return (
		<Query query={GET_ROLESS}>
			{({ loading, error, data }) => {
				if (loading) {
					return (
						<Field
							name={inputName}
							type='select'
							label='Roles'
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
						name={inputName}
						type='select'
						label='Roles'
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
};

export const Users = (props) => {
	Users.defaultProps = {
		name: '',
	};

	Users.propTypes = {
		name: PropTypes.string,
	};
	const inputName = props.name ? props.name : 'owner';
	return (
		<Query query={GET_USERSS}>
			{({ loading, error, data }) => {
				if (loading) {
					return (
						<Field
							name={inputName}
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
						name={inputName}
						type='select'
						label='Usuarios'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						{data.userss.map(user => (
							<MenuItem key={user.id} value={user.id}>{`${user.name} ${user.lastName}`}</MenuItem>
						))}
					</Field>
				);
			}}
		</Query>
	);
};

export const AccessE = (access) => {
	if (access !== {} && access.access.length > 0) {
		return (
			<Field
				name='access'
				type='select'
				label='Accesos'
				placeholder='Accesos'
				component={renderSelectField}
				validate={required}
				className='container'
			>
				{access.access.map(acc => (
					<MenuItem key={acc.id} value={acc.id}>{acc.access.name}</MenuItem>
				))}
			</Field>);
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
			<MenuItem />
		</Field>);
};

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

export const Categorys = () => (
	<Query query={GET_CATEGORIES}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='category'
						type='select'
						label='Categoría'
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
					name='category'
					type='select'
					label='Categorías'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.categorys.map(category => (
						<MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

export const Citizenship = () => (
	<Query query={GET_COUNTRIES}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='citizenship'
						type='select'
						label='País'
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
					name='citizenship'
					type='select'
					label='País'
					placeholder='País'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.countrys.map(citizenship => (
						<MenuItem key={citizenship.id} value={citizenship.id}>{citizenship.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

export const SelectCountry = actionSelectCountry => (
	<Query query={GET_COUNTRIES}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='country'
						type='select'
						label='País'
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
					name='country'
					type='select'
					label='País'
					placeholder='País'
					component={renderSelectField}
					validate={required}
					className='container'
					onChange={actionSelectCountry.actionSelectCountry}
				>
					{data.countrys.map(country => (
						<MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

export const Providers = actionSelectEvent => (
	<Query query={GET_PROVIDERS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='provider'
						type='select'
						label='Provider'
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
					name='provider'
					type='select'
					label='Provider'
					component={renderSelectField}
					validate={required}
					className='container'
					onChange={actionSelectEvent.actionSelectEvent}
				>
					{data.providers.map(provider => (
						<MenuItem key={provider.id} value={provider.id}>{provider.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);
export const Aevents = actionSelectEvent => (
	<Query query={GET_A_EVENTSS}>
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
					onChange={actionSelectEvent.actionSelectEvent}
				>
					{data.activeEvents.map(event => (
						<MenuItem key={event.id} value={event.id}>{event.name}</MenuItem>
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

export const SelectStatus = (props) => {
	SelectStatus.propTypes = {
		stateDesc: PropTypes.string.isRequired,
		inputName: PropTypes.string.isRequired,
		action: PropTypes.func.isRequired,
	};

	return (
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
						onChange={props.action.bind(this, props.stateDesc, props.inputName)}

					>
						{data.statuss.map(status => (
							<MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
						))}
					</Field>
				);
			}}
		</Query>);
};

export const Location = () => (
	<Query query={GET_LOCATIONS}>
		{({ loading, error, data }) => {
			if (loading || error) {
				return (
					<div className='formStyle'>
						<Field
							name='location'
							type='select'
							component={renderSelectField}
							validate={required}
							label='Ubicación'
						>
							<MenuItem />
						</Field>
					</div>
				);
			}
			return (
				<Field
					name='location'
					type='select'
					label='Ubicación'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.locationss.map(location => (
						<MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
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

export const Zone = () => (
	<Query query={GET_ZONES}>
		{({ loading, error, data }) => {
			if (loading || error) {
				return (
					<div className='formStyle'>
						<Field
							name='zone'
							type='select'
							component={renderSelectField}
							validate={required}
							label='Zona'
						>
							<MenuItem />
						</Field>
					</div>
				);
			}
			return (
				<Field
					name='zone'
					type='select'
					label='Zona'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.zones.map(zone => (
						<MenuItem key={zone.id} value={zone.id}>{zone.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

export const SelectState = states => (
	<Field
		name='state'
		type='select'
		label='Estado'
		placeholder='Estado'
		component={renderSelectField}
		validate={required}
		className='container'
	>
		{states.states.map(state => (
			<MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>
		))}
	</Field>
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


export const Categories = () => (
	<Query query={GET_CATEGORIES}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='category'
						type='select'
						label='Categoría'
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
					name='category'
					type='select'
					label='Categoría'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.categorys.map(category => (
						<MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

export const Currencies = (props) => {
	Currencies.propTypes = {
		name: PropTypes.string,
	};

	Currencies.defaultProps = {
		name: '',
	};
	const inputName = props.name ? props.name : 'currency';
	return (
		<Query query={GET_CURRENCYS}>
			{({ loading, error, data }) => {
				if (loading) {
					return (
						<Field
							name={inputName}
							type='select'
							label='Monedas'
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
						name={inputName}
						type='select'
						label='Moneda'
						component={renderSelectField}
						validate={required}
						className='container'
					>
						{data.currencys.map(currency => (
							<MenuItem
								key={currency.id}
								value={currency.id}
							>
								{currency.description}
							</MenuItem>
						))}
					</Field>
				);
			}
			}
		</Query>

	);
};

export const Currencys = () => (
	<Query query={GET_CURRENCYS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='currency'
						type='select'
						label='Moneda'
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
					name='currency'
					type='select'
					label='Moneda'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.currencys.map(currency => (
						<MenuItem
							key={currency.id}
							value={currency.id}
						>
							{currency.description}
						</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);

export const Providerss = () => (
	<Query query={GET_PROVIDERS}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<Field
						name='provider'
						type='select'
						label='Proveedor'
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
					name='provider'
					type='select'
					label='Proveedor'
					component={renderSelectField}
					validate={required}
					className='container'
				>
					{data.providers.map(provider => (
						<MenuItem
							key={provider.id}
							value={provider.id}
						>
							{provider.name}
						</MenuItem>
					))}
				</Field>
			);
		}}
	</Query>
);
