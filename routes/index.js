module.exports = {
    getIndex: (req, res) => {
        let query = "SELECT * FROM `users`"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/')
            }
            res.render('yo')
        })
    },
}
