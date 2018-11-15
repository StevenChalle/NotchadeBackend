
module.exports = {

  getTopicMessages: (req, res, next) => {
    console.log("route getTopicMessages called")

    //checking params
    if (!req.body.id_topic)
      return res.send(JSON.stringify({"status": 422, "error": true, "response": "Bad Parameter : route must receive only a number as id_topic"}))

    let query = `SELECT * FROM messages WHERE id_topic = ${req.body.id_topic}`
    new Promise((resolve, reject) => {
      mysqlClient.query(query, (err, result) => {
        if (err) throw err
        resolve(result)
      })
    }).then((resolve) => {
      return res.send(JSON.stringify({"status": 200, "error": false, "response": resolve}))
    }).catch((reject) => {
      return res.send(JSON.stringify({
        "status": 500,
        "error": true,
        "response": `Internal Server Error`
      }))
    })
  }

}
