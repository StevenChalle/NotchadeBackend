
module.exports = {

    addUser: (req, res, next) => {
      console.log("route addUser called")

      //checking params
      if (!req.body.pseudo || !req.body.email || !req.body.password)
        return res.send(JSON.stringify({"status": 422, "error": true, "response": "Bad Parameter : route must receive a string as pseudo, another as email, and another as password"}))

      //search for user with same credentials than the new ones
      let query = `SELECT * FROM users
      WHERE pseudo = '${req.body.pseudo}' AND has_signed_out = false
      OR email = '${req.body.email}' AND has_signed_out = false`
      new Promise((resolve, reject) => {
          mysqlClient.query(query, (err, result) => {
            if (err) throw err
            resolve(result)
        })
      }).then((resolve) => {
        if (!(resolve.length > 0)) { //if no user uses these credentials, add new user to db
          query = `INSERT INTO users (pseudo, email, password, has_signed_out)
          VALUES ('${req.body.pseudo}', '${req.body.email}', '${req.body.password}', false)`
          mysqlClient.query(query, (err, result) => {
            if (err) throw err
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
