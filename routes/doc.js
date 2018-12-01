
module.exports = {

    getDoc: (req, res, next) => {
      let docString = `
      API DOCUMENTATION =>

      1)  post /users/connect
      -> params : {
        "email": user_email,
        "password": user_password
      }
      -> connects user if user exists and is not connected
      -> return in response { -1 } if error, { id_user } if success

      2) post /users/disconnect
      -> params : {
        "user_id": user_id
      }
      -> disconnect user if he is connected
      -> return in response "Disconnected" (in error : false)

      3) post /users/add
      -> params : {
        "pseudo": user_pseudo,
        "email": user_email,
        "password" : user_password
      }
      -> If user credentials does not exist in db, adds the new user to db. Can return conflict error if pseudo or email already exist.
      -> returns case success : {"status": 200, "error": false, "response": "Done"}

      4) post /users/unsub
      -> params : {
        "email": user_email,
        "password": user_password
      }
      -> unsubscribe user on platform
      -> returns {"status": 200, "error": false, "response": "Done"}

      5) post /topics/get
      -> params : {
        "user_id": user_id
      }
      -> returns all topics in table if user is connected
      -> returns {"status": 200, "error": false, "response": queryResult}

      6) post /messages/getTopicMessages
      -> params : {
        "user_id": user_id
        "id_topic": id_topic
      }
      -> returns all messages sent to a specific topic if user is connected
      -> returns {"status": 200, "error": false, "response": queryResult}

      7) post /messages/getPersonnalMessages
      -> params : {
        "id_author": id_author,
        "id_receiver": id_receiver
      }
      -> result is identic if you swap the id in the params between author and receiver, get personnal messages of a conversation if user is connectedS
      -> returns {"status": 200, "error": false, "response": queryResult}

      8) post /messages/addTopicMessage
      -> params : {
        "msg" : user_msg,
        "id_author": user_id,
        "id_topic": topic_id
      }
      -> inserts msg in db if user is connected
      -> returns {"status": 200, "error": false, "response": "Done"}

      9) post /messages/addPersonnalMessage
      -> params {
        "msg": user_msg,
        "id_author": id_author,
        "id_receiver": id_receiver
      }
      -> insert message in db if user is connected
      -> returns {"status": 200, "error": false, "response": "Done"}

      10) post /messages/delete
      -> params {
        "id_msg": id_msg,
        "id_author": id_author
      }
      -> checks if the message id and the id_author given match. if they do, and user is connected, delete the message
      -> returns {"status": 200, "error": false, "response": "Done"}`
      return res.send(JSON.stringify({
        "status": 200,
        "error": false,
        "response": docString
      }))
    }
}
