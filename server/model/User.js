const db= require('../ext/db.js');
const md5= require('md5');
const conf = require('../config');

class User{
	constructor(){
		this.db= db;
		this.secret= conf.get('secret');
		this.msg= conf.get('msg');
	}
	// шифрование пароля
	encryptPassword(pass){
		return md5( md5( pass + this.secret ) );
	}

	/* USER */
	
	addUser(req){
		const { login, pass, name, rank, date_birth }= req.body;
		const { id_visitor }= req.session.user;
		const passEncrypt= this.encryptPassword(pass);

		return new Promise( (resolve, reject)=> {
			this.getUserByLogin(login)
			.then( (data)=> {
				this.db.getConnection((err, connection) => {
					if(!err){
						if(data.length === 0){
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
									passEncrypt,
									name,
									rank,
									date_birth
								], 
								(err, data= false)=>{
									const { insertId }= data;
									insertId ? resolve(Object.assign( {}, this.msg.add, { id : data.insertId } )) : reject( { data: this.msg.err, err : err } );
									connection.release();
								});
						} else {
							resolve( this.msg.exists );
						}
					} else {
						reject( { data: this.msg.err, err : err } );
					}
				});
			});
		});
	}

	getUserByLogin(login){
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
						data ? resolve(data) : reject( { data: this.msg.err, err : err } );
						// Освободить сооденение
						connection.release();
					});
				} else {
					// Если не удалось установить соиденение
					reject( { data: this.msg.err, err : err } );
				}
			});
		});
	}

	getUserByLoginAndPass(login, pass){
		const passEncrypt= this.encryptPassword(pass);
		
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT 
						* 
					FROM ff_user
					WHERE login = ? AND pass = ?`, 
					[login, passEncrypt],
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
	
	getUserById(req){
		const { id }= req.params;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT 
						*
					FROM ff_user
					WHERE id= ?`,
					[id],
					(err, data)=>{
						data ? resolve(data[0]) : reject( { data: this.msg.err, err : err } );
						connection.release();
					});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			});
		});
	}

}

module.exports= User;