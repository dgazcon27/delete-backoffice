import {
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	SET_DESCRIPTION,
	CLEAN_STATE,
	SET_BANK,
	PAGE_UP,
	PAGE_DOWN,
	SET_BANK_ACCOUNT,
} from './actionsTypes';
import {
	GET_BANKS,
	GET_BANK_ACCOUNTS,
} from '../../queries/bank';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};
export const changePage = (currentPage, paginationPage) => {
	const paginations = {} || JSON.parse(localStorage.getItem('paginations'));
	paginations.userType = currentPage < paginationPage ? currentPage + 1 : currentPage - 1;

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
export const setBank = (id, name, currency) => ({
	type: SET_BANK,
	payload: {
		description: SET_BANK,
		id,
		name,
		currency,
	},
});
export const setBankAccount = (id, owner, bank, currency, accountNumber, type, comment) => ({
	type: SET_BANK_ACCOUNT,
	payload: {
		description: SET_BANK_ACCOUNT,
		id,
		owner,
		bank,
		currency,
		accountNumber,
		type,
		comment,
	},
});

export const cleanState = () => ({
	type: CLEAN_STATE,
	payload: {
		description: CLEAN_STATE,
	},
});

export const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: {
		description: CLOSE_MODAL,
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
		description: OPEN_ALERT,
	},
});
export const deleteBank = (id, paginationPage, deleteBankMutation) => (
	async (dispatch) => {
		await deleteBankMutation({
			variables: { id },
			refetchQueries: [{ query: GET_BANKS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		window.location.reload();
	});
export const openModal = (modalType, bank) => ({
	type: OPEN_MODAL,
	payload: {
		modalType,
		description: OPEN_MODAL,
		name: bank.name,
		id: bank.id,
	},
});
export const setName = name => ({
	type: SET_NAME,
	payload: {
		description: SET_NAME,
		name,
	},
});

export const setDescription = rolDescription => ({
	type: SET_DESCRIPTION,
	payload: {
		description: SET_DESCRIPTION,
		rolDescription,
	},
});

export const createBank = (name, currency, paginationPage, createBankMutation) =>
	async (dispatch) => {
		if (name !== '' && currency !== '') {
			createBankMutation({
				variables: { name, currency },
				refetchQueries: [{ query: GET_BANKS, variables: { paginationPage } }],
			})
				.then(() => {
					dispatch(openAlert('creado'));
					setTimeout(() => (window.location.assign('bank')), 2000);
				})
				.catch((res) => {
					const message = checkMessageError(res);
					dispatch(openAlert(message));
				});
		}
	};
export const createBankAccount = (
	bank,
	owner,
	accountNumber,
	type,
	comment,
	currency,
	paginationPage,
	createBankAccountMutation,
) =>
	async (dispatch) => {
		createBankAccountMutation({
			variables: {
				bank, owner, accountNumber, type, comment, currency,
			},
			refetchQueries: [{ query: GET_BANK_ACCOUNTS, variables: { paginationPage } }],
		})
			.then(() => {
				dispatch(openAlert('creado'));
				setTimeout(() => (window.location.assign('bank-account')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};

export const editBank = (id, name, currency, paginationPage, editBankMutation) =>
	async (dispatch) => {
		if (name !== '' && currency !== '') {
			await editBankMutation({
				variables: { id, name, currency },
				refetchQueries: [{ query: GET_BANKS, variables: { paginationPage } }],
			})

				.then(() => {
					dispatch(openAlert('edit'));
					setTimeout(() => (window.location.assign('bank')), 2000);
				})
				.catch((res) => {
					const message = checkMessageError(res);
					dispatch(openAlert(message));
				});
		}
	};
export const editBankAccount = (
	id,
	bank,
	owner,
	accountNumber,
	type,
	currency,
	comment,
	paginationPage,
	editBankAccountMutation,
) =>
	async (dispatch) => {
		await editBankAccountMutation({
			variables: {
				id, bank, owner, accountNumber, type, currency, comment,
			},
			refetchQueries: [{ query: GET_BANK_ACCOUNTS, variables: { paginationPage } }],
		})

			.then(() => {
				dispatch(openAlert('edit'));
				setTimeout(() => (window.location.assign('bank')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};
