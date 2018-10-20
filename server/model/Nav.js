let db= require('../ext/db.js');
const nconf= require('../config');

class Nav{
	constructor(){
		this.db= db;
		this.msg= nconf.get('msg');
	}

	/** NAV */

	getNav(){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_nav
						ORDER BY name ASC, id ASC`,
						(err, data)=>{
							data ? resolve(data) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			});
		});
	}

}

module.exports= Nav;