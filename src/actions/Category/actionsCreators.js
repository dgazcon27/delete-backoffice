import {
	GET_CATEGORIES,
	GET_CATEGORY_BY_ID,
} from '../../queries/category';

import {
	OPEN_MODAL_CATEGORY,
	CLOSE_MODAL_CATEGORY,
	SET_CATEGORY,
	CLOSE_ALERT_CATEGORY,
	SET_ALERT_CATEGORY,
} from './actionsTypes';

import { client } from '../../config/configStore';

export const setAlert = isOpen => ({
	type: SET_ALERT_CATEGORY,
	payload: {
		isOpen,
	},
});

export const setCategory = category => ({
	type: SET_CATEGORY,
	payload: {
		id: category.id,
		name: category.name,
		categoryDescription: category.description,
		description: SET_CATEGORY,
	},
});

export const openModal = (modalType, Category) => ({
	type: OPEN_MODAL_CATEGORY,
	payload: {
		modalType,
		description: OPEN_MODAL_CATEGORY,
		id: Category.id,
	},
});

export const closeModal = modalType => ({
	type: CLOSE_MODAL_CATEGORY,
	payload: {
		modalType,
		description: CLOSE_MODAL_CATEGORY,
	},
});
export const deleteCategory = (obj, paginationPage, deleteCategoryMutation) => {
	const { id } = obj;
	return async (dispatch) => {
		await deleteCategoryMutation({
			variables: { id },
			refetchQueries: [{ query: GET_CATEGORIES, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		// window.location.reload();
	};
};

export const createCategory = (name, description, paginationPage, createCategoryMutation) =>
	async () => {
		createCategoryMutation({
			variables: { name, description },
			refetchQueries: [{ query: GET_CATEGORIES, variables: { paginationPage } }],
		})
			.then(() => {
				setTimeout(() => (window.location.assign('Category')), 2000);
			})
			.catch(() => {
			});
	};

export const editCategory = (id, name, description, paginationPage, editCategoryMutation) =>
	async () => {
		await editCategoryMutation({
			variables: { id, name, description },
			refetchQueries: [{ query: GET_CATEGORIES, variables: { paginationPage } }],
		})
			.then(() => {
				// dispatch(setBank(bank));
				// dispatch(openAlert('edit'));
				setTimeout(() => (window.location.replace('/Category')), 2000);
			})
			.catch(() => {
				// const message = checkMessageError(res);
				// dispatch(openAlert(message));
			});
	};

export const closeAlert = () => ({
	type: CLOSE_ALERT_CATEGORY,
	payload: {
		description: CLOSE_ALERT_CATEGORY,
	},
});

export const getCategoryById = id =>
	async (dispatch) => {
		client
			.query({
				query: GET_CATEGORY_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { categoryById } = res.data;
				dispatch(setCategory(categoryById));
			})
			.catch(() => {});
	};
