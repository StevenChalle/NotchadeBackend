
module.exports = {

    addUser: (req, res, next) => {
      console.log("route addUser called")

      try {
        let query = `insert into users (pseudo, email, password) values ('${req.body.pseudo}', '${req.body.email}', '${req.body.password}')`
        mysqlClient.query(query, (err, result) => {
          if (err) throw err
          res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": `done`
          }))
        })
      } catch (e) {
        console.log(e)
      }
    }
}
