const material= {
	
	/* MATERIAL */

	addMaterial(){
		return window.baseUrl + `/material`;
	},

	editMaterial(){
		return window.baseUrl + `/material`;
	},

	getMaterialById(obj){
		return window.baseUrl + `/material/id/` + obj.id;
	},

	getMaterialByTypeAndUse(obj){
		return window.baseUrl + `/material/id_type/` + obj.id_type + `/id_use/` + obj.id_use;
	},
	
	/** MATERIAL TYPE */

	addType(){
		return window.baseUrl + `/material/type`;
	},

	editType(){
		return window.baseUrl + `/material/type`;
	},

	getMaterialTypeAll(){
		return window.baseUrl + `/material/type/all`;
	},

}

export default material;