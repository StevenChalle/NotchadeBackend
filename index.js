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

//adding doc
const { getDoc } = require('../routes/doc')
app.get('/getDoc', getDoc)
//adding routes
const { getUsers } = require('../routes/users/get')
const { addUser } = require('../routes/users/add')
const { checkUserExist } = require('../routes/users/check')
const { unsubUser } = require('../routes/users/unsub')
const { getTopics } = require('../routes/topics/get')
const { addTopicMessage, addPersonnalMessage } = require('../routes/messages/add')
const { getTopicMessages, getPersonnalMessages } = require('../routes/messages/get')
const { deleteMessage } = require('../routes/messages/delete')
app.get('/users/get', getUsers)
app.post('/users/add', addUser)
app.post('/users/checkExist', checkUserExist)
app.post('/users/unsub', unsubUser)
app.get('/topics/get', getTopics)
app.post('/messages/addTopicMessage', addTopicMessage)
app.post('/messages/addPersonnalMessage', addPersonnalMessage)
app.post('/messages/getTopicMessages', getTopicMessages)
app.post('/messages/getPersonnalMessages', getPersonnalMessages)
app.post('/messages/delete', deleteMessage)

//launch server
app.set('port', process.env.port || port); // set express to use this port
app.listen(port, () => { console.log(`Server running on port: ${port}`) })
