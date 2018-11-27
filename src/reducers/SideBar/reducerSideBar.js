import {
	SB_COLLAPSE_CONFIG,
	SB_COLLAPSE_TRACKER,
	SB_COLLAPSE_ADMINISTRATION,
} from '../../actions/SideBar/actionsTypes';

const initialState = {
	openConfig: false,
	openTracker: false,
	openAdmin: false,
};

const ReducerSideBar = (state = initialState, action = {}) => {
	switch (action.type) {
		case SB_COLLAPSE_CONFIG:
			return ({
				...state,
				openConfig: action.payload.open,
			});
		case SB_COLLAPSE_TRACKER:
			return ({
				...state,
				openTracker: action.payload.open,
			});
		case SB_COLLAPSE_ADMINISTRATION:
			return ({
				...state,
				openAdmin: action.payload.open,
			});
		default:
			return state;
	}
};
export default ReducerSideBar;
