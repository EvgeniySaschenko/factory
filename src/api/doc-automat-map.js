const docAutomatMap= {

	/* DOC AUTOMAT MAP */

	addAutomatMap: ()=>{
		return window.baseUrl + `/doc-automat-map`;
	},

	editAutomatMap: ()=>{
		return window.baseUrl + `/doc-automat-map`;
	},

	getAutomatMapById: (obj)=>{
		return window.baseUrl + `/doc-automat-map/id/` + obj.id;
	},

	/* DOC AUTOMAT MAP ITEM */

	addAutomatMapItem: ()=>{
		return window.baseUrl + `/doc-automat-map/item`;
	},

	editAutomatMapItem: ()=>{
		return window.baseUrl + `/doc-automat-map/item`;
	},

	getAutomatMapItemAll: (obj)=>{
		return window.baseUrl + `/doc-automat-map/item/id_automat_map/` + obj.id_automat_map;
	},
	
}

export default docAutomatMap;