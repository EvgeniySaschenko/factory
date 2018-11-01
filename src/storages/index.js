import { createStore, combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import FormAddName_division from './FormAddName/FormAddName_division';


import nav_main from './nav/nav_main';
import nav_admin from './nav/nav_admin';


let reducers= combineReducers({
	form: formReducer,
	nav_main: nav_main,
	nav_admin: nav_admin,
	FormAddName_division: FormAddName_division
});

let store= createStore(reducers);

export default store;