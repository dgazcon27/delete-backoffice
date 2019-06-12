import {
	SET_PRODUCT,
	OPEN_MODAL_PRODUCT,
	OPEN_ALERT_PRODUCT,
	CLOSE_MODAL_PRODUCT,
	CLOSE_ALERT_PRODUCT,
	EDIT_PRODUCT,
	DELETE_PRODUCT,
} from '../../actions/Product/actionsTypes';

const initialState = {
	id: 0,
	name: '',
	description: '',
	stockInicial: 0,
	stock: 0,
	provider: 0,
	createdBy: 0,
	updatedBy: 0,
	isOpen: false,
	alertOpen: false,
	alertType: '',
	modalType: '',
	statusValue: 0,
};

const ReducerProduct = (state = initialState, action = {}) => {
	switch (action.type) {
		case EDIT_PRODUCT:
			return ({
				...state,
			});
		case SET_PRODUCT:
			return ({
				...state,
				id: action.payload.id,
				name: action.payload.name,
				description: action.payload.productDescription,
				stockInicial: action.payload.stockInicial,
				stock: action.payload.stock,
				provider: action.payload.provider.id,
				createdBy: action.payload.createdBy.id,
				updatedBy: action.payload.updatedBy.id,
			});
		case DELETE_PRODUCT:
			return ({
				...state,
				isOpen: true,
			});
		case OPEN_MODAL_PRODUCT:
			return ({
				...state,
				isOpen: true,
				id: action.payload.id,
				modalType: action.payload.modalType,
				statusValue: action.payload.statusValue,
			});
		case CLOSE_MODAL_PRODUCT:
			return ({
				...state,
				isOpen: false,
				id: 0,
			});
		case OPEN_ALERT_PRODUCT:
			return ({
				...state,
				alertOpen: true,
				alertType: action.payload.alertType,
			});
		case CLOSE_ALERT_PRODUCT:
			return ({
				...state,
				alertOpen: false,
			});
		default:
			return state;
	}
};

export default ReducerProduct;
