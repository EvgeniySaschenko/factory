let db= require('../ext/db.js');

class Tool{
	constructor(){
		this.db= db;
	}

	addType(id_visitor, name){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`INSERT
						INTO ff_tool_type
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

	addTool(id_visitor, id_material, id_type, name, mark, standart){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`INSERT
						INTO ff_tool
							(id_visitor_create,
							id_material,
							id_type,
							name,
							mark,
							standart)
						VALUE (?, ?, ?, ?, ?, ?)`,
						[id_visitor, id_material, id_type, name, mark, standart],
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

	editType(id, id_visitor, name){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`UPDATE ff_tool_type
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

	editTool(id, id_visitor, id_material, id_type, name, mark, standart){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`UPDATE ff_tool
						SET
							id_visitor_update= ?,
							id_material= ?,
							id_type= ?,
							name= ?,
							mark= ?,
							standart= ?,
							date_update= ?
						WHERE id= ?`,
						[id_visitor, id_material, id_type, name, mark, standart, 'CURRENT_TIMESTAMP', id],
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

	getToolByType(id_type){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
						t.id,
						t.id_material,
						t.name,
						t.material,
						t.standart,
						m.name as name_material,
						m.mark as mark_material 
						FROM ff_tool t
						INNER JOIN ff_material m
						WHERE t.id_type = ?`,
						[id_type],
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

}

module.exports= Tool;