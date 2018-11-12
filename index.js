const express = require('express')
const app = express()
const router = express.Router()
const mysql = require('mysql');
const port = process.env.PORT || 3000
import {} from 'dotenv/config';

const { getIndex } = require('../routes/index')

// connect to the database
global.mysqlClient = mysql.createConnection ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
handleDisconnect(mysqlClient)

function handleDisconnect(client) {
  client.on('error', (error) => {
    if (!error.fatal) return;
    if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;

    console.error('> Re-connecting lost MySQL connection: ' + error.stack);

    mysqlClient = mysql.createConnection(client.config);
    handleDisconnect(mysqlClient);
    mysqlClient.connect();
  })
}

//addUser route
app.get('/addUser', function(req, res, next) {
    console.log("route addUser called")
    try {
      let query = `SELECT * FROM users`
      mysqlClient.query(query, (err, result) => {
        if (err) {
          console.log("fail query")
          throw err
        }
        res.send(JSON.stringify({"status": 200, "error": null, "response": result[0].pseudo.toString()}));
      })
    } catch (e) {
      console.log(e)
    }
	});

app.set('port', process.env.port || port); // set express to use this port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
