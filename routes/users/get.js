
module.exports = {

    getUsers: (req, res, next) => {
      console.log("route getUsers called")

      let query = `SELECT * FROM users`
      new Promise((resolve, reject) => {
        mysqlClient.query(query, (err, result) => {
          if (err) throw err
          resolve(result)
        })
      }).then((resolve) => {
        return res.send(JSON.stringify({"status": 200, "error": false, "response": resolve}))
      }).catch((reject) => {
        return res.send(JSON.stringify({
          "status": 500,
          "error": true,
          "response": `Internal Server Error`
        }))
      })
    }
}
