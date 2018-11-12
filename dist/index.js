'use strict';

require('dotenv/config');

var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var port = process.env.DB_PORT || 4000;

var _require = require('../routes/index'),
    getIndex = _require.getIndex;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.


var db = mysql.createConnection({
    host: process.env.DB_HOST,
    //port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// connect to database
db.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.get('/', function (req, res, next) {
    var query = "SELECT * FROM `users`";
    // execute query
    db.query(query, function (err, result) {
        res.send(JSON.stringify({ "status": 200, "error": null, "response": result[0].pseudo.toString() }));
    });
});

app.set('port', process.env.port || port); // set express to use this port
app.listen(port, function () {
    console.log('Server running on port: ' + port);
});
//app.listen(port, () => console.log(`Example app listening on port ${port}!`))