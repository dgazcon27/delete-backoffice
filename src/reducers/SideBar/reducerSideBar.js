import SB_COLLAPSE from '../../actions/SideBar/actionsTypes';

const initialState = {
	open: false,
};

const ReducerSideBar = (state = initialState, action = {}) => {
	switch (action.type) {
		case SB_COLLAPSE:
			return ({
				...state,
				open: action.payload.open,
			});
		default:
			return state;
	}
};
export default ReducerSideBar;
