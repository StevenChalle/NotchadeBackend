const mysql = require('mysql');
require('dotenv').config()

module.exports = {

  getSqlClient: () => {
    return mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    })
  },
  handleDisconnect: (client) => {
    client.on('error', (error) => {
      if (!error.fatal) return;
      if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;

      mysqlClient = mysql.createConnection(client.config);
      module.exports.handleDisconnect(mysqlClient);
      mysqlClient.connect();
    })
  }
}
