
var expressJoi = require('express-joi')
var Joi = expressJoi.Joi

module.exports = {

    addUser: {
      pseudo: Joi.types.String().required().min(3).max(35),
      email: Joi.types.String().required().min(6).max(75),
      password: Joi.types.String().required().min(1).max(35)
    },
    checkUserExist: {
      email: Joi.types.String().required().min(6).max(75),
      password: Joi.types.String().required().min(1).max(35)
    },
    unsubUser: {
      email: Joi.types.String().required().min(6).max(75),
      password: Joi.types.String().required().min(1).max(35)
    },
    addTopicMessage: {
      msg: Joi.types.String().required(),
      id_author: Joi.types.Number().integer().required(),
      id_topic: Joi.types.Number().integer().required()
    },
    addPersonnalMessage: {
      msg: Joi.types.String().required(),
      id_author: Joi.types.Number().integer().required(),
      id_receiver: Joi.types.Number().integer().required()
    },
    getTopicMessages: {
      id_topic: Joi.types.Number().integer().required()
    },
    getPersonnalMessages: {
      id_author: Joi.types.Number().integer().required(),
      id_receiver: Joi.types.Number().integer().required(),
    },
    deleteMessage: {
      id_msg: Joi.types.Number().integer().required(),
      id_author: Joi.types.Number().integer().required(),
    }

}
