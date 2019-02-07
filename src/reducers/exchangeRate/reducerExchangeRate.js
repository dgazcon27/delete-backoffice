import {
	OPEN_MODAL_EXCHANGE_RATE,
	CLOSE_MODAL_EXCHANGE_RATE,
	OPEN_ALERT_EXCHANGE_RATE,
	CLOSE_ALERT_EXCHANGE_RATE,
	SET_EXCHANGE_RATE,
} from '../../actions/exchangeRate/actionsTypes';

const initialState = {
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
	id: 0,
	value: '',
	active: false,
};

const ReducerExchangeRate = (state = initialState, action = {}) => {
	switch (action.type) {
		case OPEN_MODAL_EXCHANGE_RATE:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				modalType: action.payload.modalType,
			});
		case CLOSE_MODAL_EXCHANGE_RATE:
			return ({
				...state,
				isOpen: false,
				id: 0,
				value: '',
			});
		case OPEN_ALERT_EXCHANGE_RATE:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_EXCHANGE_RATE:
			return ({
				...state,
				alertOpen: false,
			});
		case SET_EXCHANGE_RATE:
			return ({
				...state,
				id: action.payload.id,
				value: action.payload.value,
				active: action.payload.active,
			});
		default:
			return state;
	}
};

export default ReducerExchangeRate;
