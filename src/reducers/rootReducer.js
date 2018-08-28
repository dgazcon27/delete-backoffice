import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import ReducerHeader from './Header/reducerHeader';
import ReducerUserType from './userType/reducerUserType';
import ReducerLogin from './Login/reducerLogin';
import ReducerUser from './users/reducerUser';
import ReducerSearchRoles from './userType/reducerSearchRoles';
import ReducerBank from './Bank/reducerBank';
import ReducerBankAccount from './Bank/reducerBankAccount';
import ReducerZone from './zone/reducerZone';
import ReducerLocation from './location/reducerLocation';
import ReducerSearchLocation from './location/reducerSearchLocation';
import ReducerSearchUsers from './users/reducerSearchUsers';
import ReducerPayment from './Payment/reducerPayment';

const rootReducer = combineReducers({
	ReducerHeader,
	ReducerUserType,
	ReducerLogin,
	ReducerUser,
	ReducerSearchRoles,
	ReducerBank,
	ReducerBankAccount,
	ReducerZone,
	ReducerLocation,
	ReducerSearchLocation,
	ReducerSearchUsers,
	ReducerPayment,
	form: reduxFormReducer,
});

export default rootReducer;
