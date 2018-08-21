import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import ReducerHeader from './Header/reducerHeader';
import ReducerUserType from './userType/reducerUserType';
import ReducerLogin from './Login/reducerLogin';
import ReducerUser from './users/reducerUser';
import ReducerLocation from './location/reducerLocation';
import ReducerSearchLocation from './location/reducerSearchLocation';

const rootReducer = combineReducers({
	ReducerHeader,
	ReducerUserType,
	ReducerLogin,
	ReducerUser,
	ReducerLocation,
	ReducerSearchLocation,
	form: reduxFormReducer,
});

export default rootReducer;
