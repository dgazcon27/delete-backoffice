import {
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	CLEAN_STATE,
	PAGE_UP_HOTEL,
	PAGE_DOWN_HOTEL,
	HT_SET_HOTEL,
} from './actionsTypes';
import { GET_HOTELS, GET_HOTEL_BY_ID } from '../../queries/hotels';
import { client } from '../../config/configStore';

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
	event,
	provider,
	createdBy,
	updatedBy,
	paginationPage,
	createHotelMutation,
) =>
	async (dispatch) => {
		createHotelMutation({
			variables:
			{
				provider,
				event,
				createdBy,
				updatedBy,
			},
			refetchQueries: [{ query: GET_HOTELS, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(openAlert('creado'));
				// setTimeout(() => (window.location.assign('/hotel')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};


export const changePage = (currentPage, paginationPageHotel) => {
	const paginations = {} || JSON.parse(localStorage.getItem('paginations')).purchaseReq;
	paginations.purchaseReq = currentPage < paginationPageHotel ? currentPage + 1 : currentPage - 1;

	localStorage.setItem('paginations', JSON.stringify(paginations));

	return ({
		type: currentPage < paginationPageHotel ? PAGE_UP_HOTEL : PAGE_DOWN_HOTEL,
		payload: {
			description: currentPage < paginationPageHotel ? PAGE_UP_HOTEL : PAGE_DOWN_HOTEL,
			paginationPageHotel,
			currentPagePreq: currentPage < paginationPageHotel ? currentPage + 1 : currentPage - 1,
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

export const setHotel = hotel => ({
	type: HT_SET_HOTEL,
	payload: {
		id: hotel.id,
		event: hotel.event.id,
		provider: hotel.provider.id,
		description: HT_SET_HOTEL,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT,
	payload: {
		description: CLOSE_ALERT,
	},
});

export const getHotelById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_HOTEL_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { hotelById } = res.data;
				dispatch(setHotel(hotelById));
			})
			.catch(() => {});
	}
);

export const updateHotel = (hotel, mutation) => (
	async (dispatch) => {
		mutation({
			variables: hotel,
		})
			.then(() => {
				dispatch(openAlert('creado'));
				dispatch(setHotel({
					...hotel,
					event: { id: hotel.event },
					provider: { id: hotel.provider },
				}));
				setTimeout(() => (window.location.assign('/hotel')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	}
);

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
