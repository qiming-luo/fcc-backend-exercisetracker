// this time use sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./dbstore/exercise_tracker.db");

module.exports = db;