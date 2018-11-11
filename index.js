const express = require('express')
const app = express()
var router = express.Router()
const mysql = require('mysql');
const port = process.env.DB_PORT || 3000
import {} from 'dotenv/config';

const {getIndex} = require('../routes/index')

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: process.env.DB_HOST,
    //port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.get('/', function(req, res, next) {
    let query = "SELECT * FROM `users`";
    // execute query
    db.query(query, (err, result) => {
      res.send(JSON.stringify({"status": 200, "error": null, "response": result[0].pseudo.toString()}));
    })
	});

app.set('port', process.env.port || port); // set express to use this port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
//app.listen(port, () => console.log(`Example app listening on port ${port}!`))
