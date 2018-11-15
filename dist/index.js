'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var port = process.env.PORT || 3000;

//connect to database

var _require = require('../dbConnection'),
    getSqlClient = _require.getSqlClient,
    handleDisconnect = _require.handleDisconnect;

global.mysqlClient = getSqlClient();
handleDisconnect(mysqlClient);

//add support for json parameters
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//allow cross origin requests
var cors = require('cors');
app.use(cors());

//adding routes

var _require2 = require('../routes/users/get'),
    getUsers = _require2.getUsers;

var _require3 = require('../routes/users/add'),
    addUser = _require3.addUser;

var _require4 = require('../routes/users/check'),
    checkUserExist = _require4.checkUserExist;

var _require5 = require('../routes/topics/get'),
    getTopics = _require5.getTopics;

app.get('/getUsers', getUsers);
app.post('/addUser', addUser);
app.post('/checkUserExist', checkUserExist);
app.get('/getTopics', getTopics);

//launch server
app.set('port', process.env.port || port); // set express to use this port
app.listen(port, function () {
  console.log('Server running on port: ' + port);
});