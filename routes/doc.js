
module.exports = {

    getDoc: (req, res, next) => {
      let docString = `
      API DOCUMENTATION =>

      1) post /addUser
      -> params : {
        "pseudo": user_pseudo,
        "email": user_email,
        "password" : user_password
      }
      -> If user credentials does not exist in db, adds the new user to db. Can return conflict error if pseudo or email already exist.
      -> returns case success : {"status": 200, "error": false, "response": "Done"}

      2) post /checkUserExist
      -> params : {
        "email": user_email,
        "password": user_password
      }
      -> If user credentials exists in db return true, else false
      -> returns case user exists : {"status": 200, "error": false, "response": {"userExist": true}}

      3) get /getTopics
      -> no parameters
      -> returns all topics in table
      -> returns {"status": 200, "error": false, "response": queryResult}

      4) post /getTopicMessages
      -> params : {
        "id_topic": id_topic
      }
      -> returns all messages sent to a specific topic
      -> returns {"status": 200, "error": false, "response": queryResult}

      5) post /getPersonnalMessages
      -> params : {
        "id_author": id_author,
        "id_receiver": id_receiver
      }
      -> result is identic if you swap the id in the params between author and receiver
      -> returns {"status": 200, "error": false, "response": queryResult}

      6) post /addTopicMessage
      -> params : {
        "msg" : user_msg,
        "id_author": user_id,
        "id_topic": topic_id
      }
      -> inserts msg in db
      -> returns {"status": 200, "error": false, "response": "Done"}

      7) post /addPersonnalMessage
      -> params {
        "msg": user_msg,
        "id_author": id_author,
        "id_receiver": id_receiver
      }
      -> insert message in db
      -> returns {"status": 200, "error": false, "response": "Done"}`
      return res.send(JSON.stringify({
        "status": 200,
        "error": false,
        "response": docString
      }))
    }
}
