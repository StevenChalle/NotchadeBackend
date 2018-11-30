'use strict';
module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define('messages', {
    msg: DataTypes.TEXT,
    id_author: DataTypes.INTEGER,
    id_topic: DataTypes.INTEGER,
    id_receiver: DataTypes.INTEGER
  }, {});
  messages.associate = function(models) {
    // associations can be defined here
  };
  return messages;
};