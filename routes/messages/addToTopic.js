
module.exports = {

    addTopicMessage: (req, res, next) => {
      console.log("route addTopicMessage called")

      let query = `INSERT INTO messages (msg, id_author, id_topic)
      VALUES ('${req.body.msg}', '${req.body.id_author}', '${req.body.id_topic}')`
      new Promise((resolve, reject) => {
        mysqlClient.query(query, (err, result) => {
          if (err) throw err
          resolve(result)
        })
      }).then((resolve) => {
        res.send(JSON.stringify({"status": 200, "error": false, "response": `Done`}))
      }).catch((reject) => {
        res.send(JSON.stringify({
          "status": 500,
          "error": true,
          "response": `Internal Server Error`
        }))
      })
    }
}
