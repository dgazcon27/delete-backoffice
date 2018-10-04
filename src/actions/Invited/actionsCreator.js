import {
	openAlert,
	checkMessageError,
} from '../sharedActions/sharedActions';

export const createInvited = (invited, create) => (
	async (dispatch) => {
		create({
			variables: invited,
		})
			.then(() => {
				dispatch(openAlert('creado'));
				// setTimeout(() => (window.location.assign('events')), 2000);
			})
			.catch((res) => {
				const message = checkMessageError(res);
				dispatch(openAlert(message));
			});
	});


export const getInvitedById = () => (
	{}
);
