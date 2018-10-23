import {
	OPEN_MODAL_EVENT,
	CLOSE_MODAL_EVENT,
	OPEN_ALERT_EVENT,
	CLOSE_ALERT_EVENT,
	SET_EVENT,
	SET_COUNTRIES_STATES_EVENT,
} from './actionsTypes';

import { GET_EVENTS, GET_EVENT_BY_ID } from '../../queries/event';
import GET_STATES from '../../queries/states';
import { client } from '../../config/configStore';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const openModal = (modalType, event) => ({
	type: OPEN_MODAL_EVENT,
	payload: {
		modalType,
		description: OPEN_MODAL_EVENT,
		name: event.name,
		id: event.id,
	},
});

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

export const setStates = states => ({
	type: SET_COUNTRIES_STATES_EVENT,
	payload: {
		states,
		description: SET_COUNTRIES_STATES_EVENT,
	},
});

export const setCountriesStates = (e, id) => (
	async (dispatch) => {
		client
			.query({
				query: GET_STATES,
				variables: { country: id },
			})
			.then((res) => {
				dispatch(setStates(res.data.countryStates));
			})
			.catch(() => {});
	}
);

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
		status: event.status.id,
		state: event.state.id,
		country: event.state.country.id,
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
				dispatch(setCountriesStates(event.state.country.id));
			})
			.catch(() => {});
	}
);

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

export const deleteEvent = (obj, paginationPage, deleteEventMutation) => {
	const { id } = obj;
	return async (dispatch) => {
		await deleteEventMutation({
			variables: { id },
			refetchQueries: [{ query: GET_EVENTS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		// window.location.reload();
	};
};
