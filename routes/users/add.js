
module.exports = {

    //route to add user in database
    addUser: (req, res, next) => {
      console.log("route addUser called")

      //search for user with same credentials than the new ones
      let query = `select * from users
      where pseudo = '${req.body.pseudo}' or email = '${req.body.email}'`
      new Promise((resolve, reject) => {
          mysqlClient.query(query, (err, result) => {
            if (err) reject("SqlError")
            resolve(result)
        })
      }).then((resolve) => {
        //if no user uses these credentials, add new user to db
        if (!(resolve.length > 0)) {
          query = `insert into users (pseudo, email, password)
          values ('${req.body.pseudo}', '${req.body.email}', '${req.body.password}')`
          mysqlClient.query(query, (err, result) => {
            if (err) reject("SqlError")
            else { //adding user worked, returning 200
              res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": `Done`
              }))
            }
          })
        } else { //else, return conflict message
          res.send(JSON.stringify({
            "status": 409,
            "error": "Conflict",
            "response": `Pseudo or email address already exist.`
          }))
        }
      }).catch((reject) => { //if error happen with mysql or else, return 500
        res.send(JSON.stringify({
          "status": 500,
          "error": "MySQL Error",
          "response": `Internal Server Error`
        }))
      })
    }
}
