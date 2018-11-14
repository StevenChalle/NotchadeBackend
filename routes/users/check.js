
module.exports = {

    //route to check if user exists, before accepting connection
    checkUserExist: (req, res, next) => {
      console.log("route checkUserExists called")

      //search for user with same email and password
      let query = `select * from users
      where email = '${req.body.email}' and password ='${req.body.password}'`
      new Promise((resolve, reject) => {
          mysqlClient.query(query, (err, result) => {
            if (err) reject("SqlError")
            resolve(result)
        })
      }).then((resolve) => {
        //by default, return false, unless if user exists, return true
        let userExist = false
        if (resolve.length > 0) userExist = true
        res.send(JSON.stringify({
          "status": 200,
          "error": null,
          "response": { userExist }
        }))
      }).catch((reject) => { //if error happen with mysql or else, return 500
        res.send(JSON.stringify({
          "status": 500,
          "error": "MySQL Error",
          "response": `Internal Server Error`
        }))
      })
    }
}
