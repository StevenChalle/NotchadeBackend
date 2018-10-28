var mySql = require('mysql');

var connection = mySql.createConnection({
  host: 'us-cdbr-iron-east-01.cleardb.net',
  user: 'b4c5e189354a3e',
  password: '74c379b4',
  database: 'heroku_f29c10b338ad8b7'
})

connection.connect(function(err) {
  if (err)
    throw(err);
  console.log("connected to database");
});

module.exports = connection;
