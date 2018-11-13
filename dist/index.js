'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

//connect to database

var _require = require('../dbConnection'),
    getSqlClient = _require.getSqlClient,
    handleDisconnect = _require.handleDisconnect;

global.mysqlClient = getSqlClient();
handleDisconnect(mysqlClient);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//adding routes

var _require2 = require('../routes/users/get'),
    getUsers = _require2.getUsers;

var _require3 = require('../routes/users/add'),
    addUser = _require3.addUser;

app.get('/getUsers', getUsers);
app.post('/addUser', addUser);

app.set('port', process.env.port || port); // set express to use this port
app.listen(port, function () {
    console.log('Server running on port: ' + port);
});