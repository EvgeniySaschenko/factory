let nav_main= ((store= [], action)=>{
	switch(action.type){
		case('INIT_NAV=Nav_main'):{
			return action.data;
		}
		case('ACTIVE_ITEM=Nav_main'):{
			let newStore= store.map((e, i)=>{
				e.status= action.id != e.id ? false : true;
				return e;
			});
			return newStore;
		}
		default:
			return store;
	}
});

export default nav_main;