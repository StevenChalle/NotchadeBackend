module.exports = {

  getTopicMessages: (req, res, next) => {
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

    //user is connected, getting topic messages
    let query = `SELECT * FROM messages WHERE id_topic = ${req.body.id_topic}`
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
  },
  getPersonnalMessages: (req, res, next) => {
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

    //user is connected, try get personnal messages
    let query = `SELECT * FROM messages
      WHERE id_author = ${req.body.id_author} OR id_author = ${req.body.id_receiver}
      AND id_receiver = ${req.body.id_receiver} OR id_receiver = ${req.body.id_author}`
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
