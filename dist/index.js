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

//require joi and get chemas
var expressJoi = require('express-joi');
var Joi = expressJoi.Joi;
var schemas = require('../schemas/index.js');

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

var _require6 = require('../routes/users/unsub'),
    unsubUser = _require6.unsubUser;

var _require7 = require('../routes/topics/get'),
    getTopics = _require7.getTopics;

var _require8 = require('../routes/messages/add'),
    addTopicMessage = _require8.addTopicMessage,
    addPersonnalMessage = _require8.addPersonnalMessage;

var _require9 = require('../routes/messages/get'),
    getTopicMessages = _require9.getTopicMessages,
    getPersonnalMessages = _require9.getPersonnalMessages;

var _require10 = require('../routes/messages/delete'),
    deleteMessage = _require10.deleteMessage;

app.get('/users/get', getUsers);
app.post('/users/add', expressJoi.joiValidate(schemas.addUser), addUser);
app.post('/users/checkExist', expressJoi.joiValidate(schemas.checkUserExist), checkUserExist);
app.post('/users/unsub', expressJoi.joiValidate(schemas.unsubUser), unsubUser);
app.get('/topics/get', getTopics);
app.post('/messages/addTopicMessage', expressJoi.joiValidate(schemas.addTopicMessage), addTopicMessage);
app.post('/messages/addPersonnalMessage', expressJoi.joiValidate(schemas.addPersonnalMessage), addPersonnalMessage);
app.post('/messages/getTopicMessages', expressJoi.joiValidate(schemas.getTopicMessages), getTopicMessages);
app.post('/messages/getPersonnalMessages', expressJoi.joiValidate(schemas.getPersonnalMessages), getPersonnalMessages);
app.post('/messages/delete', expressJoi.joiValidate(schemas.deleteMessage), deleteMessage);

//launch server
app.set('port', process.env.port || port); // set express to use this port
app.listen(port, function () {
  console.log('Server running on port: ' + port);
});