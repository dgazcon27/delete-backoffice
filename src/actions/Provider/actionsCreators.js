import {
	OPEN_MODAL_PROVIDER,
	OPEN_ALERT_PROVIDER,
	CLOSE_ALERT_PROVIDER,
	CLOSE_MODAL_PROVIDER,
	CLEAN_STATE_PROVIDER,
	SET_COUNTRIES_STATES,
	CLEAN_STATE_COUNTRY,
	SET_PROVIDER,
	SET_COUNTRIES,
} from './actionsTypes';
import { client } from '../../config/configStore';
import { GET_PROVIDERS, GET_PROVIDER_BY_ID } from '../../queries/providers';
import GET_STATES from '../../queries/states';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const setEstados = (states, id) => ({
	type: SET_COUNTRIES_STATES,
	payload: {
		states,
		id,
		description: SET_COUNTRIES_STATES,
	},
});

export const cleanStateCountry = () => ({
	type: CLEAN_STATE_COUNTRY,
	payload: {
		description: CLEAN_STATE_COUNTRY,
		state: 0,
	},
});

export const cleanState = () => ({
	type: CLEAN_STATE_PROVIDER,
	payload: {
		description: CLEAN_STATE_PROVIDER,
	},
});

export const setProvider = (
	id,
	name,
	rif,
	descriptionProvider,
	phone,
	address,
	email,
	state,
	category,
	country,
) => ({
	type: SET_PROVIDER,
	payload: {
		description: SET_PROVIDER,
		id,
		name,
		descriptionProvider,
		rif,
		phone,
		address,
		email,
		state,
		category,
		country,
	},
});

export const setDetails = provider => ({
	type: SET_PROVIDER,
	payload: {
		description: SET_PROVIDER,
		id: provider.id,
		name: provider.name,
		descriptionProvider: provider.description,
		rif: provider.rif,
		phone: provider.phone,
		address: provider.address,
		email: provider.email,
		state: provider.state.id,
		category: provider.category.id,
		country: provider.state.country.id,
		countryName: provider.state.country.name,
		stateName: provider.state.name,
		categoryName: provider.category.name,
	},
});

export const setCountriesStates = (ev, id, ini = false) => (
	async (dispatch) => {
		client
			.query({
				query: GET_STATES,
				variables: { country: id },
			})
			.then((res) => {
				dispatch(setEstados(res.data.countryStates, id));
				if (!ini) {
					dispatch(cleanStateCountry());
				}
			})
			.catch(() => {});
	});

export const setCountries = id => ({
	type: SET_COUNTRIES,
	paylaod: {
		id,
	},
});

export const getProviderById = (id, band) =>
	async (dispatch) => {
		client
			.query({
				query: GET_PROVIDER_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const provider = res.data.providerId;
				if (band) {
					dispatch(setProvider(
						provider.id,
						provider.name,
						provider.rif,
						provider.description,
						provider.phone,
						provider.address,
						provider.email,
						provider.state.id,
						provider.category.id,
						provider.country,
					));
				} else {
					dispatch(setDetails(provider));
				}

				dispatch(setCountriesStates({}, provider.state.country.id, true));
			})
			.catch(() => {});
	};

export const closeModal = () => ({
	type: CLOSE_MODAL_PROVIDER,
	payload: {
		description: CLOSE_MODAL_PROVIDER,
	},
});

export const openAlert = alertType => ({
	type: OPEN_ALERT_PROVIDER,
	payload: {
		alertType,
		description: OPEN_ALERT_PROVIDER,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT_PROVIDER,
	payload: {
		description: CLOSE_ALERT_PROVIDER,
	},
});

export const blockProvider = (obj, blockProviderMutation) => {
	const { id } = obj;
	const status = obj.statusValue ? 0 : 1;

	return async (dispatch) => {
		await blockProviderMutation({ variables: { id, status } });
		dispatch(closeModal());
		window.location.reload();
	};
};

export const deleteProvider = (obj, paginationPage, deleteProviderMutation) => {
	const { id, statusValue } = obj;
	return async (dispatch) => {
		await deleteProviderMutation({
			variables: { id, statusValue },
			refetchQueries: [{ query: GET_PROVIDERS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};
};

export const openModal = (modalType, _provider) => ({
	type: OPEN_MODAL_PROVIDER,
	payload: {
		modalType,
		description: OPEN_MODAL_PROVIDER,
		statusValue: 1,
		name: _provider.name,
		id: _provider.id,
	},
});

export const createProvider = (
	name,
	description,
	rif,
	phone,
	address,
	email,
	state,
	category,
	createdBy,
	updatedBy,
	createProviderMutation,
	paginationPage,
) => async dispatch =>
	createProviderMutation({
		variables: {
			name, description, rif, phone, address, email, state, category, createdBy, updatedBy,
		},
		refetchQueries: [{ query: GET_PROVIDERS, variables: { paginationPage } }],
	})
		.then(() => {
			dispatch(openAlert('creado'));
			setTimeout(() => (window.location.assign('providers')), 2000);
		})
		.catch((res) => {
			const message = checkMessageError(res);
			dispatch(openAlert(message));
		});


export const editProvider = (
	id,
	name,
	description,
	rif,
	phone,
	address,
	email,
	state,
	country,
	category,
	updatedBy,
	editProviderMutation,
	paginationPage,
) => async (dispatch) => {
	await editProviderMutation({
		variables: {
			id, name, description, rif, phone, address, email, state, category, updatedBy,
		},
		refetchQueries: [{ query: GET_PROVIDERS, variables: { paginationPage } }],
	})
		.then(() => {
			dispatch(setProvider(
				id,
				name,
				rif,
				description,
				phone,
				address,
				email,
				state,
				category,
				country,
			));
			dispatch(openAlert('edit'));
			setTimeout(() => (window.location.assign('/providers')), 2000);
		})
		.catch((res) => {
			const message = checkMessageError(res);
			dispatch(openAlert(message));
		});
};
