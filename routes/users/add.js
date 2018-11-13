
module.exports = {

    addUser: (req, res, next) => {
      console.log("route addUser called")

      //does user credentials already exist ?
      let query = `select * from users
      where pseudo = '${req.body.pseudo}' or email = '${req.body.email}'`
      mysqlClient.query(query, (err, result) => {
        if (err) throw err
        if (result.length > 0) {
          res.send(JSON.stringify({
            "status": 409,
            "error": "Conflict",
            "response": `Pseudo or email address already exists`
          }))
        }
        else {
          query = `insert into users (pseudo, email, password)
          values ('${req.body.pseudo}', '${req.body.email}', '${req.body.password}')`
          mysqlClient.query(query, (err, result) => {
            if (err) throw err
            res.send(JSON.stringify({
              "status": 200,
              "error": null,
              "response": `done`
            }))
          })
        }
      })
    }
}
