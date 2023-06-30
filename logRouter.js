const express = require('express');
const router = express.Router();
const db = require('./db');

// parent path '/api'
router.get('/users/:_id/logs', function(req, res,next){

    //parst query
    const id = req.params._id;
    const fromDate = req.query.from;
    const toDate = req.query.to;
    const limit = req.query.limit;
    
    // parse date string to unix
    const unixFrom = Date.parse(fromDate); // will be NaN if not provided
    const unixTo = Date.parse(toDate);
    

    // get data from db and send
    db.serialize(()=>{
        // set properties
        const objToSned = {}
        //get data
        db.get('SELECT _id, username FROM users where _id=?', [id], (err,row)=>{
            //check if id existed
            if(!row){
                res.json({error: 'wrong id'})
            }else{
                objToSned._id = row._id;
                objToSned.username = row.username;
                // if all query satisfied

                // get exercise data
                if((Object.keys(req.query)).length === 0){
                    db.all('SELECT description, duration, date FROM user_exercise WHERE user_id=?', [id], (err, rows)=>{
                        objToSned.count = rows.length;
                        objToSned.log = rows;
                        res.json(objToSned);
                    })
                }else if(Number(limit) && unixFrom && unixTo){
                    db.all('SELECT description, duration, date FROM user_exercise WHERE user_id=? AND unix_date>=? AND unix_date<=? LIMIT?',
                        [id,unixFrom,unixTo,limit], (err, rows)=>{
                        console.log(rows)
                        objToSned.from = (new Date(unixFrom).toDateString());
                        objToSned.to = (new Date(unixFrom).toDateString());
                        objToSned.count = rows.length;
                        objToSned.log = rows;
                        res.json(objToSned);
                    })  
                }else{
                    res.json({error: 'bad request'});
                }
            }
        })
    })// ens db serialize
})//end router

router.get('/users', function(req, res, next){
    db.all('SELECT * FROM users', (err,rows)=>{
        res.send(rows);
    })
})

module.exports = router;
