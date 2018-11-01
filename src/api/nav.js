const nav= {

	/** NAV */

	getNavByType(obj){
		return window.baseUrl + `/nav/type/` + obj.type;
	},
	
}

export default nav;