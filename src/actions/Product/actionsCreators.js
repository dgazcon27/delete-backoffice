import {
	OPEN_MODAL_PRODUCT,
	OPEN_ALERT_PRODUCT,
	CLOSE_ALERT_PRODUCT,
	CLOSE_MODAL_PRODUCT,
	CLEAN_STATE_PRODUCT,
	SET_PRODUCT,
} from './actionsTypes';

import { client } from '../../config/configStore';

import { GET_PRODUCTS, GET_PRODUCT_BY_ID } from '../../queries/product';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const openAlert = alertType => ({
	type: OPEN_ALERT_PRODUCT,
	payload: {
		alertType,
		description: OPEN_ALERT_PRODUCT,
	},
});

export const cleanState = () => ({
	type: CLEAN_STATE_PRODUCT,
	payload: {
		description: CLEAN_STATE_PRODUCT,
	},
});

export const openModal = (modalType, product) => {
	const statusValue = product.active ? 1 : 2;
	return {
		type: OPEN_MODAL_PRODUCT,
		payload: {
			modalType,
			description: OPEN_MODAL_PRODUCT,
			id: product.id,
			name: product.name,
			statusValue,
		},
	};
};

export const setProduct = product => ({
	type: SET_PRODUCT,
	payload: {
		description: SET_PRODUCT,
		id: product.id,
		name: product.name,
		productDescription: product.description,
		stockInicial: product.stockInicial,
		stock: product.stock,
		provider: product.provider,
		createdBy: product.createdBy,
		updatedBy: product.updatedBy,
	},
});

export const getProductById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_PRODUCT_BY_ID,
				variables: { id },
			})
			.then((res) => {
				dispatch(setProduct(res.data.productById));
			})
			.catch(() => {});
	}
);
export const closeModal = () => ({
	type: CLOSE_MODAL_PRODUCT,
	payload: {
		description: CLOSE_MODAL_PRODUCT,
	},
});

export const closeAlert = () => ({
	type: CLOSE_ALERT_PRODUCT,
	payload: {
		description: CLOSE_ALERT_PRODUCT,
	},
});

export const createProduct = (
	name,
	description,
	stockInicial,
	stock,
	provider,
	createdBy,
	updatedBy,
	createProductMutation,
	paginationPage,
) => async (dispatch) => {
	createProductMutation({
		variables: {
			name,
			description,
			stockInicial,
			stock,
			provider,
			createdBy,
			updatedBy,
		},
		refetchQueries: [{
			query: GET_PRODUCTS, variables: { paginationPage },
		}],
	})
		.then(() => {
			dispatch(openAlert('creado'));
			setTimeout(() => (window.location.assign('/products')), 2000);
		})
		.catch((res) => {
			const message = checkMessageError(res);
			dispatch(openAlert(message));
		});
};

export const editProduct = (
	id,
	name,
	description,
	stockInicial,
	stock,
	provider,
	updatedBy,
	editProductMutation,
	paginationPage,
) =>
	async (dispatch) => {
		editProductMutation({
			variables: {
				id,
				name,
				description,
				stockInicial,
				stock,
				provider,
				updatedBy,
			},
			refetchQueries: [{
				query: GET_PRODUCTS, variables: { paginationPage },
			}],
		})
			.then(() => {
				dispatch(openAlert('creado'));
				setTimeout(() => (window.history.back()), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};

export const deleteProduct = (obj, paginationPage, deleteProductMutation) => {
	const { id } = obj;
	return async (dispatch) => {
		await deleteProductMutation({
			variables: { id },
			refetchQueries: [{ query: GET_PRODUCTS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
	};
};

export const blockProduct = (obj, blockProductMutation) => {
	const { id } = obj;
	const status = obj.statusValue === 1 ? 0 : 1;
	return async (dispatch) => {
		await blockProductMutation({
			variables: { id, status },
		});
		dispatch(closeModal());
		window.location.reload();
	};
};
