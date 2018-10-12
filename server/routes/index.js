var express = require('express');
var router = express.Router();
var Nav = require('../model/Nav');
var User = require('../model/User');
var Tool = require('../model/Tool');
var Material = require('../model/Material');
var UserAuth = require('../model/UserAuth');


var user= new User();
// user.addUser(1,  'admin17', "123", '{"lastName": "Saschenko", "name" : "Evgeniy", "middleName" : "Vitalievich"}', '{"id" : "1", "name" : "Admin", "level" : "0"}', '1990-01-01')
// .then( (data)=> console.log( data ) )
// .catch( (err) => console.log( err ) )

// user.getUserId(5)
// .then( (data)=> console.log( data ) )
// .catch( (err) => console.log( err ) )

// user.getUserLoginPass('admin17', "123")
// 	.then( (data)=> console.log( data ) )
// 	.catch( (err) => console.log( err ) )


// user.addRank(1, "12вавав3")
// 	.then( (data)=> console.log( data ) )
// 	.catch( (err) => console.log( err ) )

	// user.editRank(5, 6, 'name1')
	// .then( (data)=> console.log( data ) )
	// .catch( (err) => console.log( err ) )

// var tool= new Tool();
// tool.editTool(3, 2, 4, 5, 'name88', 'mark88', 'standart888')
// 	.then( (data)=> console.log( data ) )
// 	.catch( (err) => console.log( err ) )


var material= new Material();
material.addMaterial(1, 1, 'mark555', 2, 'standart555')
	.then( (data)=> console.log( data ) )
	.catch( (err) => console.log( err ) )

router.get('/login', function(req, res, next) {
	if(!req.session.user){
		let userAuth= new UserAuth();
		userAuth.login('admin17', "123", req)
		.then((data)=>{
			next();
		})
		.catch((err)=> {
			next();
		});
	}
});

router.get('/exit', function(req, res, next) {
	if(req.session.user){
		let userAuth= new UserAuth();
		userAuth.exit();
	}
	next();
});

module.exports = router;