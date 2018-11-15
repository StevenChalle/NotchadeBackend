
module.exports = {

    getDoc: (req, res, next) => {
      let docString = `
      API DOCUMENTATION =>

      1) get /users/get
      -> no params
      -> return list of users still subscribed
      -> returns {"status": 200, "error": false, "response": queryResult}

      2) post /users/add
      -> params : {
        "pseudo": user_pseudo,
        "email": user_email,
        "password" : user_password
      }
      -> If user credentials does not exist in db, adds the new user to db. Can return conflict error if pseudo or email already exist.
      -> returns case success : {"status": 200, "error": false, "response": "Done"}

      3) post /users/checkExist
      -> params : {
        "email": user_email,
        "password": user_password
      }
      -> If user credentials exists in db return true, else false
      -> returns case user exists : {"status": 200, "error": false, "response": {"userExist": true}}

      4) post /users/unsub
      -> params : {
        "email": user_email,
        "password": user_password
      }
      -> unsubscribe user on platform
      -> returns {"status": 200, "error": false, "response": "Done"}

      5) get /topics/get
      -> no parameters
      -> returns all topics in table
      -> returns {"status": 200, "error": false, "response": queryResult}

      6) post /messages/getTopicMessage
      -> params : {
        "id_topic": id_topic
      }
      -> returns all messages sent to a specific topic
      -> returns {"status": 200, "error": false, "response": queryResult}

      7) post /messages/getPersonnalMessages
      -> params : {
        "id_author": id_author,
        "id_receiver": id_receiver
      }
      -> result is identic if you swap the id in the params between author and receiver
      -> returns {"status": 200, "error": false, "response": queryResult}

      8) post /messages/addTopicMessage
      -> params : {
        "msg" : user_msg,
        "id_author": user_id,
        "id_topic": topic_id
      }
      -> inserts msg in db
      -> returns {"status": 200, "error": false, "response": "Done"}

      9) post /messages/addPersonnalMessage
      -> params {
        "msg": user_msg,
        "id_author": id_author,
        "id_receiver": id_receiver
      }
      -> insert message in db
      -> returns {"status": 200, "error": false, "response": "Done"}

      10) post /messages/delete
      -> params {
        "id_msg": id_msg,
        "id_author": id_author
      }
      -> checks if the message id and the id_author given match. if they do, delete the message
      -> returns {"status": 200, "error": false, "response": "Done"}`
      return res.send(JSON.stringify({
        "status": 200,
        "error": false,
        "response": docString
      }))
    }
}
