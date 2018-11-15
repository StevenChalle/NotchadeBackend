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

//adding doc

var _require2 = require('../routes/doc'),
    getDoc = _require2.getDoc;

app.get('/getDoc', getDoc);
//adding routes

var _require3 = require('../routes/users/get'),
    getUsers = _require3.getUsers;

var _require4 = require('../routes/users/add'),
    addUser = _require4.addUser;

var _require5 = require('../routes/users/check'),
    checkUserExist = _require5.checkUserExist;

var _require6 = require('../routes/topics/get'),
    getTopics = _require6.getTopics;

var _require7 = require('../routes/messages/add'),
    addTopicMessage = _require7.addTopicMessage,
    addPersonnalMessage = _require7.addPersonnalMessage;

var _require8 = require('../routes/messages/get'),
    getTopicMessages = _require8.getTopicMessages,
    getPersonnalMessages = _require8.getPersonnalMessages;

var _require9 = require('../routes/messages/delete'),
    deleteMessage = _require9.deleteMessage;

app.get('/getUsers', getUsers);
app.post('/addUser', addUser);
app.post('/checkUserExist', checkUserExist);
app.get('/getTopics', getTopics);
app.post('/addTopicMessage', addTopicMessage);
app.post('/addPersonnalMessage', addPersonnalMessage);
app.post('/getTopicMessages', getTopicMessages);
app.post('/getPersonnalMessages', getPersonnalMessages);
app.post('/deleteMessage', deleteMessage);

//launch server
app.set('port', process.env.port || port); // set express to use this port
app.listen(port, function () {
  console.log('Server running on port: ' + port);
});