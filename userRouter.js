const express = require('express');
const router = express.Router();
const db = require('./db');

// parent path '/api'

// register user
router.post('/users', function(req, res){
    const userName = req.body.username.trim();
    // write to db
    db.get('INSERT INTO users(username) VALUES (?) RETURNING *', [userName], function(err, row){
        console.log('new user:', row);
        res.json(row);
    })
})

// post exercise
router.post('/users/:_id/exercises', function(req, res){
    const id = req.params._id;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = req.body.date;
    
    // convert date to unix timestamp
    let unixDate;
    if(!date){
        unixDate = Date.now();
    }else{
        unixDate = Date.parse(date);
    }
    // store data to db . sqlite foreign key must be manully enforced!
    // because user_id is a foreign key, so if the posted _id doesn't existed in users table, insert query will fail, so no need to check if _id existed
    db.run('PRAGMA foreign_keys = on', function(){
        db.get('insert into user_exercise values (?,?,?,?,?) returning *', [id, description, duration, unixDate, (new Date(unixDate)).toDateString()], function(err, row){
            if(err){
                res.status(400).json({error: 'please check your _id'});
            }else{
                const rowInserted = row;
                db.get('select username from users where _id = ?', [id], function(err, row){
                    res.json({
                        username: row.username,
                        description: rowInserted.description,
                        duration: rowInserted.duration,
                        date: (new Date(rowInserted.date)).toDateString(),
                        _id: Number(id)
                    })
                    
                })
            }
        });
    })
})



module.exports = router;