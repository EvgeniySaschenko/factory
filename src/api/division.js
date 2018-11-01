const division= {

	/* DIVISION */

	addDivision(){
		return window.baseUrl + `/division`;
	},

	editDivision(){
		return window.baseUrl + `/division`;
	},

	getDivisionAll(){
		return window.baseUrl + `/division`;
	},

	/* RANK */

	addRank(){
		return window.baseUrl + `/division/rank`;
	},

	editRank(){
		return window.baseUrl + `/division/rank`;
	},

	getRankByIdDividion(obj){
		return window.baseUrl + `/division/rank/id_division/` + obj.id_division;
	},

}

export default division;