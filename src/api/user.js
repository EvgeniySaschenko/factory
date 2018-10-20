const user= {
	getUserById: (obj)=>{
		return `${ window.baseUrl }/user/id/${ obj.id }`;
	}
}

export default user;