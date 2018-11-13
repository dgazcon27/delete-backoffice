import {
	OPEN_MODAL_HOTEL,
	OPEN_ALERT_HOTEL,
	CLOSE_ALERT_HOTEL,
	CLOSE_MODAL_HOTEL,
	CLEAN_STATE_HOTEL,
	HT_SET_HOTEL,
} from './actionsTypes';
import { GET_HOTELS, GET_HOTEL_BY_ID } from '../../queries/hotels';
import { client } from '../../config/configStore';

export const openAlert = alertType => ({
	type: OPEN_ALERT_HOTEL,
	payload: {
		alertType,
		description: OPEN_ALERT_HOTEL,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT_HOTEL,
	payload: {
		description: CLOSE_ALERT_HOTEL,
	},
});

export const openModal = (modalType, hotel) => ({
	type: OPEN_MODAL_HOTEL,
	payload: {
		modalType,
		description: OPEN_MODAL_HOTEL,
		statusValue: hotel.active,
		id: hotel.id,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL_HOTEL,
	payload: {
		description: CLOSE_MODAL_HOTEL,
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
				setTimeout(() => (window.location.assign('/hotel')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};

export const blockHotel = (obj, blockHotelMutation) => {
	const { id } = obj;
	const status = obj.statusValue ? 0 : 1;
	return async (dispatch) => {
		await blockHotelMutation({ variables: { id, status } });
		dispatch(closeModal());
		window.location.reload();
	};
};

export const deleteHotel = (obj, paginationPage, deleteHotelMutation) => {
	const { id } = obj;
	return async (dispatch) => {
		await deleteHotelMutation({
			variables: { id },
			refetchQueries: [{ query: GET_HOTELS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};
};

export const setHotel = hotel => ({
	type: HT_SET_HOTEL,
	payload: {
		id: hotel.id,
		event: hotel.event.id,
		provider: hotel.provider.id,
		description: HT_SET_HOTEL,
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

export const cleanState = () => ({
	type: CLEAN_STATE_HOTEL,
	payload: {
		description: CLEAN_STATE_HOTEL,
	},
});
