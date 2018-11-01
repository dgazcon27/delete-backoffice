import {
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	CLEAN_STATE,
	PAGE_UP_PREQ,
	PAGE_DOWN_PREQ,
} from './actionsTypes';
import { GET_HOTELS } from '../../queries/hotels';


export const openAlert = alertType => ({
	type: OPEN_ALERT,
	payload: {
		alertType,
		description: OPEN_ALERT,
	},
});
const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const createHotel = (
	idUser,
	event,
	provider,
	createdBy,
	updatedBy,
	paginationPage,
	createHotelMutation,
) =>
	async (dispatch) => {
		const user = idUser;
		createHotelMutation({
			variables:
			{
				provider,
				event,
				createdBy,
				updatedBy,
				user,
			},
			refetchQueries: [{ query: GET_HOTELS, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(openAlert('creado'));
				setTimeout(() => (window.location.assign('/hotel')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};


export const changePage = (currentPage, paginationPagePreq) => {
	const paginations = {} || JSON.parse(localStorage.getItem('paginations')).purchaseReq;
	paginations.purchaseReq = currentPage < paginationPagePreq ? currentPage + 1 : currentPage - 1;

	localStorage.setItem('paginations', JSON.stringify(paginations));

	return ({
		type: currentPage < paginationPagePreq ? PAGE_UP_PREQ : PAGE_DOWN_PREQ,
		payload: {
			description: currentPage < paginationPagePreq ? PAGE_UP_PREQ : PAGE_DOWN_PREQ,
			paginationPagePreq,
			currentPagePreq: currentPage < paginationPagePreq ? currentPage + 1 : currentPage - 1,
		},
	});
};
export const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: {
		description: CLOSE_MODAL,
	},
});
export const blockHotel = (id, statusValue, blockHotelMutation) => {
	const status = statusValue ? 0 : 1;
	return async (dispatch) => {
		await blockHotelMutation({ variables: { id, status } });
		dispatch(closeModal());
		window.location.reload();
	};
};

export const cleanState = () => ({
	type: CLEAN_STATE,
	payload: {
		description: CLEAN_STATE,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT,
	payload: {
		description: CLOSE_ALERT,
	},
});

export const deleteHotel = (id, paginationPage, deleteHotelMutation) => (
	async (dispatch) => {
		await deleteHotelMutation({
			variables: { id },
			refetchQueries: [{ query: GET_HOTELS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	});

export const openModal = (modalType, hotel) => ({
	type: OPEN_MODAL,
	payload: {
		modalType,
		description: OPEN_MODAL,
		statusValue: hotel.active,
		id: hotel.id,
	},
});
