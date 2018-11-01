const docRoutMap= {

	/* DOC ROUT MAP */

	addRoutMap: ()=>{
		return window.baseUrl + `/doc-rout-map`;
	},

	editRoutMap: ()=>{
		return window.baseUrl + `/doc-rout-map`;
	},

	getRoutMapById: (obj)=>{
		return window.baseUrl + `/doc-rout-map/id/` + obj.id;
	},

	/* DOC ROUT MAP ITEM */

	addRoutMapItem: ()=>{
		return window.baseUrl + `/doc-rout-map/item`;
	},

	editRoutMapItem: ()=>{
		return window.baseUrl + `/doc-rout-map/item`;
	},

	getRoutMapItemAll: (obj)=>{
		return window.baseUrl + `/doc-rout-map/item/id_rout_map/` + obj.id_rout_map;
	},
	
}

export default docRoutMap;