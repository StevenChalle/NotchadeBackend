
module.exports = {

    unsubUser: (req, res, next) => {
      console.log("route unsubUser called")

      //checking params
      if (!req.body.email || !req.body.password)
        return res.send(JSON.stringify({"status": 422, "error": true, "response": "Bad Parameter : route must receive a string as email and another as password"}))

      //unsub user
      let query = `UPDATE users SET has_signed_out = true
      WHERE email = '${req.body.email}' AND password = '${req.body.password}'`
      new Promise((resolve, reject) => {
          mysqlClient.query(query, (err, result) => {
            if (err) throw err
            resolve(result)
        })
      }).then((resolve) => {
        if (resolve.affectedRows)
          return res.send(JSON.stringify({"status": 200, "error": false, "response": `Done`}))
        return res.send(JSON.stringify({"status": 422, "error": true, "response": "Bad Parameter : can not find user with this combination of email and password"}))
      }).catch((reject) => {
        return res.send(JSON.stringify({
          "status": 500,
          "error": true,
          "response": `Internal Server Error`
        }))
      })
    }
}
