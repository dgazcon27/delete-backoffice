import {
	PR_SET_USER,
	SET_NAME,
	OPEN_MODAL,
	MODAL_USER,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	CLEAN_STATE,
	PAGE_UP_PREQ,
	PAGE_DOWN_PREQ,
	SET_PURCHASE_REQ,
	SET_TO_PAY,
	SET_ACCESS_EVENT,
	CLOSE_MODAL_USER,
} from './actionsTypes';
import { GET_HOTELS } from '../../queries/hotels';
import {
	GET_PURCHASE_REQ,
	GET_ACCESS_BY_EVENT,
	GET_PURCHASE_BY_ID,
	GET_USER_BY_DNI,
} from '../../queries/purchaseRequest';
import { client } from '../../config/configStore';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
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

export const setPurchaseReq = purchase => ({
	type: SET_PURCHASE_REQ,
	payload: {
		...purchase,
		id: purchase.user.id,
		name: purchase.user.name,
		lastName: purchase.user.lastName,
		phone: purchase.user.phone,
		email: purchase.user.email,
		user: Number(purchase.user.id),
		access: purchase.access.name,
		event: purchase.event.name,
		status: purchase.status.name,
		description: SET_PURCHASE_REQ,
	},
});

export const getPurchaseById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_PURCHASE_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { purchaseRequest } = res.data;
				dispatch(setPurchaseReq(purchaseRequest));
			})
			.catch(() => {});
	}
);

export const closeUserModal = () => ({
	type: CLOSE_MODAL_USER,
	payload: {
		description: CLOSE_MODAL_USER,
	},
});
export const userModal = () => ({
	type: MODAL_USER,
	payload: {
		description: MODAL_USER,
	},
});

export const setToPay = id => ({
	type: SET_TO_PAY,
	payload: {
		description: SET_TO_PAY,
		id,
	},
});

export const cleanState = () => ({
	type: CLEAN_STATE,
	payload: {
		description: CLEAN_STATE,
	},
});


export const openAlert = alertType => ({
	type: OPEN_ALERT,
	payload: {
		alertType,
		description: OPEN_ALERT,
	},
});
export const closeAlert = () => ({
	type: CLOSE_ALERT,
	payload: {
		description: CLOSE_ALERT,
	},
});

export const deletePurchaseReq = (id, paginationPage, deletePurchaseReqMutation) => (
	async (dispatch) => {
		await deletePurchaseReqMutation({
			variables: { id },
			refetchQueries: [{ query: GET_PURCHASE_REQ, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
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
export const setName = name => ({
	type: SET_NAME,
	payload: {
		description: SET_NAME,
		name,
	},
});
export const setAccess = access => ({
	type: SET_ACCESS_EVENT,
	payload: {
		access,
		description: SET_ACCESS_EVENT,
	},
});

export const setAccessEvent = (event, id) => (
	async (dispatch) => {
		client
			.query({
				query: GET_ACCESS_BY_EVENT,
				variables: { event: id },
			})
			.then((res) => {
				dispatch(setAccess(res.data.accessByEvent));
			})
			.catch(() => {});
	}
);

export const setUser = aux => ({
	type: PR_SET_USER,
	payload: {
		aux,
		description: PR_SET_USER,
	},
});

export const getUserByDNI = dni => (
	async (dispatch) => {
		if (dni) {
			client
				.query({
					query: GET_USER_BY_DNI,
					variables: { dni },
				})
				.then((res) => {
					const aux = res.data.purchaseRequestAutocomplete;
					dispatch(setUser(aux));
				})
				.catch(() => {
					dispatch(userModal());
					dispatch(setUser({
						name: '', lastName: '', id: 0, dni: 0, phone: '', email: '',
					}));
				});
		}
	}
);
export const createPurchaseReq = (
	idUser,
	myValues,
	createdBy,
	updatedBy,
	paginationPage,
	createPurchaseReqMutation,
) =>
	async (dispatch) => {
		const user = idUser;
		createPurchaseReqMutation({
			variables:
			{
				createdBy,
				updatedBy,
				user,
				access: myValues.access,
				event: myValues.event,
				status: myValues.status,
				comment: myValues.comment,
			},
			refetchQueries: [{ query: GET_PURCHASE_REQ, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(openAlert('creado'));
				setTimeout(() => (window.location.reload('/')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};

export const editPurchaseReq = (
	purchase,
	updatedBy,
	paginationPage,
	editPurchaseReqMutation,
) =>
	async (dispatch) => {
		await editPurchaseReqMutation({
			variables: {
				...purchase,
				updatedBy,
			},
			refetchQueries: [{ query: GET_PURCHASE_REQ, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(openAlert('edit'));
				dispatch(setPurchaseReq({
					user: { id: purchase.user },
					access: { id: purchase.access },
					event: { id: purchase.event },
					status: { id: purchase.status },
					comment: purchase.comment,
				}));
				setTimeout(() => (window.location.reload('/')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};
