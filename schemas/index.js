
var expressJoi = require('express-joi')
var Joi = expressJoi.Joi

module.exports = {

    addUser: {
      pseudo: Joi.types.String().min(3).max(35),
      email: Joi.types.String().min(6).max(75),
      password: Joi.types.String().min(1).max(35)
    }

}
