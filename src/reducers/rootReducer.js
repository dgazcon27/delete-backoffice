import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import ReducerHeader from './Header/reducerHeader';
import ReducerUserType from './userType/reducerUserType';
import ReducerLogin from './Login/reducerLogin';
import ReducerUser from './users/reducerUser';
import ReducerSearchRoles from './userType/reducerSearchRoles';
import ReducerBank from './Bank/reducerBank';
import ReducerZone from './zone/reducerZone';

const rootReducer = combineReducers({
	ReducerHeader,
	ReducerUserType,
	ReducerLogin,
	ReducerUser,
	ReducerSearchRoles,
	ReducerBank,
	ReducerZone,
	form: reduxFormReducer,
});

export default rootReducer;
