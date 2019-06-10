import {
	OPEN_MODAL_EVENT,
	CLOSE_MODAL_EVENT,
	OPEN_ALERT_EVENT,
	CLOSE_ALERT_EVENT,
	SET_EVENT,
	SET_BUDGET,
	SET_COUNTRIES_STATES,
	CLEAN_STATE_COUNTRY,
	ADD_ACCESS,
	ID_ACCESS_EVENT,
	ADD_PRODUCT,
} from './actionsTypes';


import { GET_EVENTS, GET_EVENT_BY_ID, GET_BUDGET_BY_ID } from '../../queries/event';
import GET_STATES from '../../queries/states';
import { client } from '../../config/configStore';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const openModal = (modalType, event) => {
	const statusValue = event.active ? 1 : 0;
	return {
		type: OPEN_MODAL_EVENT,
		payload: {
			modalType,
			description: OPEN_MODAL_EVENT,
			id: event.id,
			name: event.name,
			statusValue,
		},
	};
};

export const closeModal = () => ({
	type: CLOSE_MODAL_EVENT,
	payload: {
		description: CLOSE_MODAL_EVENT,
	},
});

export const openAlert = alertType => ({
	type: OPEN_ALERT_EVENT,
	payload: {
		alertType,
		description: OPEN_ALERT_EVENT,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT_EVENT,
	payload: {
		description: CLOSE_ALERT_EVENT,
	},
});

export const setEstados = states => ({
	type: SET_COUNTRIES_STATES,
	payload: {
		states,
		description: SET_COUNTRIES_STATES,
	},
});

export const addProduct = alfa => ({
	type: ADD_PRODUCT,
	payload: {
		alfa,
		description: ADD_PRODUCT,
	},
});

export const cleanStateCountry = () => ({
	type: CLEAN_STATE_COUNTRY,
	payload: {
		description: CLEAN_STATE_COUNTRY,
		state: 0,
	},
});

export const setDate = (desState, input, ev, val) => {
	const payload = {};
	payload[input] = val;
	return ({
		type: desState,
		payload,
	});
};

export const setCountriesStates = (ev, id, ini = false) => (
	async (dispatch) => {
		client
			.query({
				query: GET_STATES,
				variables: { country: id },
			})
			.then((res) => {
				dispatch(setEstados(res.data.countryStates));
				if (!ini) {
					dispatch(cleanStateCountry());
				}
			})
			.catch(() => {});
	});

export const setEvent = event => ({
	type: SET_EVENT,
	payload: {
		id: event.id,
		name: event.name,
		description: event.description,
		presaleStart: event.presaleStart,
		presaleClosure: event.presaleClosure,
		eventStart: event.eventStart,
		eventClosure: event.eventClosure,
		state: event.state.id,
		country: event.state.country.id,
	},
});
export const setBudget = budget => ({
	type: SET_BUDGET,
	payload: {
		id: budget.id,
		comment: budget.comment,
		products: budget.products,
		totalPaid: budget.totalPaid,
		totalPrice: budget.totalPrice,
		pendingPayment:	budget.pendingPayment,
		currency: budget.currency.description,
	},
});

export const getEventById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_EVENT_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { event } = res.data;
				dispatch(setEvent(event));
				dispatch(setCountriesStates({}, event.state.country.id, true));
			})
			.catch(() => {});
	}
);

export const getBudgetById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_BUDGET_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { budgetById } = res.data;
				dispatch(setBudget(budgetById));
			})
			.catch(() => {});
	}
);

export const addAccess = event => ({
	type: ADD_ACCESS,
	payload: {
		description: ADD_ACCESS,
		event,
	},
});

export const setIdAccessEventCreate = idAccessEvent => ({
	type: ID_ACCESS_EVENT,
	payload: {
		description: ID_ACCESS_EVENT,
		idAccessEvent,
	},
});

export const createEvent = (event, paginationPage, createdBy, updatedBy, createEventMutation) => (
	async (dispatch) => {
		createEventMutation({
			variables: {
				name: event.name,
				description: event.description,
				presaleStart: event.presaleStart,
				presaleClosure: event.presaleClosure,
				eventStart: event.eventStart,
				eventClosure: event.eventClosure,
				state: event.state,
				status: event.status,
				createdBy,
				updatedBy,
			},
			refetchQueries: [{
				query: GET_EVENTS, variables: { paginationPage },
			}],
		})
			.then(() => {
				dispatch(openAlert('creado'));
				setTimeout(() => (window.location.assign('events')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	});
export const updateBudget = (budgetId, alfa, userId, updateBudgetMutation) => {
	const aux = Object.assign([], alfa);
	aux.map(a => (delete a.id));
	return (async (dispatch) => {
		updateBudgetMutation({
			variables: {
				id: budgetId,
				products: aux,
				updatedBy: userId,
			},
		})
			.then(() => {
				dispatch(openAlert('Actualizado'));
				setTimeout(() => (window.location.assign('/events')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	});
};

export const editEvent = (event, updatedBy, editEventMutation) => (
	async (dispatch) => {
		editEventMutation({
			variables: {
				id: event.id,
				name: event.name,
				description: event.description,
				presaleStart: event.presaleStart,
				presaleClosure: event.presaleClosure,
				eventStart: event.eventStart,
				eventClosure: event.eventClosure,
				state: event.state,
				status: event.status,
				updatedBy,
			},
		})
			.then(() => {
				dispatch(openAlert('edit'));
				setTimeout(() => (window.location.replace('/events')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	});

export const deleteEvent = (id, deleteEventMutation) => {
	const paginationPage = 0;
	return async (dispatch) => {
		await deleteEventMutation({
			variables: { id },
			refetchQueries: [{ query: GET_EVENTS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};
};
