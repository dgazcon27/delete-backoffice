import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import ReducerHeader from './Header/reducerHeader';
import ReducerUserType from './userType/reducerUserType';
import ReducerLogin from './Login/reducerLogin';
import ReducerUser from './users/reducerUser';
import ReducerSearchRoles from './userType/reducerSearchRoles';

const rootReducer = combineReducers({
	ReducerHeader,
	ReducerUserType,
	ReducerLogin,
	ReducerUser,
	ReducerSearchRoles,
	form: reduxFormReducer,
});

export default rootReducer;
