'use strict';

require('dotenv/config');

var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var port = process.env.PORT || 3000;

var _require = require('../routes/index'),
    getIndex = _require.getIndex;

// connect to the database


global.mysqlClient = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});
handleDisconnect(mysqlClient);

function handleDisconnect(client) {
  client.on('error', function (error) {
    if (!error.fatal) return;
    if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;

    console.error('> Re-connecting lost MySQL connection: ' + error.stack);

    mysqlClient = mysql.createConnection(client.config);
    handleDisconnect(mysqlClient);
    mysqlClient.connect();
  });
}

//addUser route
app.get('/addUser', function (req, res, next) {
  console.log("route addUser called");
  try {
    var query = 'SELECT * FROM users';
    mysqlClient.query(query, function (err, result) {
      if (err) {
        console.log("fail query");
        throw err;
      }
      res.send(JSON.stringify({ "status": 200, "error": null, "response": result[0].pseudo.toString() }));
    });
  } catch (e) {
    console.log(e);
  }
});

app.set('port', process.env.port || port); // set express to use this port
app.listen(port, function () {
  console.log('Server running on port: ' + port);
});