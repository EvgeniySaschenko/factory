const equipment= {

	/* EQUIPMENT */

	addEquipment(){
		return window.baseUrl + `/equipment`;
	},

	editEquipment(){
		return window.baseUrl + `/equipment`;
	},

	getEquipmentAll(){
		return window.baseUrl + `/equipment/all`;
	},

	getEquipmentById(obj){
		return window.baseUrl + `/equipment/id/` + obj.id;
	},

}

export default equipment;