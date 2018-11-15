
module.exports = {

    getTopics: (req, res, next) => {
      console.log("route getTopics called")

      let query = `SELECT * FROM topics`
      mysqlClient.query(query, (err, result) => {
        if (err) throw err
        res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
      })
    }
}

// result.forEach((item) => {
//   console.log(item.name)
//   console.log(item.description)
// })
