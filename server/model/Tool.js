const db= require('../ext/db.js');
const nconf= require('../config');

class Tool{
	constructor(){
		this.db= db;
		this.msg= nconf.get('msg');
	}

	/** TOOL */

	addTool( req ){
		const { id_material, id_type, description, standart }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.getToolСheckExists(id_material, id_type, description, standart)
				.then((data)=>{
					if(data.length === 0){
						this.db.getConnection((err, connection)=>{
							if(!err){
								connection.query(`INSERT
									INTO ff_tool
										(id_visitor_create,
										id_material,
										id_type,
										description,
										standart)
									VALUE (?, ?, ?, ?, ?)`,
									[id_visitor, id_material, id_type, description, standart],
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

	editTool(req){
		const { id, id_material, id_type, description, standart }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.getToolСheckExists(id_material, id_type, description, standart)
				.then((data)=>{
					if(data.length === 0){
						this.db.getConnection((err, connection)=>{
							if(!err){
								connection.query(`UPDATE ff_tool
									SET
										id_visitor_update= ?,
										id_material= ?,
										id_type= ?,
										description= ?,
										standart= ?,
										date_update= ?
									WHERE id= ?`,
									[id_visitor, id_material, id_type, description, standart, 'CURRENT_TIMESTAMP', id],
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

	getToolСheckExists(id_material, id_type, description, standart){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_tool
						WHERE 
							id_material = ? 
						AND 
							id_type = ? 
						AND 
							description = ? 
						AND 
							standart = ?`,
						[id_material, id_type, description, standart],
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

	getToolByType(req){
		const { id_type }= req.params;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							t.id,
							t.id_material,
							t.id_type,
							t.description,
							t.standart,
							tt.name,
							m.id_type as material_id_type,
							m.mark as material_mark,
							m.standart as material_standart,
							mt.name as material_name
						FROM ff_tool t
						INNER JOIN ff_tool_type tt ON t.id_type = tt.id
						INNER JOIN ff_material m ON t.id_material = m.id
						INNER JOIN ff_material_type mt ON m.id_type = mt.id
						WHERE t.id_type = ?
						ORDER BY tt.name ASC, t.id ASC`,
						[id_type],
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

	/** TOOL TYPE */

	addType(req){
		const { name }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.getTypeСheckExists(name)
				.then((data)=>{
					if(data.length === 0){
						this.db.getConnection((err, connection)=>{
							if(!err){
								connection.query(`INSERT
									INTO ff_tool_type
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

	editType(req){
		const { id, name }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.getTypeСheckExists(name)
				.then((data)=>{
					if(data.length === 0){
						this.db.getConnection((err, connection)=>{
							if(!err){
								connection.query(`UPDATE ff_tool_type
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

	getTypeСheckExists(name){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_tool_type
						WHERE 
							name = ?`,
						[name],
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

	getToolType(){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_tool_type
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

module.exports= Tool;