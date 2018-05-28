import { combineReducers } from 'redux';
import ReducerHeader  from './Header/reducerHeader';
import ReducerUserType from './userType/reducerUserType';
/* import todos from './reducer_1';
import visibilityFilter from './reducer_2';
import visibilityFilter from './reducer_N'; */

const rootReducer = combineReducers({
  ReducerHeader,
  ReducerUserType,
});

export default rootReducer;