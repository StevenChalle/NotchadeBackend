module.exports = {

  //route to check if user exists, before accepting connection
  connect: (req, res, next) => {
    //if sessions are null, create empty array
    if (!req.session.users)
      req.session.users = new Array()

    //search for user with same email and password
    let query = `SELECT * FROM users
      WHERE email = '${req.body.email}' AND password ='${req.body.password}' AND has_signed_out = false`
    new Promise((resolve, reject) => {
      mysqlClient.query(query, (err, result) => {
        if (err) throw err
        resolve(result)
      })
    }).then((resolve) => {
      let userId = 0
      //if user exists, create session and return true
      if (resolve.length > 0) {
        //if user already connected return error
        let userConnected = -1
        req.session.users.forEach((item, index) => {
          if (item.id == resolve[0].id)
            userConnected = index
        })
        //user aint connected
        if (userConnected == -1) {
          //user exists and isn't connected yet, add to session
          userId = resolve[0].id
          req.session.users.push({
            id: resolve[0].id,
            pseudo: resolve[0].pseudo,
            email: resolve[0].email
          })
        }
      }
      res.send(JSON.stringify({
        "status": 200,
        "error": false,
        "response": {
          userId,
          pseudo: resolve[0].pseudo,
          email: resolve[0].email
        }
      }))
    }).catch((reject) => {
      res.send(JSON.stringify({
        "status": 500,
        "error": true,
        "response": `Internal Server Error`
      }))
    })
  },
  //disconnection route
  disconnect: (req, res, next) => {
    //check user connection
    let userConnected = -1
    if (!req.session.users)
      return res.send(JSON.stringify({
        "status": 511,
        "error": true,
        "response": "Network Authentication Required"
      }))
    req.session.users.forEach((item, index) => {
      if (item.id == req.body.user_id)
        userConnected = index
    })
    if (userConnected == -1)
      return res.send(JSON.stringify({
        "status": 511,
        "error": true,
        "response": "Network Authentication Required"
      }))

    //user is connected, disconnect him
    req.session.users.splice(userConnected, 1)
    res.send(JSON.stringify({
      "status": 200,
      "error": false,
      "response": "Disconnected"
    }))
    return
  }
}
