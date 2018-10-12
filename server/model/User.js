let db= require('../ext/db.js');
let md5= require('md5');
var conf = require('../config');

class User{
	constructor(){
		this.db= db;
	}
	// шифрование пароля
	encryptPassword(pass){
		return md5( md5( pass + conf.get('secret') ) );
	}

	getUserLogin(login){
		return new Promise((resolve, reject)=> {
			this.db.getConnection((err, connection)=> {
				if(!err){
					// Если удалось установить соиденение
					connection.query(`SELECT 
						* 
					FROM ff_user
					WHERE login = ?`, 
					[login], 
					(err, data) => {
						data ? resolve(data) : reject(err);
						// Освободить сооденение
						connection.release();
					});
				} else {
					// Если не удалось установить соиденение
					reject(err);
				}
			});
		});
	}

	getUserLoginPass(login, pass){
		pass= this.encryptPassword(pass);
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT 
						* 
					FROM ff_user
					WHERE login = ? AND pass = ?`, 
					[login, pass],
					(err, data)=>{
						data ? resolve(data) : reject(err);
						connection.release();
					});
				} else {
					reject(err);
				}
			});
		});
	}
	
	getUserId(id){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT 
						id,
						login,
						pass,
						rank,
						name,
						date_birth
					FROM ff_user
					WHERE id= ?`
					[id],
					(err, data)=>{
						data ? resolve(data) : reject(err);
						connection.release();
					});
				} else {
					reject(err);
				}
			});
		});
	}

	addUser(id_visitor, login, pass, name, rank, date_birth){
		pass= this.encryptPassword(pass);
		// Проверка наличия пользователя с таким логином в БД
		return new Promise( (resolve, reject)=> {
			this.getUserLogin(login)
			.then( (data)=> {
				// Проверка наличия свободных сооденений
				this.db.getConnection((err, connection) => {
					if(!err){
						if(data.length === 0){
							//Если не существует
							connection.query(`INSERT 
								INTO ff_user 
									(id_visitor_create,
									login, 
									pass,
									name,
									rank,
									date_birth)
								VALUE (?, ?, ?, ?, ?, ?)`, 
								[
									id_visitor,
									login,
									pass,
									name,
									rank,
									date_birth
								], 
								(err, data)=> {
									data.insertId ? resolve(data.insertId) : reject(err)
									// Освободить сооденение
									connection.release();
								});
						} else {
							// Если существует
							resolve('Такой пользователь уже существует');
						}
					} else {
						reject(err)
					}
				});
			});
		});
	}

	addRank(id_visitor, name){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`INSERT 
						INTO ff_rank
							(id_visitor_create,
							name)
						VALUE(?, ?)`,
						[id_visitor, name],
						(err, data)=>{
							data.insertId ? resolve(data.insertId) : reject(err);
							connection.release();
						});
				} else {
					reject(err);
				}
			});
		});
	}

	editRank(id, id_visitor, name){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`UPDATE ff_rank
						SET
							id_visitor_update= ?,
							name= ?,
							date_update= ?
						WHERE id= ?`,
						[id_visitor, name, 'CURRENT_TIMESTAMP', id],
						(err, data)=>{
							data.affectedRows ? resolve(data.affectedRows) : reject(err);
							connection.release();
						});
				} else {
					reject(err);
				}
			});
		});
	}
}

module.exports= User;