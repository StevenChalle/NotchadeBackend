
module.exports = {

    //route to check if user exists, before accepting connection
    checkUserExist: (req, res, next) => {
      console.log("route checkUserExist called")

      //checking params
      if (!req.body.email || !req.body.password)
        return res.send(JSON.stringify({"status": 422, "error": true, "response": "Bad Parameter : route must receive a string as email and another as password"}))


      //search for user with same email and password
      let query = `SELECT * FROM users
      WHERE email = '${req.body.email}' AND password ='${req.body.password}'`
      new Promise((resolve, reject) => {
          mysqlClient.query(query, (err, result) => {
            if (err) reject("SqlError")
            resolve(result)
        })
      }).then((resolve) => {
        //by default, return false, unless if user exists, return true
        let userExist = false
        if (resolve.length > 0) userExist = true
        res.send(JSON.stringify({"status": 200, "error": false, "response": { userExist }}))
      }).catch((reject) => {
        res.send(JSON.stringify({
          "status": 500,
          "error": true,
          "response": `Internal Server Error`
        }))
      })
    }
}
