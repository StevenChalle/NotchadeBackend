
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
        if (!(resolve.length > 0)) { //if no user uses these credentials, add new user to db
          query = `insert into users (pseudo, email, password)
          values ('${req.body.pseudo}', '${req.body.email}', '${req.body.password}')`
          mysqlClient.query(query, (err, result) => {
            if (err) reject("SqlError")
            else //adding user worked, returning 200
              res.send(JSON.stringify({"status": 200, "error": false, "response": `Done`}))
          })
        } else { //else, return conflict message
          res.send(JSON.stringify({
            "status": 409,
            "error": true,
            "response": `Conflict : pseudo or email address already exist.`
          }))
        }
      }).catch((reject) => {
        res.send(JSON.stringify({
          "status": 500,
          "error": true,
          "response": `Internal Server Error`
        }))
      })
    }
}
