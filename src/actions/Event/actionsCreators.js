import {
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	PAGE_UP_EV,
	PAGE_DOWN_EV,
	SET_EVENT,
	CLEAN_STATE,
	SET_COUNTRIES_STATES,
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

export const openAlert = alertType => ({
	type: OPEN_ALERT,
	payload: {
		alertType,
		description: OPEN_ALERT,
	},
});

export const cleanState = () => ({
	type: CLEAN_STATE,
	payload: {
		description: CLEAN_STATE,
	},
});

export const openModal = (modalType, event) => ({
	type: OPEN_MODAL,
	payload: {
		modalType,
		description: OPEN_MODAL,
		name: event.name,
		id: event.id,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: {
		description: CLOSE_MODAL,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT,
	payload: {
		description: CLOSE_ALERT,
	},
});

export const setStates = states => ({
	type: SET_COUNTRIES_STATES,
	payload: {
		states,
		description: SET_COUNTRIES_STATES,
	},
});

export const setCountriesStates = id => (
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

export const changePage = (currentPage, paginationPageEv) => {
	const paginations = {} || JSON.parse(localStorage.getItem('paginations')).events;
	paginations.events = currentPage < paginationPageEv ? currentPage + 1 : currentPage - 1;

	localStorage.setItem('paginations', JSON.stringify(paginations));

	return ({
		type: currentPage < paginationPageEv ? PAGE_UP_EV : PAGE_DOWN_EV,
		payload: {
			description: currentPage < paginationPageEv ? PAGE_UP_EV : PAGE_DOWN_EV,
			paginationPageEv,
			currentPageEv: currentPage < paginationPageEv ? currentPage + 1 : currentPage - 1,
		},
	});
};

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

export const deleteEvent = (id, paginationPage, deleteEventMutation) => (
	async (dispatch) => {
		await deleteEventMutation({
			variables: { id },
			refetchQueries: [{ query: GET_EVENTS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	});
