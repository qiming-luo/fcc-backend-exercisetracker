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

module.exports = router