let db = require('../ext/db');

class Nav {
	constructor(){
		this.db= db;
	}

	getAll(){
		this.db.query('SELECT * FROM ff_nav', function (error, results, fields) {
			if (error) throw error;
			console.log('The solution is: ', results);
		});
	}
}

module.exports= Nav;