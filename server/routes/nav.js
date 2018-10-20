const express= require('express');
const router= express.Router();
const Nav= require('../model/Nav');
const response= require('../ext/response');
const nav= new Nav();

/** NAV */

router.get('/', (req, res, next)=>{
	response(nav.getNav(), res, next);
});

module.exports= router;