import {
	openAlert,
	checkMessageError,
	closeModal,
} from '../sharedActions/sharedActions';

import {
	PAGE_UP,
	PAGE_DOWN,
	SEARCH_PAGE_UP,
	SEARCH_PAGE_DOWN,
	SET_GUEST,
} from './actionsTypes';

import { GET_GUEST_BY_ID } from '../../queries/guest';
import { client } from '../../config/configStore';

export const setGuest = guest => ({
	type: SET_GUEST,
	payload: {
		description: SET_GUEST,
		id: guest.id,
		name: guest.user.name,
		lastName: guest.user.lastName,
		email: guest.user.email,
		phone: guest.user.phone,
		dni: guest.user.dni.toString(),
		citizenship: guest.user.citizenship.id,
		event: guest.event.id,
		status: guest.status.id,
		access: guest.access.id,
		role: guest.user.role.id,
		typeInvited: guest.typeInvited.id,
	},
});

export const changePage = (currentPage, paginationPage) => {
	const paginations = {} || JSON.parse(localStorage.getItem('paginations'));
	paginations.invited = currentPage < paginationPage ? currentPage + 1 : currentPage - 1;

	localStorage.setItem('paginations', JSON.stringify(paginations));

	return ({
		type: currentPage < paginationPage ? PAGE_UP : PAGE_DOWN,
		payload: {
			description: currentPage < paginationPage ? PAGE_UP : PAGE_DOWN,
			paginationPage,
			currentPage: currentPage < paginationPage ? currentPage + 1 : currentPage - 1,
		},
	});
};

export const changePageSearch = (currentPage, paginationPage) => {
	const paginations = JSON.parse(localStorage.getItem('paginations')) || {};
	paginations.searchInvited = currentPage < paginationPage ? currentPage + 1 : currentPage - 1;
	localStorage.setItem('paginations', JSON.stringify(paginations));

	return ({
		type: currentPage < paginationPage ? SEARCH_PAGE_UP : SEARCH_PAGE_DOWN,
		payload: {
			description: currentPage < paginationPage ? SEARCH_PAGE_UP : SEARCH_PAGE_DOWN,
			paginationPageSearch: paginationPage,
			currentPageSearch: currentPage < paginationPage ? currentPage + 1 : currentPage - 1,
		},
	});
};

export const createInvited = (invited, create) => (
	async (dispatch) => {
		create({
			variables: invited,
		})
			.then(() => {
				dispatch(openAlert('creado'));
				setTimeout(() => (window.location.assign('/guests')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	});

export const updateGuest = (guest, update) => (
	async (dispatch) => {
		update({
			variables: guest,
		})
			.then((data) => {
				dispatch(openAlert('creado'));
				dispatch(setGuest(data.data.updateInvited));
				setTimeout(() => (window.location.assign('/guests')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	});

export const deleteInvited = (id, deleteMutation) => (
	async (dispatch) => {
		await deleteMutation({
			variables: { id },
		});
		dispatch(closeModal());
		window.location.reload();
	}
);


export const getGuestById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_GUEST_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { invited } = res.data;
				dispatch(setGuest(invited));
			})
			.catch(() => {});
	}
);
