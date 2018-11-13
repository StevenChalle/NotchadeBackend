const express = require('express')
const app = express()
const router = express.Router()
const mysql = require('mysql');
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');

//connect to database
const { getSqlClient, handleDisconnect } = require('../dbConnection')
global.mysqlClient = getSqlClient()
handleDisconnect(mysqlClient)

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//adding routes
const { getUsers } = require('../routes/users/get')
const { addUser } = require('../routes/users/add')
app.get('/getUsers', getUsers);
app.post('/addUser', addUser);

app.set('port', process.env.port || port); // set express to use this port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
