import { combineReducers } from "redux";

import storeReducer from './store.reducer'


const rootReducer = combineReducers({
	storeReducer,
});

export default rootReducer;