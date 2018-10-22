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
import ReducerSearchUsers from './users/reducerSearchUsers';
import ReducerPurchaseRequest from './PurchaseRequest/reducerPurchaseRequest';
import ReducerEvent from './Event/reducerEvent';
import ReducerPayment from './Payment/reducerPayment';
import ReducerAccess from './Access/reducerAccess';
import ReducerSearch from './Search/reducerSearch';

import ReducerPagination from './List/reducerPagination';

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
	ReducerSearchUsers,
	ReducerEvent,
	ReducerPayment,
	ReducerAccess,
	ReducerPurchaseRequest,
	ReducerPagination,
	form: reduxFormReducer,
});

export default rootReducer;
