let mysql = require('mysql');

let db= mysql.createPool({
	connectionLimit : 100,
	charset: 'UTF8_GENERAL_CI',
	host: 'dvm02.mysql.tools',
	user: 'dvm02_factory',
	password: 'p48k63f5',
	database: 'dvm02_factory'
});

module.exports= db;