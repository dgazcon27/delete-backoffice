import {
	SET_NAME,
	OPEN_MODAL,
	OPEN_ALERT,
	CLOSE_ALERT,
	CLOSE_MODAL,
	SET_DESCRIPTION,
	CLEAN_STATE,
	SET_BANK,
	SET_BANK_ACCOUNT,
} from './actionsTypes';
import {
	GET_BANKS,
	GET_BANK_ACCOUNTS,
	GET_BANK_BY_ID,
	GET_ACCOUNT_BY_ID,
} from '../../queries/bank';
import { client } from '../../config/configStore';

const checkMessageError = (res) => {
	const message = res.graphQLErrors[0];
	const pass = message.message.split(' ');
	const errorOutput = pass.filter(e => e.includes('"$') || e.includes('validation'));
	const msg = errorOutput.toString();
	return (msg.replace('$', '').replace('"', '').replace('"', ''));
};

export const setBank = bank => ({
	type: SET_BANK,
	payload: {
		description: SET_BANK,
		id: bank.id,
		name: bank.name,
		currency: bank.currency,
	},
});

export const getBankById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_BANK_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { bank } = res.data;
				dispatch(setBank(bank));
			})
			.catch(() => {});
	}
);


export const setBankAccount = account => ({
	type: SET_BANK_ACCOUNT,
	payload: {
		description: SET_BANK_ACCOUNT,
		id: account.id,
		owner: account.owner.id,
		bank: account.bank.id,
		currency: account.currency,
		accountNumber: account.accountNumber,
		type: account.type,
		comment: account.comment,
	},
});

export const getAccountById = id => (
	async (dispatch) => {
		client
			.query({
				query: GET_ACCOUNT_BY_ID,
				variables: { id },
			})
			.then((res) => {
				const { bankAccount } = res.data;
				dispatch(setBankAccount(bankAccount));
			})
			.catch(() => {});
	}
);

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
		description: CLOSE_ALERT,
	},
});
export const deleteBank = (obj, paginationPage, deleteBankMutation) => {
	const { id } = obj;
	return async (dispatch) => {
		await deleteBankMutation({
			variables: { id },
			refetchQueries: [{ query: GET_BANKS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		// window.location.reload();
	};
};
export const deleteBankAccount = (obj, paginationPage, deleteBankMutation) => {
	const { id } = obj;
	return async (dispatch) => {
		await deleteBankMutation({
			variables: { id },
			refetchQueries: [{ query: GET_BANK_ACCOUNTS, variables: { paginationPage } }],
		});
		dispatch(closeModal());
		// window.location.reload();
	};
};
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

export const editBank = (bank, paginationPage, editBankMutation) =>
	async (dispatch) => {
		await editBankMutation({
			variables: bank,
			refetchQueries: [{ query: GET_BANKS, variables: { paginationPage } }],
		})

			.then(() => {
				dispatch(setBank(bank));
				dispatch(openAlert('edit'));
				setTimeout(() => (window.location.replace('/bank')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};
export const editBankAccount = (
	account,
	paginationPage,
	editBankAccountMutation,
) =>
	async (dispatch) => {
		await editBankAccountMutation({
			variables: account,
			refetchQueries: [{ query: GET_BANK_ACCOUNTS, variables: { paginationPage } }],
		})

			.then(() => {
				dispatch(openAlert('edit'));
				dispatch(setBankAccount({
					...account,
					owner: { id: account.owner },
					bank: { id: account.bank },
				}));
				setTimeout(() => (window.location.assign('/bank-account')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	};
