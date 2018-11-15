
module.exports = {

    deleteMessage: (req, res, next) => {
      console.log("route deleteMessage called")

      //checking parameters
      if (!req.body.id_msg || !req.body.id_author)
        return res.send(JSON.stringify({"status": 422, "error": true, "response": "Bad Parameter : route must receive a number as id_msg and another as id_author"}))

      //delete message
      let query = `SELECT * FROM messages where id = ${req.body.id_msg}`
      new Promise((resolve, reject) => {
        mysqlClient.query(query, (err, result) => {
          if (err) throw err
          resolve(result)
        })
      }).then((resolve) => {
        console.log("yo" + resolve.length)
        if (resolve.length == 0 || resolve[0].id_author != req.body.id_author) {
                  console.log("ya")
          return res.send(JSON.stringify({"status": 422, "error": true, "response": "Bad Parameter : can not find message with the id given, or author does not match with message"}))
        }
        query = `DELETE FROM messages WHERE id = ${req.body.id_msg}`
        mysqlClient.query(query, (err, result) => {
          if (err) throw err
          resolve(result)
        })
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
