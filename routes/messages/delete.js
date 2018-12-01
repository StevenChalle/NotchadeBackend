module.exports = {

  deleteMessage: (req, res, next) => {
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

    //delete message
    let query = `SELECT * FROM messages where id = ${req.body.id_msg}`
    new Promise((resolve, reject) => {
      mysqlClient.query(query, (err, result) => {
        if (err) throw err
        resolve(result)
      })
    }).then((resolve) => {
      if (resolve.length == 0 || resolve[0].id_author != req.body.id_author)
        return res.send(JSON.stringify({
          "status": 422,
          "error": true,
          "response": "Bad Parameter : can not find message with the id given, or author does not match with message"
        }))
      query = `DELETE FROM messages WHERE id = ${req.body.id_msg}`
      mysqlClient.query(query, (err, result) => {
        if (err) throw err
        resolve(result)
      })
      res.send(JSON.stringify({
        "status": 200,
        "error": false,
        "response": `Done`
      }))
    }).catch((reject) => {
      res.send(JSON.stringify({
        "status": 500,
        "error": true,
        "response": `Internal Server Error`
      }))
    })
  }
}
