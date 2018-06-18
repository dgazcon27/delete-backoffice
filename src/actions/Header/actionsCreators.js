import {
	OPEN_SIDEBAR,
	CLOSE_SIDEBAR,
	OPEN_PROFILE,
	CLOSE_PROFILE,
} from './actionsTypes';

export const openSideBar = () => ({
	type: OPEN_SIDEBAR,
	payload: {
		description: OPEN_SIDEBAR,
	},
});

export const closeSideBar = () => ({
	type: CLOSE_SIDEBAR,
	payload: {
		description: CLOSE_SIDEBAR,
	},
});

export const openProfile = event => ({
	type: OPEN_PROFILE,
	payload: {
		description: OPEN_PROFILE,
		event: event.currentTarget,
	},
});

export const closeProfile = () => ({
	type: CLOSE_PROFILE,
	payload: {
		description: CLOSE_PROFILE,
	},
});
