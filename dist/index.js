'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var port = process.env.PORT || 3001;

//allow cross origin requests
var cors = require('cors');
// const corsOptions = {
//   origin: "*",
//   methods:['GET','POST'],
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   credentials: true
// }
app.use(cors());

//connect to database
var mysql = require('mysql');

var _require = require('../dbConnection'),
    getSqlClient = _require.getSqlClient,
    handleDisconnect = _require.handleDisconnect;

global.mysqlClient = getSqlClient();
handleDisconnect(mysqlClient);

//add support for json parameters
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//add session
var expressSession = require('express-session');
app.use(expressSession({
  secret: 'elekk',
  saveUninitialized: false,
  resave: false,
  cookie: { secure: true, httpOnly: false }
}));

//require joi and get chemas
var expressJoi = require('express-joi');
var Joi = expressJoi.Joi;
var schemas = require('../schemas/index.js');

//adding doc

var _require2 = require('../routes/doc'),
    getDoc = _require2.getDoc;

app.get('/getDoc', getDoc);
//adding routes

var _require3 = require('../routes/users/connection'),
    connect = _require3.connect,
    disconnect = _require3.disconnect;

var _require4 = require('../routes/users/add'),
    addUser = _require4.addUser;

var _require5 = require('../routes/users/unsub'),
    unsubUser = _require5.unsubUser;

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

app.post('/users/connect', expressJoi.joiValidate(schemas.connect), connect);
app.post('/users/disconnect', expressJoi.joiValidate(schemas.disconnect), disconnect);
app.post('/users/add', expressJoi.joiValidate(schemas.addUser), addUser);
app.post('/users/unsub', expressJoi.joiValidate(schemas.unsubUser), unsubUser);
app.post('/topics/get', expressJoi.joiValidate(schemas.getTopics), getTopics);
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