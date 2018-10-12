import { createStore, combineReducers } from 'redux';

import nav from './nav.js';

let reducers= combineReducers({
	nav: nav
});

let store= createStore(reducers);

export default store;