module.exports = {

  getTopics: (req, res, next) => {
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

    //user is connected, getting topics
    let query = `SELECT * FROM topics`
    new Promise((resolve, reject) => {
      mysqlClient.query(query, (err, result) => {
        if (err) throw err
        resolve(result)
      })
    }).then((resolve) => {
      return res.send(JSON.stringify({
        "status": 200,
        "error": false,
        "response": resolve
      }))
    }).catch((reject) => {
      return res.send(JSON.stringify({
        "status": 500,
        "error": true,
        "response": `Internal Server Error`
      }))
    })
  }
}
