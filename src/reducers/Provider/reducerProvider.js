import {
	SET_PROVIDER,
	OPEN_MODAL_PROVIDER,
	OPEN_ALERT_PROVIDER,
	CLOSE_MODAL_PROVIDER,
	CLOSE_ALERT_PROVIDER,
	EDIT_PROVIDER,
	DELETE_PROVIDER,
	SET_COUNTRIES_STATES,
	SET_COUNTRIES,
} from '../../actions/Provider/actionsTypes';

const initialState = {
	id: 0,
	name: '',
	descriptionProvider: '',
	rif: '',
	phone: '',
	address: '',
	email: '',
	states: [],
	category: 0,
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
	statusValue: 0,
	countryName: '',
	stateName: '',
	categoryName: '',
	country: 0,
};

const ReducerProvider = (state = initialState, action = {}) => {
	switch (action.type) {
		case EDIT_PROVIDER:
			return ({
				...state,
			});
		case SET_PROVIDER:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				descriptionProvider: action.payload.descriptionProvider,
				rif: action.payload.rif,
				phone: action.payload.phone,
				address: action.payload.address,
				email: action.payload.email,
				state: action.payload.state,
				category: action.payload.category,
				country: action.payload.country,
				countryName: action.payload.countryName,
				stateName: action.payload.stateName,
				categoryName: action.payload.categoryName,
			});
		case SET_COUNTRIES_STATES:
			return ({
				...state,
				states: action.payload.states,
				country: action.payload.id,
			});
		case SET_COUNTRIES:
			return ({
				...state,
				country: action.payload.id,
			});
		case DELETE_PROVIDER:
			return ({
				...state,
				isOpen: true,
			});
		case OPEN_MODAL_PROVIDER:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_PROVIDER:
			return ({
				...state,
				isOpen: false,
				id: 0,
			});
		case OPEN_ALERT_PROVIDER:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_PROVIDER:
			return ({
				...state,
				alertOpen: false,
			});
		default:
			return state;
	}
};

export default ReducerProvider;
