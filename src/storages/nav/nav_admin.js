let nav_admin= ((store= [], action)=>{
	switch(action.type){
		case('INIT=Nav_admin'):{
			return action.data;
		}
		case('ACTIVE_ITEM=Nav_admin'):{
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

export default nav_admin;