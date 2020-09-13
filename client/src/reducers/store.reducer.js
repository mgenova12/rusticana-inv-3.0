import actionTypes from '../actionTypes';

const initialState = {
  stores: [],
};

export default (state = initialState, { type, payload }) => {
	const newState = { ...state };
	switch (type) {
		 case actionTypes.GET_STORES: 
		      newState.stores = payload.stores;
		      return newState;		      
		default: 
			return state;
	}
}
