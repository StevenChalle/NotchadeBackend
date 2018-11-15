
module.exports = {

    addTopicMessage: (req, res, next) => {
      console.log("route addTopicMessage called")

      //checking params
      if (!req.body.msg || !req.body.id_author || req.body.id_topic)
        return res.send(JSON.stringify({"status": 422, "error": true, "response": "Bad Parameter : route must receive a string as msg, a number as id_author and another number as id_topic"}))

      let query = `INSERT INTO messages (msg, id_author, id_topic)
      VALUES ('${req.body.msg}', '${req.body.id_author}', '${req.body.id_topic}')`
      new Promise((resolve, reject) => {
        mysqlClient.query(query, (err, result) => {
          if (err) throw err
          resolve(result)
        })
      }).then((resolve) => {
        return res.send(JSON.stringify({"status": 200, "error": false, "response": `Done`}))
      }).catch((reject) => {
        return res.send(JSON.stringify({
          "status": 500,
          "error": true,
          "response": `Internal Server Error`
        }))
      })
    },
    addPersonnalMessage: (req, res, next) => {
      console.log("route addPersonnalMessage called")

      //checking params
      if (!req.body.msg || !req.body.id_author || req.body.id_receiver)
        return res.send(JSON.stringify({"status": 422, "error": true, "response": "Bad Parameter : route must receive a string as msg, a number as id_author and another number as id_receiver"}))

      let query = `INSERT INTO messages (msg, id_author, id_receiver)
      VALUES ('${req.body.msg}', '${req.body.id_author}', '${req.body.id_receiver}')`
      new Promise((resolve, reject) => {
        mysqlClient.query(query, (err, result) => {
          if (err) throw err
          resolve(result)
        })
      }).then((resolve) => {
        return res.send(JSON.stringify({"status": 200, "error": false, "response": `Done`}))
      }).catch((reject) => {
        return res.send(JSON.stringify({
          "status": 500,
          "error": true,
          "response": `Internal Server Error`
        }))
      })
    }
}
