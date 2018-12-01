var expressJoi = require('express-joi')
var Joi = expressJoi.Joi

module.exports = {

  connect: {
    email: Joi.types.String().required().min(6).max(75),
    password: Joi.types.String().required().min(1).max(35)
  },
  disconnect: {
    user_id: Joi.types.Number().integer().required()
  },
  addUser: {
    pseudo: Joi.types.String().required().min(3).max(35),
    email: Joi.types.String().required().min(6).max(75),
    password: Joi.types.String().required().min(1).max(35)
  },
  unsubUser: {
    email: Joi.types.String().required().min(6).max(75),
    password: Joi.types.String().required().min(1).max(35)
  },
  getTopics: {
    user_id: Joi.types.Number().integer().required()
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
    user_id: Joi.types.Number().integer().required(),
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
