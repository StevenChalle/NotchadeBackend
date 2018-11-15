
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
    },
    getPersonnalMessages: (req, res, next) => {
      console.log("route getPersonnalMessages called")

      //checking params
      if (!req.body.id_author || !req.body.id_receiver)
        return res.send(JSON.stringify({"status": 422, "error": true, "response": "Bad Parameter : route must receive a number as id_author and another as id_receiver"}))

      let query = `SELECT * FROM messages
      WHERE id_author = ${req.body.id_author} OR id_author = ${req.body.id_receiver}
      AND id_receiver = ${req.body.id_receiver} OR id_receiver = ${req.body.id_author}`
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
