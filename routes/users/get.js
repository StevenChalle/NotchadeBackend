
module.exports = {

    getUsers: (req, res, next) => {
      console.log("route getUsers called")

      let query = `SELECT * FROM users`
      mysqlClient.query(query, (err, result) => {
        if (err) throw err
        res.send(JSON.stringify({"status": 200, "error": false, "response": result}));
      })
    }
}
