
module.exports = {

    getTopicMessages: (req, res, next) => {
      console.log("route getTopicMessages called")

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
