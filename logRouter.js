const express = require('express');
const router = express.Router();
const db = require('./db');

// parent path '/api'
router.get('/users/:_id/logs', function(req, res){
    //parst query
    const id = req.params._id;
    const fromDate = req.query.from;
    const toDate = req.query.to;
    const limit = req.query.limit;
    
    // parse date string to unix
    const unixFrom = Date.parse(fromDate); // will be NaN if not provided
    const unixTo = Date.parse(toDate);
    console.log(unixFrom, unixTo);

    // get data from db and send
    
        
})

module.exports = router;