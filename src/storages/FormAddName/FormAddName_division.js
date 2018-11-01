let FormAddName_division= ((store= '', action)=>{
	switch(action.type){
		case('SUBMIT=FormAddName_division'):{
			return action.data;
		}
		case('ERR=FormAddName_division'):{
			return action.data;
		}
		default:
			return store;
	}
});

export default FormAddName_division;