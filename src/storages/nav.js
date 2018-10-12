let init= [];

let nav= (store= init, action) =>{
	switch(action.type){

		case('INIT_NAV'): {
			return action.data;
		}

		case('ACTIVE_ITEM_NAV'): {
			store= store.map( (e) =>{
				e.status= action.id != e.id ? false : true;
				return e;
			})
			return store;
		}

		default:
			return store;
	}
}

export default nav;