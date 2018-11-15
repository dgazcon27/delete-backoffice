import { SB_COLLAPSE_CONFIG, SB_COLLAPSE_TRACKER } from '../../actions/SideBar/actionsTypes';

const initialState = {
	openConfig: false,
	openTracker: false,
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
		default:
			return state;
	}
};
export default ReducerSideBar;
