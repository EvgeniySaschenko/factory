const express= require('express');
const router= express.Router();


router.use('/material', require('./material'));

module.exports = router;