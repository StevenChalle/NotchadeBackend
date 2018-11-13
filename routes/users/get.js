
module.exports = {

    getUsers: (req, res, next) => {
      console.log("route getUsers called")
      try {
        let query = `SELECT * FROM users`
        mysqlClient.query(query, (err, result) => {
          if (err) throw err
          res.send(JSON.stringify({"status": 200, "error": null, "response": result[0].pseudo.toString()}));
        })
      } catch (e) {
        console.log(e)
      }
    }
}
