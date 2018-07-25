import {
	EDIT_USER,
	OPEN_MODAL,
	CLOSE_MODAL,
} from './actionsTypes';
import { GET_USERS } from '../../queries/users';


export const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: {
		description: CLOSE_MODAL,
	},
});

export const editUser = () => ({
	type: EDIT_USER,
	payload: {
		description: EDIT_USER,
	},
});
export const blockUser = (id, statusValue, blockRolMutation) => {
	const status = statusValue === 1 ? 2 : 1;
	return async (dispatch) => {
		await blockRolMutation({ variables: { id, status } });
		dispatch(closeModal());
	};
};

export const deleteUser = (id, statusValue, paginationPage, deleteRolMutation) => {
	const status = statusValue;
	return async (dispatch) => {
		await deleteRolMutation({
			variables: { id, status },
			refetchQueries: [{ query: GET_USERS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	};
};

export const openModal = (modalType, _user) => ({
	type: OPEN_MODAL,
	payload: {
		modalType,
		description: OPEN_MODAL,
		statusValue: _user.status.id,
		name: _user.name,
		id: _user.id,
	},
});
