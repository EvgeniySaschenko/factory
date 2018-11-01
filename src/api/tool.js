const tool= {

	/** TOOL */
	
	addTool(){
		return window.baseUrl + `/tool`;
	},

	editTool(){
		return window.baseUrl + `/tool`;
	},

	getToolByType(obj){
		return window.baseUrl + `/tool/id_type/` + obj.id_type;
	},
	
	/** TOOL TYPE */

	addType(){
		return window.baseUrl + `/tool/type`;
	},

	editType(){
		return window.baseUrl + `/tool/type`;
	},

	ggetToolType(){
		return window.baseUrl + `/tool/type`;
	},

}
	
	export default tool;