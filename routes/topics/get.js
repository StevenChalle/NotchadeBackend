
module.exports = {

    getTopics: (req, res, next) => {
      console.log("route getTopics called")

      let query = `SELECT * FROM topics`
      new Promise((resolve, reject) => {
        mysqlClient.query(query, (err, result) => {
          if (err) throw err
          resolve(result)
        })
      }).then((resolve) => {
        res.send(JSON.stringify({"status": 200, "error": false, "response": resolve}))
      }).catch((reject) => {
        res.send(JSON.stringify({
          "status": 500,
          "error": true,
          "response": `Internal Server Error`
        }))
      })
    }
}
