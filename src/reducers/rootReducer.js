import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import ReducerHeader from './Header/reducerHeader';
import ReducerUserType from './userType/reducerUserType';
import ReducerLogin from './Login/reducerLogin';
import ReducerUser from './users/reducerUser';
import ReducerBank from './Bank/reducerBank';
import ReducerBankAccount from './Bank/reducerBankAccount';
import ReducerZone from './zone/reducerZone';
import ReducerLocation from './location/reducerLocation';
import ReducerPurchaseRequest from './PurchaseRequest/reducerPurchaseRequest';
import ReducerHotel from './Hotel/reducerHotel';
import ReducerEvent from './Event/reducerEvent';
import ReducerPayment from './Payment/reducerPayment';
import ReducerAccess from './Access/reducerAccess';
import ReducerSearch from './Search/reducerSearch';

import ReducerPagination from './List/reducerPagination';
import ReducerGuest from './Guest/reducerGuest';
import ReducerEventAccess from './Event/Access/reducerAccess';
import ReducerReservation from './Reservation/reducerReservation';
import ReducerRoom from './Room/reducerRoom';

const rootReducer = combineReducers({
	ReducerHeader,
	ReducerUserType,
	ReducerLogin,
	ReducerUser,
	ReducerSearch,
	ReducerBank,
	ReducerBankAccount,
	ReducerZone,
	ReducerLocation,
	ReducerEvent,
	ReducerPayment,
	ReducerAccess,
	ReducerPurchaseRequest,
	ReducerPagination,
	ReducerGuest,
	ReducerEventAccess,
	ReducerReservation,
	ReducerRoom,
	ReducerHotel,
	form: reduxFormReducer,
});

export default rootReducer;
