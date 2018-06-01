import {
	OPEN_SIDEBAR,
	CLOSE_SIDEBAR,
	OPEN_PROFILE,
	CLOSE_PROFILE,
} from '../../actions/Header/actionsTypes';


const stateInitial = {
	openDrawer: false,
	openMenuProfile: null,
};

const ReducerHeader = (state = stateInitial, action = {}) => {
	switch (action.type) {
		case OPEN_SIDEBAR:
			return ({
				...state,
				openDrawer: true,
			});
		case CLOSE_SIDEBAR:
			return ({
				...state,
				openDrawer: false,
			});
		case OPEN_PROFILE:
		console.log(action);
			return ({
				...state,
				openMenuProfile: action.payload.event,
			});
		case CLOSE_PROFILE:
			return ({
				...state,
				openMenuProfile: null,
			});
		default:
			return state;
	}
};

export default ReducerHeader;
