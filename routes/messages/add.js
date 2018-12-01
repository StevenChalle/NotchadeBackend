module.exports = {

  addTopicMessage: (req, res, next) => {
    //check user connection
    let userConnected = -1
    if (!req.session.users)
      return res.send(JSON.stringify({
        "status": 511,
        "error": true,
        "response": "Network Authentication Required"
      }))
    req.session.users.forEach((item, index) => {
      if (item.id == req.body.id_author)
        userConnected = index
    })
    if (userConnected == -1)
      return res.send(JSON.stringify({
        "status": 511,
        "error": true,
        "response": "Network Authentication Required"
      }))

    //author is connected, try add message
    let query = `INSERT INTO messages (msg, id_author, id_topic)
      VALUES ('${req.body.msg}', '${req.body.id_author}', '${req.body.id_topic}')`
    new Promise((resolve, reject) => {
      mysqlClient.query(query, (err, result) => {
        if (err) throw err
        resolve(result)
      })
    }).then((resolve) => {
      return res.send(JSON.stringify({
        "status": 200,
        "error": false,
        "response": `Done`
      }))
    }).catch((reject) => {
      return res.send(JSON.stringify({
        "status": 500,
        "error": true,
        "response": `Internal Server Error`
      }))
    })
  },
  addPersonnalMessage: (req, res, next) => {
    //check user connection
    let userConnected = -1
    if (!req.session.users)
      return res.send(JSON.stringify({
        "status": 511,
        "error": true,
        "response": "Network Authentication Required"
      }))
    req.session.users.forEach((item, index) => {
      if (item.id == req.body.id_author)
        userConnected = index
    })
    if (userConnected == -1)
      return res.send(JSON.stringify({
        "status": 511,
        "error": true,
        "response": "Network Authentication Required"
      }))

    //user is connected, adding personnal message
    let query = `INSERT INTO messages (msg, id_author, id_receiver)
      VALUES ('${req.body.msg}', '${req.body.id_author}', '${req.body.id_receiver}')`
    new Promise((resolve, reject) => {
      mysqlClient.query(query, (err, result) => {
        if (err) throw err
        resolve(result)
      })
    }).then((resolve) => {
      return res.send(JSON.stringify({
        "status": 200,
        "error": false,
        "response": `Done`
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
