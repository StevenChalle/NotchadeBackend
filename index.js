const express = require('express')
const app = express()
const router = express.Router()
const port = process.env.PORT || 3000

//allow cross origin requests
const cors = require('cors')
app.use(cors())

//connect to database
const mysql = require('mysql');
const { getSqlClient, handleDisconnect } = require('../dbConnection')
global.mysqlClient = getSqlClient()
handleDisconnect(mysqlClient)

//add support for json parameters
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//add session
const expressSession = require('express-session')
app.use(expressSession({
  secret: 'elekk',
  saveUninitialized: false,
  resave: false
}))

//require joi and get chemas
const expressJoi = require('express-joi')
const Joi = expressJoi.Joi
const schemas = require('../schemas/index.js')

//adding doc
const { getDoc } = require('../routes/doc')
app.get('/getDoc', getDoc)
//adding routes
const { connect, disconnect } = require('../routes/users/connection')
const { addUser } = require('../routes/users/add')
const { unsubUser } = require('../routes/users/unsub')
const { getTopics } = require('../routes/topics/get')
const { addTopicMessage, addPersonnalMessage } = require('../routes/messages/add')
const { getTopicMessages, getPersonnalMessages } = require('../routes/messages/get')
const { deleteMessage } = require('../routes/messages/delete')
app.post('/users/connect', expressJoi.joiValidate(schemas.connect), connect)
app.post('/users/disconnect', expressJoi.joiValidate(schemas.disconnect), disconnect)
app.post('/users/add', expressJoi.joiValidate(schemas.addUser), addUser)
app.post('/users/unsub', expressJoi.joiValidate(schemas.unsubUser), unsubUser)
app.post('/topics/get', expressJoi.joiValidate(schemas.getTopics), getTopics)
app.post('/messages/addTopicMessage', expressJoi.joiValidate(schemas.addTopicMessage), addTopicMessage)
app.post('/messages/addPersonnalMessage', expressJoi.joiValidate(schemas.addPersonnalMessage), addPersonnalMessage)
app.post('/messages/getTopicMessages', expressJoi.joiValidate(schemas.getTopicMessages), getTopicMessages)
app.post('/messages/getPersonnalMessages', expressJoi.joiValidate(schemas.getPersonnalMessages), getPersonnalMessages)
app.post('/messages/delete', expressJoi.joiValidate(schemas.deleteMessage), deleteMessage)

//launch server
app.set('port', process.env.port || port); // set express to use this port
app.listen(port, () => { console.log(`Server running on port: ${port}`) })
