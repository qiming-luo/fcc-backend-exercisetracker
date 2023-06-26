const db = require('./db');

// // // run once to create table
// db.run('CREATE TABLE users (_id INTEGER PRIMARY KEY, username TEXT)'); // _id is unique, username not neccessary

// db.run('CREATE TABLE user_exercise (user_id INTEGER REFERENCES users(_id), description TEXT, duration INTEGER, date INTEGER)');
// // date will be an int === Date.now();(unix timestamp)
// // use Date.toDateString() to convert dateobj to date string

