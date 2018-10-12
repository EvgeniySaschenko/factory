let db= require('../ext/db.js');

class Material{
	constructor(){
		this.db= db;
	}

	addType(id_visitor, name){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`INSERT
						INTO ff_material_type
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

	addMaterial(id_visitor, id_type, mark, scope_use, standart){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`INSERT
					INTO ff_material
						(id_visitor_create, 
						id_type, 
						mark, 
						scope_use, 
						standart)
					VALUE(?, ?, ?, ?, ?)`,
					[id_visitor, id_type, mark, scope_use, standart],
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

	
}

module.exports= Material;