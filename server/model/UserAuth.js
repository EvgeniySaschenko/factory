var User= require('./User.js');

class UserAuth extends User{
	constructor(){
		super();
	}

	addVisitor(idUser, ip, userAgent){
		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`INSERT 
						INTO ff_user_visitor
							(id_user,
							ip,
							user_agent)
						VALUE (?, ?, ?)`,
						[
							idUser, 
							ip, 
							userAgent
						],
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

	login(login, pass, req){
		return new Promise((resolve, reject)=>{
			this.getUserLoginPass(login, pass)
			.then((data)=>{
				// Если авторизация удалась
				if( data.length > 0 ){
					let user= data[0];
					let idUser= user.id;
					let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
					let userAgent= JSON.stringify({ 
						"browser" : req.useragent.browser,
						"version" : req.useragent.version,
						"os" : req.useragent.os,
						"platform" : req.useragent.platform,
					});

					// Записываем поситетеля в БД
					this.addVisitor(idUser, ip, userAgent)
						.then((data)=>{
							Object.assign(user, {id_visitor : data});
							req.session.user= user;
							resolve(user);
						})
						.catch((err)=>{
							reject(err);
						})

				} else {
					// Если авторизация не удалась
					resolve('Неправильный логин или пароль');
				}
			})
			.catch((err)=>{
				console.log( err )
			})
		});
	}

	exit(){
		req.session.user= false;
	}
}

module.exports= UserAuth;