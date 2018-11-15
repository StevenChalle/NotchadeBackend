const express = require('express')
const app = express()
const router = express.Router()
const mysql = require('mysql');
const port = process.env.PORT || 3000

//connect to database
const { getSqlClient, handleDisconnect } = require('../dbConnection')
global.mysqlClient = getSqlClient()
handleDisconnect(mysqlClient)

//add support for json parameters
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//allow cross origin requests
const cors = require('cors')
app.use(cors())

//adding routes
const { getUsers } = require('../routes/users/get')
const { addUser } = require('../routes/users/add')
const { checkUserExist } = require('../routes/users/check')
const { getTopics } = require('../routes/topics/get')
app.get('/getUsers', getUsers);
app.post('/addUser', addUser);
app.post('/checkUserExist', checkUserExist);
app.get('/getTopics', getTopics);

//launch server
app.set('port', process.env.port || port); // set express to use this port
app.listen(port, () => { console.log(`Server running on port: ${port}`) });
