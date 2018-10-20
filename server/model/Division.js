const db= require('../ext/db.js');
const nconf= require('../config');

class Division{
	constructor(){
		this.db= db;
		this.msg= nconf.get('msg');
	}

	/** DIVISION */

	addDivision(req){
		const { name }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.getDivisionСheckExists(name)
				.then((data)=>{
					if(data.length === 0){
						this.db.getConnection((err, connection)=>{
							if(!err){
								connection.query(`INSERT 
									INTO ff_division
										(id_visitor_create,
										name)
									VALUE(?, ?)`,
									[id_visitor, name],
									(err, data= false)=>{
										const { insertId }= data;
										insertId ? resolve(Object.assign( {}, this.msg.add, { id : data.insertId } )) : reject( { data: this.msg.err, err : err } );
										connection.release();
									});
							} else {
								reject( { data: this.msg.err, err : err } );
							}
						});
					} else {
						resolve( this.msg.exists );
					}
				})
				.catch((err)=>{
					reject( { data: this.msg.err, err : err } );
				})
		});
	}

	editDivision(req){
		const { id, name }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.getDivisionСheckExists(name)
				.then((data)=>{
					if(data.length === 0){
						this.db.getConnection((err, connection)=>{
							if(!err){
								connection.query(`UPDATE ff_division
									SET
										id_visitor_update= ?,
										name= ?,
										date_update= ?
									WHERE id= ?`,
									[id_visitor, name, 'CURRENT_TIMESTAMP', id],
									(err, data= false)=>{
										const { affectedRows }= data;
										affectedRows ? resolve( this.msg.edit ) : reject( { data: this.msg.err, err : err } );
										connection.release();
									});
							} else {
								reject( { data: this.msg.err, err : err } );
							}
						});
					} else {
						resolve( this.msg.exists );
					}
				})
				.catch((err)=>{
					reject( { data: this.msg.err, err : err } );
				})
		});
	}

	getDivisionСheckExists(name){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_division
						WHERE name= ?`,
						[name],
						(err, data)=>{
							data ? resolve(data) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			})
		});
	}

	getDivisionAll(){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_division`,
						(err, data)=>{
							data ? resolve(data) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			})
		});
	}

	/** RANK */

	addRank(req){
		const { name }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.getRankСheckExists(id_division, name)
				.then((data)=>{
					if(data.length === 0){
						this.db.getConnection((err, connection)=>{
							if(!err){
								connection.query(`INSERT 
									INTO ff_rank
										(id_visitor_create,
										id_division,
										name)
									VALUE(?, ?, ?)`,
									[id_visitor, id_division, name],
									(err, data= false)=>{
										const { insertId }= data;
										insertId ? resolve(Object.assign( {}, this.msg.add, { id : data.insertId } )) : reject( { data: this.msg.err, err : err } );
										connection.release();
									});
							} else {
								reject( { data: this.msg.err, err : err } );
							}
						});
					} else {
						resolve( this.msg.exists );
					}
				})
				.catch((err)=>{
					reject( { data: this.msg.err, err : err } );
				})
		});
	}

	editRank(req){
		const { id, id_division, name }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.getRankСheckExists(id_division, name)
				.then((data)=>{
					if(data.length === 0){
						this.db.getConnection((err, connection)=>{
							if(!err){
								connection.query(`UPDATE ff_rank
									SET
										id_visitor_update= ?,
										id_division= ?,
										name= ?,
										date_update= ?
									WHERE id= ?`,
									[id_visitor, id_division, name, 'CURRENT_TIMESTAMP', id],
									(err, data= false)=>{
										const { affectedRows }= data;
										affectedRows ? resolve( this.msg.edit ) : reject( { data: this.msg.err, err : err } );
										connection.release();
									});
							} else {
								reject( { data: this.msg.err, err : err } );
							}
						});
					} else {
						resolve( this.msg.exists );
					}
				})
				.catch((err)=>{
					reject( { data: this.msg.err, err : err } );
				})
		});
	}

	getRankСheckExists(id_division, name){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT 
						*
					FROM ff_rank
					WHERE id_division= ? AND name= ?`,
					[id_division, name],
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

	getRankByIdDividion(req){
		const { id_division }= req.params; 

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT 
						*
					FROM ff_rank
					WHERE id_division = ?`,
					[id_division],
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

module.exports= Division;