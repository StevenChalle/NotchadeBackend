
module.exports = {

    addUser: (req, res, next) => {
      console.log("route addUser called")

      //checking params
      if (!req.body.pseudo || !req.body.email)
        return res.send(JSON.stringify({"status": 422, "error": true, "response": "Bad Parameter : route must receive a string as pseudo and another as email"}))

      //search for user with same credentials than the new ones
      let query = `SELECT * FROM users
      WHERE pseudo = '${req.body.pseudo}' OR email = '${req.body.email}'`
      new Promise((resolve, reject) => {
          mysqlClient.query(query, (err, result) => {
            if (err) reject("SqlError")
            resolve(result)
        })
      }).then((resolve) => {
        if (!(resolve.length > 0)) { //if no user uses these credentials, add new user to db
          query = `INSERT INTO users (pseudo, email, password)
          VALUES ('${req.body.pseudo}', '${req.body.email}', '${req.body.password}')`
          mysqlClient.query(query, (err, result) => {
            if (err) reject("SqlError")
            else //adding user worked, returning 200
              return res.send(JSON.stringify({"status": 200, "error": false, "response": `Done`}))
          })
        } else { //else, return conflict message
          return res.send(JSON.stringify({
            "status": 409,
            "error": true,
            "response": `Conflict : pseudo or email address already exist.`
          }))
        }
      }).catch((reject) => {
        return res.send(JSON.stringify({
          "status": 500,
          "error": true,
          "response": `Internal Server Error`
        }))
      })
    }
}
